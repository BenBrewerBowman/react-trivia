import { Typography } from "@material-ui/core";
import { ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
};

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <Typography variant="h6">{children}</Typography>;
};

export default ErrorMessage;
