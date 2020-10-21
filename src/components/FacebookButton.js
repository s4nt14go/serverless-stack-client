import React, { useEffect, useState} from "react";
import {API, Auth} from "aws-amplify";
import LoaderButton from "./LoaderButton";
import {onError} from "../libs/errorLib";
import {useAppContext} from "../libs/contextLib";
import AWS from "aws-sdk/global";
import config from '../config';

function waitForInit() {
  return new Promise((res, _rej) => {
    const hasFbLoaded = () => {
      if (window.FB) {
        res();
      } else {
        setTimeout(hasFbLoaded, 300);
      }
    };
    hasFbLoaded();
  });
}

export default function FacebookButton() {
  const { userHasAuthenticated, setFbIdentityId } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    (async () => {
      await waitForInit();
      setIsLoading(false);
    })();
  }, []);

  const statusChangeCallback = response => {
    if (response.status === "connected") {
      handleResponse(response.authResponse);
    } else {
      onError(response);
    }
  };

  const checkLoginState = () => {
    window.FB.getLoginStatus(statusChangeCallback);
  };

  const handleClick = () => {
    window.FB.login(checkLoginState, {scope: "public_profile,email"});
  };

  async function handleResponse(data) {
    const { email, accessToken: token, expiresIn } = data;
    const expires_at = expiresIn * 1000 + new Date().getTime();
    const user = { email };

    setIsLoading(true);

    try {
      const response = await Auth.federatedSignIn(
        "facebook",
        { token, expires_at },
        user
      );
      const indentityId = await API.get("notes", "/identity-id");
      setFbIdentityId(indentityId);
      AWS.config.update({ region: config.cognito.REGION,
        credentials: new AWS.Credentials(response.accessKeyId, response.secretAccessKey, response.sessionToken) });
      userHasAuthenticated(true);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      onError(e);
    }
  }

  return (
    <LoaderButton
      block
      bsSize="large"
      bsStyle="primary"
      className="FacebookButton"
      text="Login with Facebook"
      onClick={handleClick}
      disabled={isLoading}
    >
      Login with Facebook
    </LoaderButton>
  );
}
