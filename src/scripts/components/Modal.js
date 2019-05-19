import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import ReactPlayer from 'react-player';
import sizeMe from 'react-sizeme';
import {HotKeys} from 'react-hotkeys';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';



class MyModal extends Component {
    constructor(props) {
        super(props);
      }
    
      render() {
        const keyMap = {
        moveUp: 'left',
        }
        const handlers = {
          'moveUp': () => this.closeLightbox
        };
        var htmlDoc = document.getElementsByTagName("html");
        if (this.props.lightboxIsOpen === true) {
          htmlDoc[0].style = "overflow: hidden"
    
        } else {
          htmlDoc[0].style = "overflow: scroll"
        }
    
        var iosSafariVideo = document.getElementsByTagName("video");
        for (var i = 0; i < iosSafariVideo.length; i++) {
          iosSafariVideo[i].setAttribute("playsinline", "true");
        }
        console.log("Query:", this.props.currentImage)
    return (
        <div>
            {this.props.lightboxIsOpen === true ?
                <div style={{
                    position: "fixed",
                    width: "100%",
                    height: "100vh",
                    top: "0px",
                    left: "0px",
                    paddig: "20px",
                    zIndex: 1000
                  }} >
                    {this.props.posts[this.props.currentImage] ?
                      this.props.posts[this.props.currentImage].format === "video" ?
                        this.props.posts[this.props.currentImage].acf ?
                          this.props.posts[this.props.currentImage].acf.video_file ?
                          <Grid container alignItems="center" justify="center" style={{
                              backgroundColor: "rgba(0,0,0,0.9)",
                              height: "100vh",
                              width: "100%",
                              overflowY: "scroll",
                              paddingTop: 100,
                              paddingBottom: 50,
                            }}>
                          <Grid item>
                            <ReactPlayer url={this.props.posts[this.props.currentImage].acf.video_file} height="80vh" width="100%" playing loop
                              style={{

                                  maxWidth: "100%",
                                  position: "relative",
                                  transform: "translateX("+ this.props.loadedVideo === true ? 0 : -800+"px)",
                                  transition: "0.3s ease-in-out",
                                  opacity: this.props.loadedVideo === true ? 1 : 0
                                }}
                                onPlay={this.props.onPlay}
                                playsinline
                                />
                              {this.props.loadedVideo === false ?
                                <CircularProgress style={{
                                    color: "white",
                                    position: "fixed",
                                    top: "48vh",
                                    left: "48%"
                                  }} />
                              : null}
                            </Grid>
                            </Grid>
                          : null
                        : null
                      : this.props.posts[this.props.currentImage].format === "standard" ?
                      <Grid container  justify="center" style={{
                          backgroundColor: "rgba(0,0,0,0.9)",
                          height: "100vh",
                          width: "100%",
                          overflowY: "scroll",
                          paddingTop: 100,
                          paddingBottom: 50,
                        }}>
                      <Grid item xs={8}>
                        {console.log(this.props.posts[this.props.currentImage])}
                        {this.props.posts[this.props.currentImage].better_featured_image ?
                          this.props.posts[this.props.currentImage].better_featured_image.source_url ?
                          console.log(this.props.posts[this.props.currentImage].better_featured_image.source_url)
                        : null
                        :null}
                        <div dangerouslySetInnerHTML={{__html: this.props.posts[this.props.currentImage].content.rendered}}
                          style={{
                            color: "white"
                          }}
                          ></div>

                      </Grid>
                      </Grid>
                      : null
                    : null}
                    <Grid item>
                      {this.props.children}
                    </Grid>

                  <HotKeys keyMap={keyMap} handlers={handlers}>

                  <Grid container style={{
                      position: "fixed",
                      width: "100%",
                      top: "0px",
                      padding: "20px",
                      left: "0px",
                      tIndex: 1000,
                      backgroundColor: "rgba(27,27,27,0.44)",
                    }} justify="center">
                    <Grid item>
                      <Button onClick={this.props.closeLightbox} style={{color: "white"}}>Close</Button>
                    </Grid>
                    {this.props.posts[this.props.currentImage  - 1 ] ?
                      <Grid item>
                        <Button onClick={this.props.gotoPrevious} style={{color: "white"}}>Previous</Button>
                      </Grid>
                      : null}
                    {this.props.posts[this.props.currentImage  + 1 ] != undefined ?
                      <Grid item>
                        <Button onClick={this.props.gotoNext} style={{color: "white"}}>Next</Button>
                      </Grid>
                      : null}

                  </Grid>
                  </HotKeys>
                </div>
                :null}
        </div>
        );
      }
    }

    export default sizeMe()(MyModal);
