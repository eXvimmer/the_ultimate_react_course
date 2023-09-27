import { LoaderFunction } from "react-router-dom";
import { getMenu, getOrder } from "../services/apiRestaurant";
import { iOrder } from "../types";

export async function menuLoader() {
  return await getMenu();
}

export const orderLoader: LoaderFunction<iOrder> = async ({ params }) => {
  if (!params.orderId) return;
  return await getOrder(params.orderId);
};
