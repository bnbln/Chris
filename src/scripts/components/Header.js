import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {ReactTitle} from 'react-meta-tags';
import sizeMe from 'react-sizeme';
import igSvg from "./../../assets/instagram.svg";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import myjson from "../../assets/chris.json"




class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuopen: false,
      menu: [],
      social: [],
      isMounted: false,
      isLoaded: false,
      cookies: null,
      cookiesLoaded: false
    }
    }
    async componentDidMount() {
      this.setState({isMounted: true});
      const response = await fetch('https://chris.thesolu.com/wp-json/menus/header');
      const json = await response.json();
      const responseSocial = await fetch('https://chris.thesolu.com/wp-json/menus/social');
      const jsonSocial = await responseSocial.json();
      if (this.state.isMounted) {
        this.setState({ menu: json, social: jsonSocial, isLoaded: true });

      var value = "; " + document.cookie;
      var parts = value.split("; " + "useCookies" + "=");
      if (parts.length == 2)
       var result = parts.pop().split(";").shift();
       if (result === "true") {
          this.setState({cookies: true, cookiesLoaded: true});
       }
       else {
        this.setState({cookiesLoaded: true});
       }
      }

      
    }

    componentWillUnmount(){
      this.state.isMounted = false
  }

  render() {
    const {
      size: {
        width
      }
    } = this.props;
    if (this.state.cookies === true) {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-126668979-4');
    }
    return (
      <Grid container justify="center" alignItems="center">
        <ReactTitle title={this.props.info ? this.props.info.name +" - "+this.props.info.description : null} />
        {this.state.cookiesLoaded === true && this.state.cookies === null ?
          <Grid item className="cookieBanner">
          <p style={{display: "inline"}}>Diese Seite nutzt Cookies</p>
          <Button variant="outlined" color="primary" size="small" onClick={()=>{this.props.history.push("/privacy-policy")}} style={{
            marginRight: 10,
            marginLeft: 10
          }}>Mehr dazu</Button>
          <Button variant="contained" size="small" onClick={() => {
            document.cookie = "useCookies=true; max-age=1004800";
            this.setState({cookies: true})
          }}>
            Zustimmen
          </Button>
        </Grid>
          : null
        }



        {/* <Scene /> */}
        <AppBar position="fixed" color="default" style={{
          //transition: "all 0.1s ease-in-out",
          backgroundColor: "rgba(255,255,255," + Math.min(1, this.props.scroll * 0.005) + ")",
          boxShadow: "none"
      }}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={11} >
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  {this.props.info ?
                    <div style={{
                      //display: "none"
                    }}>
                      <h1 style={{
                        fontSize: "1.4em",
                        margin: 0,
                        fontWeight: 900
                      }}>{this.props.info.name}</h1>
                      {/* <h5 style={{ textAlign: "center" }}>{this.props.info.description}</h5> */}
                    </div>
                    : null}
                </Grid>
                <Grid item>
                  <Grid container justify="flex-end" alignItems="center" direction="row">
                    <Grid item>
                      {this.state.menu.map((item, i) =>
                        <Button key={i} component={Link}
                          style={{
                            margin: "5px",
                            padding: "5px 15px"
                          }}
                          to={item.url.substr(0, 26) === "https://chris.thesolu.com/" ?
                            "/" + item.url.substr(26).slice(0, -1)
                            : item.url === "https://christophhalstenberg.com" ?
                              "/"
                              : item.url} onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  behavior: 'smooth'
                                });
                              }}>
                          {item.title}
                        </Button>
                      )}
                    </Grid>
                    <Grid item>
                      {this.state.social.map((item, i) =>
                        <a href={item.url} key={i}>
                          {item.title === "Instagram" ?
                            <Button >
                              <img src={`/${igSvg}`} style={{ width: "15px" }}></img>
                            </Button>
                            :
                            <Button >
                              {item.title}
                            </Button>}
                        </a>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                </Grid>
              </Grid>
            </Grid>
        </AppBar>
      </Grid>
    );
  }
}

export default sizeMe()(Header);
