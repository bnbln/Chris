import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import ReactPlayer from 'react-player';
import sizeMe from 'react-sizeme';
import ImageGrid from "./components/ImageGrid"
import Images from "./components/Images"
import MyModal from "./components/Modal"
import Lottie from "./components/Lottie";



class Home extends Component {
  constructor(props){
    super(props);
    this.divElement = React.createRef();
    this.state = {
      posts: [],
      isMounted: false,
      isLoaded: false,
      hasMore: false,
      page: 1,
      open: false,
      active: null,
      scroll: 0
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.hasLoaded = this.hasLoaded.bind(this)

  }
  updateDimensions() {
    this.setState({
      scroll: window.scrollY
    })
    var scrolledToBottom = document.body.scrollHeight - window.innerHeight;
    console.log(this.state.scroll ,scrolledToBottom)
    if (this.state.scroll >= scrolledToBottom) {
      console.log("loading more posts...");
        this.loadMore(this.state.page)
    }
  }
  async componentDidMount() {
    this.setState({isMounted: true});
    const response = await fetch('https://chris.thesolu.com/wp-json/wp/v2/posts?per_page=99');
    const json = await response.json();
    if (this.state.isMounted) {
      this.setState({ posts: json, isLoaded: true });
      if (this.state.posts.length > 8) {
        this.setState({hasMore: true})
      }
      const height = this.divElement.clientHeight;
      this.setState({ height });
      window.addEventListener('scroll', this.updateDimensions)
    } 
    
  }
  handleOpen = () => {
    this.setState({  });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateDimensions);
    this.state.isMounted = false;
    this.state.isLoaded = false
  }
  loadMore(page) {
    this.setState({page: this.state.page + 9})
  }
  hasLoaded(){

  }

  render() {
    const {
    } = this.props;
    const photostring = []
    this.state.posts.slice(0, 8 + this.state.page ).map((post,i) =>
      post.better_featured_image ?
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
    return (
      <div ref={this.divElement} style={{transition: "opacity 0.5s ease-in-out",
      opacity: this.state.isMounted === true && this.state.isLoaded === true ? 1 : 0}}>
        <Lottie scroll={this.state.scroll}  />
        <Grid container justify="center" spacing={8} style={{ minHeight: "100vh", marginTop: 10}}>
          {photostring[0] ?
            photostring[0].src ?
              <Images {... this.props} photos={photostring} posts={this.state.posts} hasLoaded={this.state.hasLoaded}/>
              :null
            : null}
            </Grid>
          </div>
        );
      }
    }

    export default sizeMe()(Home);
