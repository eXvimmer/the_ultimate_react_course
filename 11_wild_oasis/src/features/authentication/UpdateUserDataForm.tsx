import { FormEventHandler, MouseEventHandler, useRef, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data,
  // because we know that it has already been loaded at this point
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const formRef = useRef<HTMLFormElement>(null);

  const email = user?.email;
  const currentFullName: string | undefined = user?.user_metadata?.full_name;

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!fullName) {
      return;
    }
    updateUser(
      {
        avatar: avatar || undefined,
        fullName,
        // password: "",
      },
      {
        onSuccess: () => {
          setAvatar(null);
          formRef?.current?.reset();
        },
      },
    );
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => {
            if (e.target?.files?.[0]) {
              setAvatar(e.target.files[0]);
            }
          }}
        />
      </FormRow>
      <FormRow>
        <span id="fake-buttons">
          <Button
            type="reset"
            $variation="secondary"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </span>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
