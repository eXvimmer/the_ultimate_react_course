import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (/* { user } */) => {
      toast.success("the user account updated successfully");
      // queryClient.setQueryData(["user"], user); // NOTE: this is not necessary
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    },
  });

  return { isUpdating, updateUser };
}
