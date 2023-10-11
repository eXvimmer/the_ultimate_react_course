import { NewCabin, iCabin } from "../types";
import supabase, { supabaseUrl } from "./supabase";

// TODO: use something like zod for runtime data validation

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return cabins;
}

export async function createEditCabin(newCabin: NewCabin, id?: NewCabin["id"]) {
  const imageTitle =
    typeof newCabin.image === "string"
      ? newCabin.image
      : newCabin.image[0].name;
  const hasImagePath = imageTitle.startsWith(supabaseUrl);
  const imageName = `${crypto.randomUUID()}-${imageTitle}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? imageTitle
    : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;
  let query: any = supabase.from("cabins"); // NOTE: any is intentional
  const queryData = {
    ...newCabin,
    discount: Number(newCabin.discount),
    max_capacity: Number(newCabin.max_capacity),
    regular_price: Number(newCabin.regular_price),
    image: imagePath,
  };

  // 1. Create/Edit cabin
  if (!id) {
    // A) Create a Cabin
    query = query.insert([queryData]);
  } else {
    // B) Edit the Cabin
    query = query.update(queryData).eq("id", id);
  }
  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be ${id ? "edited" : "created"}`);
  }

  // 2. Upload the image
  if (hasImagePath) {
    return data;
  }
  const { error: storageError } = await supabase.storage
    .from("cabin_images")
    .upload(imageName, newCabin.image[0]); // NOTE: you have to upload the whole file, not the name
  if (storageError) {
    console.error(storageError);
    // delete the cabin if there was an error uploading the image
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("couldn't upload the image. cannot create the cabin");
  }

  return data;
}

export async function deleteCabin(id: iCabin["id"] /* , image: string */) {
  // TODO: delete the image, if there's one
  // const { data, error: storageError } = await supabase.storage
  //   .from("cabin_images")
  //   .remove([image]);

  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabin could not be deleted");
  }
  return data;
}
