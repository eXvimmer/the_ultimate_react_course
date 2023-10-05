import { iCabin } from "../types";
import supabase from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return cabins;
}

export async function createCabin(newCabin: Partial<iCabin>) {
  const { data, error } = await supabase.from("cabins").insert([newCabin]);
  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
  }
  return data;
}

export async function deleteCabin(id: number) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabin could not be deleted");
  }
  return data;
}
