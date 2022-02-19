import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import ConnectApi from "../api/ConnectApi";
import Header from "./framework/Header";
import Footer from "./framework/Footer";
// MaterialUI
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  correct: {
    color: "blue",
  },
  alert: {
    marginTop: "10px"
  }
}));

const Questions = () => {
  const classes = useStyles();
  const answer = useState({});
  const [answerCheck, setAnswerCheck] = useState();
  const { category, title } = useParams();
  const [pageNumber, setPageNumber] = useState(1)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  console.log(correctAnswers)

  const API_URL = "https://dj-proj-quizapp-backend.herokuapp.com/quiz/" + category + "/" + title + "?page=" + pageNumber;
  console.log(API_URL)
  const [dataState] = ConnectApi(API_URL, pageNumber);

  let a, b;
  if (dataState.data.results !== undefined) {
    a = dataState.data.results[0].answer.map((q) => q.answer_text);
    b = dataState.data.results[0].answer;
  }

  const handleSelection = (e) => {
    answer[0][e.target.value] = e.target.checked 
  };

  useEffect(() => {
    let z = b?.map((obj) => obj.id);
    var object = {};
    for (var x = 0; x < a?.length; x++) {
      object[z[x]] = false;
    }
    answer[0] = object
  });
  const checkAnswer = (e) => {
    e.preventDefault();
    let n;
    if (a !== undefined) n = dataState.data.results[0].answer.map((obj) => obj.is_right);
    let y = { ...n };
    function arrayEquals(o, p) {
      return o.every((val, index) => val === p[index]);
    }
    let o = Object.values(y);
    let p = Object.values(answer[0]);
    if (arrayEquals(o, p)) {
      setCorrectAnswers(correctAnswers + 1)
      setAnswerCheck(true);
    } else {
      setAnswerCheck(false);
    }
  };

  function refreshPage(e) {
    e.preventDefault()
    setAnswerCheck()
    setPageNumber(pageNumber + 1)
  }

  function Result() {
    if (answerCheck === true && pageNumber < dataState.data.count) {
      return (
        <Alert variant= "filled" severity="success">
          <AlertTitle>Correct Answer</AlertTitle>
          Well done you got it right —{" "}
          <Link href= "" variant="body2" onClick={refreshPage}>
            {"Next Question"}
          </Link>
        </Alert>
      );
    } else if (answerCheck === true && pageNumber === dataState.data.count) {
      return (
        <>
        <Alert variant= "filled" severity="success">
          <AlertTitle>Correct Answer</AlertTitle>
          Well done you got it right
        </Alert>
        <Alert variant= "filled" severity="info" className={classes.alert}>
        <AlertTitle>The Quiz is over<br/>
        <code>Your score is ➡ <b>{correctAnswers} / {dataState.data.count} ({(correctAnswers/dataState.data.count*100).toFixed()}% success)</b></code>
        </AlertTitle>
      </Alert>
      </>
      );
    } else if (answerCheck === false && pageNumber < dataState.data.count) {
      return (
        <Alert variant= "filled" severity="error">
          <AlertTitle>Wrong Answer</AlertTitle>
          <Link href= "" variant="body2" onClick={refreshPage}>
            {"Next Question"}
          </Link>
        </Alert>
      );
    } else if (answerCheck === false && pageNumber === dataState.data.count) {
      return (
        <>
        <Alert variant= "filled" severity="error">
          <AlertTitle>Wrong Answer</AlertTitle><br/>
        </Alert>
        <Alert variant= "filled" severity="info" className={classes.alert}>
        <AlertTitle>The Quiz is over<br/>
        <code>Your score is ➡ <b>{correctAnswers} / {dataState.data.count} ({(correctAnswers/dataState.data.count*100).toFixed()}% success)</b></code>
        </AlertTitle>
      </Alert>
      </>
      );
    }
    
    else {
      return <React.Fragment></React.Fragment>;
    }
  }

  return (
    <React.Fragment>
      <Header />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          {dataState.data.results !== undefined
            ? dataState.data.results.map(({ title, answer }, index) => (
                <div key={index}>
                  <Typography component="h1" variant="h5">
                    {title}
                  </Typography>
                  {answer.map(({ answer_text, id }) => (
                    <RadioGroup key={id}>
                      <FormControlLabel control={<Checkbox value={id} color="primary" onChange={handleSelection} />} label={answer_text} />
                    </RadioGroup>
                  ))}
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={checkAnswer}>
                    Submit Answer
                  </Button>
                  <Result />
                </div>
              ))
            : null}
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Questions;
