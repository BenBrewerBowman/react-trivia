import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { Check, X } from "react-feather";
import GradientButton from "../gradientButton/GradientButton";
import {
  TriviaQuestion as T_TriviaQuestion,
  TriviaQuestionAnswer,
} from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(6),
    },
    question: {
      marginBottom: theme.spacing(6),
    },
    trueOrFalseButtonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonSpacer: {
      width: theme.spacing(2),
    },
    icon: {
      width: 28,
      height: 28,
      color: "white",
    },
  })
);

type TriviaQuestionProps = {
  question: T_TriviaQuestion;
  onSelectAnswer: (answer: TriviaQuestionAnswer) => void;
};

const TriviaQuestion = ({
  question: { question },
  onSelectAnswer,
}: TriviaQuestionProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.question}>
        {question}
      </Typography>
      <div className={classes.trueOrFalseButtonContainer}>
        <GradientButton onClick={() => onSelectAnswer("True")}>
          <Check className={classes.icon} />
        </GradientButton>
        <div className={classes.buttonSpacer} />
        <GradientButton onClick={() => onSelectAnswer("False")}>
          <X className={classes.icon} />
        </GradientButton>
      </div>
    </div>
  );
};

export default TriviaQuestion;
