import React from 'react'
import { useParams } from 'react-router-dom'
import ConnectApi from '../api/ConnectApi'
import Header from "./framework/Header";
import Footer from "./framework/Footer";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    "@global": {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: "none",
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: "wrap",
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[700],
      height: 100,
    },
    cardPricing: {
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      marginBottom: theme.spacing(2),
    },
  }));

const QuizTitle = () => {
    const classes = useStyles();
    const {category} = useParams()
    const API_URL = "https://dj-proj-quizapp-backend.herokuapp.com/quiz/" + category;
    const [dataState] = ConnectApi(API_URL);
    return (
        <React.Fragment>
          <Header />
          <Container maxWidth="md" component="main" className={classes.heroContent}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} Quizzes
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              component="p"
            >
              <code>Which title would you like to take an exam?</code>
            </Typography>
          </Container>
          <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
              {dataState.data.map((q) => (
                <Grid item key={q.title} xs={12} md={4}>
                  <Card>
                    <CardHeader
                      title={q.title.split(' ').map(a => a[0].toUpperCase()+a.slice(1)).join(' ')}
                      titleTypographyProps={{ align: "center" }}
                      subheaderTypographyProps={{ align: "center" }}
                      className={classes.cardHeader}
                    />
                    <CardContent>
                      <ul>
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                        >
                          Number Of Questions Included: <b>{q.numberOfQuestionIncluded}</b>
                        </Typography>
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        href = {category + "/" + q.title}
                      >
                        Start Quiz
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
          <Footer />
        </React.Fragment>
      );
}

export default QuizTitle
