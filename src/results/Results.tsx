import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import GradientButton from "../gradientButton/GradientButton";
import { TriviaQuestion, TriviaQuestionAnswer } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      marginBottom: theme.spacing(6),
    },
    buttonContent: {
      color: "white",
    },
    answersContainer: {
      marginBottom: theme.spacing(4),
    },
    questionWithAnswer: {
      width: "100%",
      display: "flex",
      marginBottom: theme.spacing(3),
    },
    answerIconButton: {
      minWidth: 56,
      maxHeight: 56,
      padding: theme.spacing(1.5),
    },
    question: {
      marginLeft: theme.spacing(2),
      flexGrow: 1,
    },
  })
);

type ResultsProps = {
  questions: TriviaQuestion[];
  userAnswers: TriviaQuestionAnswer[];
  onSelectRestart: VoidFunction;
};

const Results = ({ questions, userAnswers, onSelectRestart }: ResultsProps) => {
  const classes = useStyles();

  const numCorrectAnswers = userAnswers.filter(
    (ans, i) => ans === questions[i].correct_answer
  ).length;

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" className={classes.title}>
        You scored {numCorrectAnswers}/10 correctly
      </Typography>
      <div className={classes.answersContainer}>
        {questions.map((q, i) => {
          const isCorrect = q.correct_answer === userAnswers[i];
          return (
            <div key={q.question} className={classes.questionWithAnswer}>
              <GradientButton
                disabled={!isCorrect}
                classes={{ root: classes.answerIconButton }}
              >
                <Typography variant="h6" align="center">
                  {q.correct_answer.charAt(0).toUpperCase()}
                </Typography>
              </GradientButton>
              <Typography
                color={isCorrect ? "textPrimary" : "textSecondary"}
                variant="h6"
                className={classes.question}
              >
                {q.question}
              </Typography>
            </div>
          );
        })}
      </div>
      <GradientButton onClick={onSelectRestart}>
        <Typography variant="h5" className={classes.buttonContent}>
          Restart
        </Typography>
      </GradientButton>
    </div>
  );
};

export default Results;
