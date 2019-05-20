import React, { Component } from 'react';
import lottie from "lottie-web";
import Grid from '@material-ui/core/Grid';

import myjson from "../../assets/chris.json"




class Lottie extends Component {
  constructor(props){
    super(props);
    this.state = {
      isMounted: false
    }
    }
    componentDidMount() {
      this.setState({isMounted: true});
      lottie.loadAnimation({
        container: document.getElementById('animationContainer1'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: myjson
      });
    }

    componentWillUnmount(){
      this.state.isMounted = false
  }

  render() {
    return (
      <Grid container justify="center" alignItems="center"  style={{
        height: "100vh",
        width: "100%",
        background: "linear-gradient(to bottom, pink 0 %, rgba(255, 255, 255, 1) 100 %)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url()",
 
        overflow: "hidden"
         
      }}>  
        <Grid id="animationContainer1" style={{height: "100vh"}}>

        </Grid>
        <Grid item xs={7}  style={{
            width:"100%",
            height: "50vh",
          overflow: "hidden",
          backgroundColor: "rgba(255,255,255,0.8)"
          }} />
      </Grid>
    )
  }
}

export default Lottie;
