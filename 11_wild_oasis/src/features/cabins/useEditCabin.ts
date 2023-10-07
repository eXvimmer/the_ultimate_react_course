import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewCabin } from "../../types";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: NewCabin;
      id: NewCabin["id"];
    }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("new cabin edited successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    },
  });

  return { isEditing, editCabin };
}
