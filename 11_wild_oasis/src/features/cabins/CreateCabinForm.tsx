import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm /* , FieldErrors */ } from "react-hook-form";
import { NewCabin } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

interface CreateCabinFormProps {
  cabinToEdit?: NewCabin;
}

function CreateCabinForm({ cabinToEdit }: CreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit
    ? cabinToEdit
    : ({} as NewCabin);
  const isEditSession = !!editId;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<NewCabin>({
    defaultValues: isEditSession ? editValues : {},
  });
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("new cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    },
  });

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
      reset();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    },
  });

  const isProcessing = isCreating || isEditing;

  function onValid(data: NewCabin) {
    if (isEditSession) {
      editCabin({ newCabinData: data, id: editId });
    } else {
      createCabin(data);
    }
  }

  // function onInvalid(errors: FieldErrors<iCabin>) {
  //   console.log(errors);
  // }

  return (
    <Form onSubmit={handleSubmit(onValid /*, onInvalid */)}>
      <FormRow label="Cabin Name" htmlFor="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isProcessing}
          {...register("name", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow
        label="Maximum Capacity"
        htmlFor="max_capacity"
        error={errors?.max_capacity?.message}
      >
        <Input
          type="number"
          id="max_capacity"
          disabled={isProcessing}
          {...register("max_capacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "max capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular Price"
        htmlFor="regular_price"
        error={errors?.regular_price?.message}
      >
        <Input
          type="number"
          id="regular_price"
          disabled={isProcessing}
          {...register("regular_price", {
            required: "this field is required",
            min: {
              value: 1,
              message: "regular price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        htmlFor="discount"
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          disabled={isProcessing}
          defaultValue={0}
          {...register("discount", {
            validate: (v) => {
              const value = Number(v);
              if (!v && value !== 0) {
                return "discount should be set";
              }
              if (value < 0) {
                return "discount cannot be less than zero";
              }
              if (value > Number(getValues()?.regular_price)) {
                return "discount should be less than or equal to the regular price";
              }
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description"
        htmlFor="description"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow
        label="Cabin Photo"
        htmlFor="image"
        error={errors?.image?.message}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isProcessing}>
          Reset
        </Button>
        <Button disabled={isProcessing}>
          {isEditSession ? "Edit" : "Create new"} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
