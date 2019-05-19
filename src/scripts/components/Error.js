import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'; 



class Error extends Component {

  render() {
    return (
      <Grid container justify="center" style={{minHeight: "100vh"}}>
        <h1>404 - Not found</h1>
      </Grid>

    );
  }
}

export default Error;
