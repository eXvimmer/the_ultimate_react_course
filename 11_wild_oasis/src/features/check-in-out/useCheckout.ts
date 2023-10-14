import { useMutation, useQueryClient } from "@tanstack/react-query";
import { iBooking } from "../../types";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId: iBooking["id"]) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`booking ${data?.id} checked out successfully`);
      queryClient.invalidateQueries();
    },
    onError: () => toast.error("there was an error while checking out"),
  });

  return { checkOut, isCheckingOut };
}
