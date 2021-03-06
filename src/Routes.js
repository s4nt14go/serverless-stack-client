import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Loadable from 'react-loadable';
import LoadingComponent from "./components/LoadingComponent";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";


const [AsyncHome, AsyncLogin, AsyncNotes, AsyncSignup, AsyncNewNote, AsyncNotFound, AsyncSettings, AsyncResetPassword] =
  ['Home', 'Login', 'Notes', 'Signup', 'NewNote', 'NotFound', 'Settings', 'ResetPassword'].map(e => {
  return Loadable({
    loader: () => import(`./containers/${e}`),
    loading: LoadingComponent,
    delay: 300,
  })
});

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <AsyncHome />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <AsyncLogin />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <AsyncSignup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/settings">
        <AsyncSettings />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/notes/new">
        <AsyncNewNote />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/notes/:id">
        <AsyncNotes />
      </AuthenticatedRoute>
      <UnauthenticatedRoute exact path="/login/reset">
        <AsyncResetPassword />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/settings/password">
        <ChangePassword />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/settings/email">
        <ChangeEmail />
      </AuthenticatedRoute>
      <Route>
        <AsyncNotFound />
      </Route>
    </Switch>
  );
}
