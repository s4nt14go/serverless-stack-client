import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Loadable from 'react-loadable';
import LoadingComponent from "./components/LoadingComponent";


const [AsyncHome, AsyncLogin, AsyncNotes, AsyncSignup, AsyncNewNote, AsyncNotFound, AsyncSettings] =
  ['Home', 'Login', 'Notes', 'Signup', 'NewNote', 'NotFound', 'Settings'].map(e => {
  return Loadable({
    loader: () => import(`./containers/${e}`),
    loading: LoadingComponent
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
      <Route>
        <AsyncNotFound />
      </Route>
    </Switch>
  );
}
