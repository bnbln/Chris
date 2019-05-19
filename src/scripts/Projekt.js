import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MyModal from "./components/Modal"



class Projekt extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      posts: [],
      currentImage: 0,
      lightboxIsOpen: false,
      loadedVideo: false 
    }
    this.fetchPageData = this.fetchPageData.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.onPlay = this.onPlay.bind(this);

  }

  openLightbox(index) {
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
      loadedVideo: false
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
      loadedVideo: false
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
      loadedVideo: false
    });
  }
  onPlay() {
    console.log("ready");
    this.setState({
      loadedVideo: true
    });
  }

  componentDidMount() {
    this.fetchPageData();
  }

  fetchPageData() {
    fetch("https://chris.thesolu.com/wp-json/wp/v2/projekte?slug=" + this.props.match.params.slug)
    .then(res => res.json())
    .then(json => this.setState({ data: json }));
    fetch("https://chris.thesolu.com/wp-json/wp/v2/posts?per_page=99")
    .then(res => res.json())
    .then(json => this.setState({ posts: json })); 
  }

  render() {
    var data = this.state.data[0] != undefined ? this.state.data[0] : null;
    console.log("data: ",data);

    const photostring = []
    if (data != null) {
        data.acf.beitrage.map((beitrag, i) =>

                    this.state.posts.map((post, i) =>
                    beitrag === post.id ?
                    photostring.push(
                        {
                            src: post.better_featured_image.source_url,
                            width: post.better_featured_image.media_details.width,
                            height: post.better_featured_image.media_details.height,
                            key: "key-"+i+"",
                            post
                        }
                    )
                        : null
                    )

                );
    }

                        
                      console.log("photostring", photostring)

    return (
      <Grid container justify="center" style={{minHeight: "100vh"}}>
        {this.state.data[0] ?
            <Grid item xs={11}>
              <h1 dangerouslySetInnerHTML={{__html: data.title.rendered}}/>
              <div dangerouslySetInnerHTML={{__html: data.content.rendered}}/>

              {this.state.data.map((item, i) =>  
                    <Grid container justify="flex-start" alignItems="center" spacing={16}>
                    {
                      item.acf.beitrage.map((beitrag, i) =>
                            this.state.posts.map((post, i) =>
                                beitrag === post.id ?

                                    <Grid item xs={12} sm={6} md={4} xl={3} key={"post-" + i} style={{
                                        cursor: "pointer",
                                        paddingBottom: 7
                                        
                                    }} 
                                        onClick={
                                            ()=>{this.openLightbox(i)}
                                        }>
                                        <img src={post.better_featured_image.source_url} className="feedimage" style={{
                                            width: "100%"
                                        }} />
                                    </Grid>
                                    : null
                            )
                            )}
                            
                        </Grid>
                      )
                    }
                    </Grid>
        : null}
        <MyModal 
              posts={this.state.posts}
              lightboxIsOpen={this.state.lightboxIsOpen} 
              currentImage={this.state.currentImage} 
              loadedVideo={this.state.loadedVideo} 

              closeLightbox={this.closeLightbox} 
              gotoPrevious={this.gotoPrevious} 
              gotoNext={this.gotoNext} 
              onPlay={this.onPlay}  
            />
       
      </Grid>

    );
  }
}

export default Projekt;
