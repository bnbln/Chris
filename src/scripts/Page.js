import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import image from "../assets/img01.jpg"


class Projekte extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
    }
    this.fetchPageData = this.fetchPageData.bind(this)
  }
  componentDidMount() {
    var page = this.props.pages;
    if (page) {
      if (page.slug) {
        console.log("props: ",page.slug);
        this.fetchPageData(page.slug);
        this.setState({isLoaded: true })

      }

    }

  }

  fetchPageData(slug) {
    fetch("https://chris.thesolu.com/wp-json/wp/v2/pages?slug="+ slug +"")
    .then(res => res.json())
    .then(json => this.setState({ data: json}));
    
  }
  render() {

    console.log("data: ",this.state.data);
    if (this.state.isLoaded === true) {
      console.log("ok")
    }

    return (
      <Grid container justify="center" style={{
        paddingTop: 64,
        opacity: this.state.isLoaded === true ? 1 : 0,
        transition: "opacity 0.3s ease-in-out"
      }}>
          {this.state.data.map((data,i) =>
            <Grid item xs={11} key={i}>
          <div dangerouslySetInnerHTML={{__html: data.content.rendered}}></div>
          </Grid>
          )}

      </Grid>

    );
  }
}

export default Projekte;
