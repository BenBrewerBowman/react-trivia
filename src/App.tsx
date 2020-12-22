import {
  Container,
  createStyles,
  CssBaseline,
  LinearProgress,
  makeStyles,
  Paper,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import { useArrayState, useBooleanState } from "react-use-object-state";
import { ErrorBoundary } from "./error/ErrorBoundary";
import ErrorMessage from "./error/ErrorMessage";
import MainMenu from "./mainMenu/MainMenu";
import Results from "./results/Results";
import { createTheme, PRIMARY_GRADIENT } from "./theme";
import TriviaQuestion from "./triviaQuestion/TriviaQuestion";
import TriviaQuestionsStepper from "./triviaQuestionsStepper/TriviaQuestionsStepper";
import { TriviaQuestionAnswer } from "./types";
import { useTriviaQuestions } from "./useTriviaQuestions/useTriviaQuestions";

const NUM_QUESTIONS = 10;

export const AppMain = (): JSX.Element => {
  const { triviaQuestions, loading, error, refetch } = useTriviaQuestions();

  const hasStartedTrivia = useBooleanState(false);
  const answers = useArrayState<TriviaQuestionAnswer>([]);

  const handleRestart = () => {
    refetch();
    hasStartedTrivia.setFalse();
    answers.clear();
  };

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return (
      <ErrorMessage>
        Error loading trivia questions. Refresh your page and try again.
      </ErrorMessage>
    );
  }
  if (!hasStartedTrivia.state) {
    return <MainMenu onSelectStart={hasStartedTrivia.setTrue} />;
  }
  if (answers.state.length < NUM_QUESTIONS) {
    return (
      <>
        <TriviaQuestionsStepper activeStep={answers.state.length} />
        <TriviaQuestion
          question={triviaQuestions[answers.state.length]}
          onSelectAnswer={answers.push}
        />
      </>
    );
  }
  return (
    <Results
      questions={triviaQuestions}
      userAnswers={answers.state}
      onSelectRestart={handleRestart}
    />
  );
};

const useAppWrappersStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100vw",
      height: "100vh",
      backgroundImage: PRIMARY_GRADIENT,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      maxHeight: "95vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      height: "100%",
      maxHeight: "inherit",
      width: "100%",
      overflowY: "auto",
      padding: theme.spacing(4),
    },
  })
);

const AppWrappers = (): JSX.Element => {
  const classes = useAppWrappersStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.container}>
        <Paper elevation={0} className={classes.paper}>
          <ErrorBoundary>
            <AppMain />
          </ErrorBoundary>
        </Paper>
      </Container>
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={createTheme("light")}>
      <CssBaseline />
      <AppWrappers />
    </ThemeProvider>
  );
};

export default App;
