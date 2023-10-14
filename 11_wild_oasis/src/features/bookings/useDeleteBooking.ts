import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("booking deleted successfully ");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    },
  });

  return { isDeleting, deleteBooking };
}
