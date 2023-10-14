import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm /* , FieldErrors */ } from "react-hook-form";
import { NewCabin } from "../../types";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

interface CreateCabinFormProps {
  cabinToEdit?: NewCabin;
  onCloseModal?: () => void;
}

function CreateCabinForm({ cabinToEdit, onCloseModal }: CreateCabinFormProps) {
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
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isProcessing = isCreating || isEditing;

  function onValid(data: NewCabin) {
    if (isEditSession) {
      editCabin(
        { newCabinData: data, id: editId },
        {
          onSuccess: (/* newData: iCabin */) => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createCabin(data, {
        onSuccess: (/* newData: iCabin */) => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  // function onInvalid(errors: FieldErrors<iCabin>) {
  //   console.log(errors);
  // }

  return (
    <Form
      onSubmit={handleSubmit(onValid /*, onInvalid */)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isProcessing}
          {...register("name", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.max_capacity?.message}>
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

      <FormRow label="Regular Price" error={errors?.regular_price?.message}>
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

      <FormRow label="Discount" error={errors?.discount?.message}>
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

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* NOTE: I wrap the buttons with a span.fake-buttons to satisfy the
        requirement of having children props with id */}
        <span id="fake-buttons">
          <Button
            $variation="secondary"
            type="reset"
            disabled={isProcessing}
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isProcessing}>
            {isEditSession ? "Edit" : "Create new"} cabin
          </Button>
        </span>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
