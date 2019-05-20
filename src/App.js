import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { AnimatedSwitch } from 'react-router-transition';
import Home from './scripts/Home';
import Page from './scripts/Page';
import Projekte from './scripts/Projekte';
import Projekt from './scripts/Projekt';
import Header from './scripts/components/Header';
import Footer from './scripts/components/Footer';
import Error from './scripts/components/Error';
import "./index.scss";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 12
  },
  text: {
    primary: "#fff"
  },
  palette: {
    primary: {
      main: '#ffffff',
      contrastText: '#fff'
    },
    secondary: {
      main: '#064260'
    },
  },
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      pages: [],
      isMounted: false,
      isLoaded: false,
      scroll: 0
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  updateDimensions(e) {
    console.log(e.path[1].pageYOffset)
    this.setState({
      scroll: e.path[1].pageYOffset
    })
  }
  async componentDidMount() {
    this.setState({ isMounted: true });
    window.addEventListener('scroll', this.updateDimensions);
    const responseInfo = await fetch('https://chris.thesolu.com/wp-json/');
    const jsonInfo = await responseInfo.json();
    const responsePages = await fetch('https://chris.thesolu.com/wp-json/wp/v2/pages');
    const jsonPages = await responsePages.json();
    if (this.state.isMounted) {
      this.setState({ info: jsonInfo, pages: jsonPages, isLoaded: true });
    }
  }

  componentWillUnmount() {
    this.state.isMounted = false
    window.removeEventListener("scroll", this.updateDimensions);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div style={{
            overflow: "hidden",
            transition: "opacity 0.5s ease-in-out",
            opacity: this.state.isMounted === true ? 1 : 0
          }}>
            <Route path="/" render={(props) => <Header {...props} info={this.state.info} scroll={this.state.scroll} />} />
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}
              className="switch-wrapper"

            >
              <Route path="/" exact render={(props) => <Home {...props} />} />
              <Route path="/projekte" exact render={(props) => <Projekte {...props} />} />
              <Route path="/projekte/:slug" render={(props) => <Projekt {...props} />} />
              {this.state.pages.map((index, i) =>
                <Route path={"/" + index.slug} key={i} render={(props) => <Page {...props} pages={this.state.pages[i]} />} />
              )}
              {this.state.pages && this.state.isLoaded ? <Route render={(props) => <Error {...props} />} /> : null}
              {/* <Route path="/:slug" render={(props) => <Page {...props} />} /> */}

            </AnimatedSwitch>
            <Route path="/" render={(props) => <Footer {...props} />} />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App;
