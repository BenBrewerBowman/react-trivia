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
import { ErrorBoundary } from "./ErrorBoundary";
import ErrorMessage from "./ErrorMessage";
import MainMenu from "./MainMenu";
import Results from "./Results";
import { createTheme, PRIMARY_GRADIENT } from "./theme";
import TriviaQuestion from "./TriviaQuestion";
import TriviaQuestionsStepper from "./TriviaQuestionsStepper";
import { TriviaQuestionAnswer } from "./types";
import { useTriviaQuestions } from "./useTriviaQuestions";

const NUM_QUESTIONS = 10;

export const AppMain = (): JSX.Element => {
  const { triviaQuestions, loading, error } = useTriviaQuestions();

  const hasStartedTrivia = useBooleanState(false);
  const answers = useArrayState<TriviaQuestionAnswer>([]);

  const handleRestart = () => {
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
  // main menu
  if (!hasStartedTrivia.state) {
    return <MainMenu onSelectStart={hasStartedTrivia.setTrue} />;
  }
  // questions
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
  // results
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
