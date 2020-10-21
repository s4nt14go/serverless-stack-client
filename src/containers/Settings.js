import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {API} from "aws-amplify";
import { onError } from "../libs/errorLib";
import config from "../config";
import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "../components/BillingForm";
import "./Settings.css";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";

export default function Settings() {
  const { fbIdentityId } = useAppContext();

  const [stripe, setStripe] = useState(null);
  useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_KEY));
  }, []);

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  function billUser(details) {
    return API.post("notes", "/billing", {
      body: details
    });
  }

  async function handleFormSubmit(storage, { token, error }) {
    console.l('storage', storage);
    console.l('token', token);
    console.l('error', error);
    if (error) {
      onError(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storage,
        source: token.id
      });

      alert("Your card has been charged successfully!");
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Settings">
      {!fbIdentityId && <>
        <LinkContainer to="/settings/email">
          <LoaderButton block bsSize="large">
            Change Email
          </LoaderButton>
        </LinkContainer>
        <LinkContainer to="/settings/password">
          <LoaderButton block bsSize="large">
            Change Password
          </LoaderButton>
        </LinkContainer>
        <hr />
      </>}
      <StripeProvider stripe={stripe}>
        <Elements>
          <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
        </Elements>
      </StripeProvider>
    </div>
  );
}
