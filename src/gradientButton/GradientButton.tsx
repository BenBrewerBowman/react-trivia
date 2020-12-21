import { Card, createStyles, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import { ReactNode } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "inline-block",
      padding: theme.spacing(2),
      background:
        "linear-gradient( 135deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      color: "white",
    },
    clickable: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    disabled: {
      background: theme.palette.grey[300],
    },
  })
);

type GradientButtonProps = {
  children: ReactNode;
  onClick?: VoidFunction;
  disabled?: boolean;
  classes?: {
    root?: string;
  };
};

const GradientButton = ({
  children,
  onClick,
  disabled,
  ...props
}: GradientButtonProps) => {
  const classes = useStyles();
  return (
    <Card
      className={clsx(
        classes.root,
        disabled && classes.disabled,
        onClick && classes.clickable,
        props.classes?.root
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </Card>
  );
};

export default GradientButton;
