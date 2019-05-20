import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


class Projekte extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      posts: []
    }
    this.fetchPageData = this.fetchPageData.bind(this)
  }
  componentDidMount() {
    this.fetchPageData();

  }

  fetchPageData() {
    fetch("https://chris.thesolu.com/wp-json/wp/v2/projekte")
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
    fetch("https://chris.thesolu.com/wp-json/wp/v2/posts?per_page=99")
      .then(res => res.json())
      .then(json => this.setState({ posts: json }));


  }
  render() {

    console.log("data: ", this.state.data);

    return (
      <Grid container justify="center" style={{ paddingTop: 64 }}>
        <Grid item xs={11} sm={11} md={11}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <h1>Projekte</h1>
            </Grid>
            {this.state.data.map((item, i) =>
              <Grid container justify="flex-start" 
                onClick={() => { this.props.history.push("/projekte/" + item.slug) }}
                style={{
                  cursor: "pointer",
                  height: "100vh",
                }}>
                <Grid item>
                  <h2 dangerouslySetInnerHTML={{ __html: item.title.rendered }} style={{
                    textTransform: "uppercase",
                    fontSize: "1.3em",
                    fontWeight: 900
                  }} />
                  {
                    item.acf.beitrage.slice(0, 3).map((beitrag, i) =>
                          this.state.posts.map((post, i) =>
                            beitrag === post.id ?
                              <div style={{
                                position: "absolute",
                                width: "100%",
                                
                                display: "inline",

                              }}>
                                <img key={"post-" + i} src={post.better_featured_image.source_url} style={{
                                  width: "50%",
                                }} />
                              </div>
                              : null
                          )
                        
                     
                    )
                  }
                </Grid>
              </Grid>

            )}
          </Grid>
        </Grid>

      </Grid>

    );
  }
}

export default Projekte;
