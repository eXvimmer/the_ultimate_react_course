import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      loginApi(credentials),
    onSuccess: (user) => {
      console.log(user); // TODO: remove this
      toast.success("login was successfull");
      navigate("/dashboard" /* , { replace: true } */);
    },
    onError: (err) => {
      toast.error(
        (err as Error).message || "provided email or password is incorrect",
      );
    },
  });

  return { login, isLoading };
}
