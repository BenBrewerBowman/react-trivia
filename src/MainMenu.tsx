import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import GradientButton from "./GradientButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    subtitle: {
      marginBottom: theme.spacing(6),
    },
  })
);

type MainMenuProps = {
  onSelectStart: VoidFunction;
};

const MainMenu = ({ onSelectStart }: MainMenuProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" className={classes.title}>
        Ultimate Trivia Challenge
      </Typography>
      <Typography variant="h6" align="center" className={classes.subtitle}>
        Welcome to the most elite trivia challenge known to humankind. Do you
        have what it takes to answer all ten questions correctly?
      </Typography>
      <GradientButton onClick={onSelectStart}>
        <Typography variant="h5">I&apos;m ready!</Typography>
      </GradientButton>
    </div>
  );
};

export default MainMenu;
