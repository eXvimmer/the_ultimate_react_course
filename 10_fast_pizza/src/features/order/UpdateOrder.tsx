import { ActionFunction, useFetcher } from "react-router-dom";
// import { iOrderResponse } from "../../types";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

/* interface UpdateOrderProps {
  order: iOrderResponse;
} */

function UpdateOrder(/* { order }: UpdateOrderProps */) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const updateOrderAction: ActionFunction = async ({ params }) => {
  const data = { priority: true };
  if (params.orderId) {
    await updateOrder(params.orderId, data);
  }
  return null;
};

export default UpdateOrder;
