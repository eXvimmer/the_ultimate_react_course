import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
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
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
