import {
  Form,
  ActionFunctionArgs,
  redirect,
  useNavigation,
  ActionFunction,
  useActionData,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { formatCurrency, isValidPhone } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useRootSelector } from "../../hooks/useRootSelector";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../types";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const thunkDispatch: ThunkDispatch<RootState, null, AnyAction> =
    useDispatch();
  const username = useRootSelector((s) => s.user.username);
  const cart = useRootSelector(getCart);
  const formErrors = useActionData() as Record<string, string>;
  const totalCartPrice = useRootSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const isSubmitting = navigation.state === "submitting";

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* TODO: change this */}
      <button onClick={() => thunkDispatch(fetchAddress())}>
        Get Position
      </button>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority ? "on" : "off"}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Placing order...."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const createOrderAction: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    customer: string;
    phone: string;
    address: string;
    priority: string;
    cart: string;
  };
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
  if (!isValidPhone(order.phone)) {
    return {
      phone:
        "Please provide a correct phone number, in case we need to contact you.",
    };
  }
  const res = await createOrder(order);
  store.dispatch(clearCart()); // WARN: HACK: DON'T overuse this technique.
  return redirect(`/order/${res.id}`);
};

export default CreateOrder;
