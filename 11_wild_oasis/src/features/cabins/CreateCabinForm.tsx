import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm /* , FieldErrors */ } from "react-hook-form";
import { iCabin } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<iCabin>();
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("new cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    },
  });

  function onValid(data: iCabin) {
    mutate(data);
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            validate: (value) => {
              if (!value && value !== 0) {
                return "discount should be set";
              }
              if (value < 0) {
                return "discount cannot be less than zero";
              }
              if (value > (getValues()?.regular_price ?? 0)) {
                return "discount should be less or equal to the regular price";
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
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Reset
        </Button>
        <Button>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
