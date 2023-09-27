import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const err = useRouteError() as unknown;

  const errMessage = isRouteErrorResponse(err)
    ? err.data
    : err instanceof Object && "message" in err
    ? err.message
    : "Oops! click the button below to go back";

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errMessage}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
