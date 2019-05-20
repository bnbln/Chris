import React from 'react';
import Gallery from 'react-photo-gallery';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {HotKeys} from 'react-hotkeys';
import ReactPlayer from 'react-player';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyModal from "./Modal"



class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    currentImage: 0,
    lightboxIsOpen: false,
    loadedVideo: false,
    isMounted: false,
    isLoaded: false,
  };
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.onPlay = this.onPlay.bind(this);

  }
  componentDidMount(){
    this.setState({isMounted: true});
    const params = new URLSearchParams(this.props.location.search);
    const post = params.get('post'); // bar
    if (post != null) this.setState({currentImage: post, lightboxIsOpen: true})
      console.log(post)
  }

  componentWillUnmount() {
    this.state.isMounted = false;
    this.state.isLoaded = false
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
    this.props.history.push("./" )
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
      loadedVideo: false
    });
    this.props.history.push("./?post=" + (this.state.currentImage - 1) )
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
      loadedVideo: false
    });
    this.props.history.push("./?post=" + (this.state.currentImage + 1) )

  }
  onPlay() {
    console.log("ready");
    this.setState({
      loadedVideo: true
    });
  }

  render() {
    return (
        this.props.photos ?
        <div>
            <Grid container alignItems="center" justify="center" direction="row">
            <Grid item xs={11}>
                    <Grid container alignItems="center" justify="center" spacing={24} direction="row">
                    {this.props.photos.map((index, i) => 
                    <Grid item xs={12} sm={6} md={4} xl={3} key={i} style={{
                        cursor: "pointer",
                        transition: "opacity 0.5s ease-in-out",
                            opacity: this.state.isMounted === true && this.state[i] === true ? 1 : 0
                        
                    }} 
                        onClick={
                            ()=>{this.props.history.push("?post="+i ); this.openLightbox(i)}
                        }>
                        <div 
                         onLoad={()=> this.setState({isLoaded: true, [i]: true})} 
                         className="feedimage"
                         style={{
                          width: "100%",
                          position: "relative",
                          paddingBottom: "50%",
                          backgroundImage: "url("+ index.src +")",
                          backgroundPosition: "center center",
                          backgroundSize: "cover"
                        }}>
                          <img src={index.src}  style={{
                            width: "100%",
                            height: 0,
                            position: "relative",
                            left: 0,
                            top: 0
                            
                        }} />
                        </div>
                        
                    </Grid>
                    )}
                    </Grid>
                </Grid>
            
            </Grid>
            <MyModal 
            {...this.props}
              lightboxIsOpen={this.state.lightboxIsOpen} 
              posts={this.props.posts} 
              currentImage={this.state.currentImage} 
              closeLightbox={this.closeLightbox} 
              gotoPrevious={this.gotoPrevious} 
              gotoNext={this.gotoNext} 
              loadedVideo={this.state.loadedVideo} 
              onPlay={this.onPlay}  
            />
        </div>
      : null
    )
  }
}

export default Images;
