import { useMutation, useQueryClient } from "@tanstack/react-query";
import { iBooking } from "../../types";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: iBooking["id"];
      breakfast?: {
        has_breakfast: iBooking["has_breakfast"];
        extras_price: iBooking["extras_price"];
        total_price: iBooking["total_price"];
      };
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        is_paid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`booking ${data?.id} checked-in successfully`);
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: () => toast.error("there was an error while checking in"),
  });

  return { checkIn, isCheckingIn };
}
