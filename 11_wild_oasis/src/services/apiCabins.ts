import { NewCabin, iCabin } from "../types";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return cabins;
}

export async function createCabin(newCabin: NewCabin) {
  const imageName = `${Math.random()}-${newCabin.image[0].name}`.replace(
    "/",
    "",
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;
  const { error: storageError } = await supabase.storage
    .from("cabin_images")
    .upload(imageName, newCabin.image[0]);
  if (storageError) {
    // NOTE: Don't create the cabin
    console.error(storageError);
    throw new Error("cabins image didn't upload. cannot create the cabin");
  }

  const { data, error } = await supabase.from("cabins").insert([
    {
      ...newCabin,
      discount: Number(newCabin?.discount),
      max_capacity: Number(newCabin.max_capacity),
      regular_price: Number(newCabin.regular_price),
      image: imagePath,
    },
  ]);
  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
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
