import React, { Component } from 'react';
import lottie from "lottie-web";
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
        <div id="animationContainer1" style={{
          width:"100%",
          height: "90vh",
          overflow: "hidden"
        }} />
    )
  }
}

export default Lottie;
