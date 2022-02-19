import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useHistory } from "react-router";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  icons: {
    height: 33,
    marginBottom: -5,
    marginLeft: 30,
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory()
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
              <Typography variant='h4' color='inherit'  className={classes.toolbarTitle}>
              <Button onClick={() => history.push('/')}><i className="fas fa-home" style={{color:'#624987', fontSize:'33px', marginBottom:'7px', marginRight:'20px'}}></i></Button>
              <a href="https://github.com/tarnilok/dj-proj-QuizApp" target="_blank" rel="noreferrer" title="Backend Codes" ><i className="fab fa-github"></i></a>
              <a href="https://dj-proj-quizapp-backend.herokuapp.com/" target="_blank" rel="noreferrer" title="Backend Side" ><img src='https://pbs.twimg.com/profile_images/700084762799550464/dbPz0Wiw_400x400.png' className={classes.icons} alt="Backend"></img></a>
              </Typography>
          </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
