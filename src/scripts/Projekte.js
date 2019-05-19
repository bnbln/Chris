import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


class Projekte extends Component {
  constructor(props){
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

    console.log("data: ",this.state.data);

    return (
      <Grid container justify="center" style={{minHeight: "100vh"}}>
        <Grid item xs={11} sm={11} md={8}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <h1>Projekte</h1>
            </Grid>          
            {this.state.data.map((item, i) =>  
                <Grid container justify="flex-start" className="hoverBox" 
                onClick={()=> {this.props.history.push("/projekte/" + item.slug)}}
                style={{
                  cursor: "pointer"
                }}> 
                  <Grid item> 
                    <Grid container justify="flex-start" alignItems="center">
                    <Grid item xs={Math.min(item.acf.beitrage.length, 3)  % 2 === 1 ? 6: 6} sm={12} >
                    <h2 dangerouslySetInnerHTML={{__html: item.title.rendered}} style={{
                      textTransform: "uppercase",
                      fontSize: "1.3em",
                      fontWeight: 900
                    }}/>
                    </Grid>
                    {
                      item.acf.beitrage.slice(0,3).map((beitrag, i) =>
                        <Grid item xs={Math.min(item.acf.beitrage.length, 3)  % 2 === 1 ? 6: 6} sm={Math.min(item.acf.beitrage.length, 3)  % 2 === 1 ?  12/(Math.min(item.acf.beitrage.length, 3)) : 12/Math.min(item.acf.beitrage.length, 4)  } 
                        key={"beitrag-"+i} style={{
                          paddingRight: 16
                        }}>
                        {console.log(item.title.rendered, item.acf.beitrage.length % 2 === 1 ?  12/(item.acf.beitrage.length +1)  : 12/item.acf.beitrage.length  )}
                        {
                          this.state.posts.map((post, i) =>
                            beitrag === post.id ?
                                <img key={"post-" + i} src={post.better_featured_image.source_url} style={{
                                        width: "100%"}} />
                                : null
                          )
                        }
                      </Grid>
                      )
                    }
                    </Grid>
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
