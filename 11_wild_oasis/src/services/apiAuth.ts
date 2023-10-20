import { UserAttributes } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";

export async function signup({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName, // NOTE: I used snake-case instead of camel-case to be consistent in database
        avatar: "",
      },
    },
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File;
}) {
  // 1. we can update either password or full_name each time, because the form
  // for updating them will be separate.
  let updateData: UserAttributes = {};
  if (password) {
    updateData = { password };
  }
  if (fullName) {
    updateData = {
      data: {
        full_name: fullName,
      },
    };
  }
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  if (!avatar) return data;

  // 2. upload the avatar image
  const fileName = `avatar-${data.user.id}-${crypto.randomUUID()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    console.error(storageError);
    throw new Error(storageError.message);
  }

  // 3. update user's avatar column
  const avatarStorageUrl = `${supabaseUrl}/storage/v1/object/public/avatars`;
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${avatarStorageUrl}/${fileName}`,
      },
    });
  if (updateError) {
    console.error(updateError);
    throw new Error(updateError.message);
  }
  return updatedUser;
}
