import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import {onError} from "./libs/errorLib";
import { initSentry } from './libs/errorLib';
import ErrorBoundary from "./components/ErrorBoundary";
import config from "./config";

initSentry();

function App() {
  const history = useHistory();

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [fbIdentityId, setFbIdentityId] = useState();// We set this when the user logs in with facebook so we can:
  // * Hide the buttons to change email and password in settings
  // * As Amplify doesn't set correctly the identityId when user logs in with facebook, Storage.vault.put fails
  // so we'll use AWS.S3().puObject instead
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    loadFacebookSDK();
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      console.l(e);
      if (e !== 'No current user') {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  function loadFacebookSDK() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId            : config.social.FB,
        cookie           : true,
        xfbml            : true,
        version          : 'v8.0'
      });
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated ? (
              <>
                <LinkContainer to="/settings">
                  <NavItem>Settings</NavItem>
                </LinkContainer>
                <NavItem onClick={handleLogout}>Logout</NavItem>
              </>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ErrorBoundary>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, fbIdentityId, setFbIdentityId }}>
          <Routes />
        </AppContext.Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
