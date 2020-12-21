import { Typography, useMediaQuery } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepConnector from "@material-ui/core/StepConnector";
import { StepIconProps } from "@material-ui/core/StepIcon";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import clsx from "clsx";
import { PRIMARY_GRADIENT } from "../theme";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 16,
  },
  active: {
    "& $line": {
      backgroundImage: PRIMARY_GRADIENT,
    },
  },
  completed: {
    "& $line": {
      backgroundImage: PRIMARY_GRADIENT,
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#ccc",
      zIndex: 1,
      color: "#fff",
      width: theme.spacing(4),
      height: theme.spacing(4),
      [theme.breakpoints.down("xs")]: {
        width: theme.spacing(2),
        height: theme.spacing(2),
      },
      display: "flex",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
    },
    active: {
      backgroundImage: PRIMARY_GRADIENT,
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    },
    completed: {
      backgroundImage: PRIMARY_GRADIENT,
    },
  })
);

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {(active || completed) && !isXs && <Typography>{icon}</Typography>}
    </div>
  );
}

const useTriviaQuestionsStepperStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0, -1.25),
    },
    step: {
      padding: theme.spacing(0, 0.5),
    },
  })
);

type TriviaQuestionsStepperProps = {
  activeStep: number;
};

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const TriviaQuestionsStepper = ({
  activeStep,
}: TriviaQuestionsStepperProps) => {
  const classes = useTriviaQuestionsStepperStyles();
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<ColorlibConnector />}
      className={classes.root}
    >
      {STEPS.map((step) => (
        <Step key={step} className={classes.step}>
          <StepLabel StepIconComponent={ColorlibStepIcon} />
        </Step>
      ))}
    </Stepper>
  );
};

export default TriviaQuestionsStepper;
