import { Activity } from "../../types";
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

interface CheckoutButtonProps {
  bookingId: Activity["id"];
}

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { checkOut, isCheckingOut } = useCheckout();

  return (
    <Button
      $variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
