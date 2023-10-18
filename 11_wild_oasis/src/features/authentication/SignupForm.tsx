import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

type NewUser = {
  email: string;
  fullName: string;
  password: string;
  passwordConfirm: string;
};

function SignupForm() {
  const { register, formState, getValues, handleSubmit } = useForm<NewUser>();
  const { errors } = formState;

  function onValid(data: NewUser) {
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "this field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "password should be at least 8 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "this field is required",
            validate: (value: NewUser["passwordConfirm"]) =>
              value === getValues()?.password || "passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* NOTE: to satisfy the requirement for having a child with id, I had
        to wrap these buttons with a span */}
        <span id="fake-buttons">
          <Button $variation="secondary" type="reset">
            Cancel
          </Button>
          <Button>Create new user</Button>
        </span>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
