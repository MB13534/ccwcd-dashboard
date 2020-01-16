import React from "react";
import * as Sentry from "@sentry/browser";
import ReactDOM from "react-dom";
import App from "./App";

import ErrorBoundary from "./components/ErrorBoundary";
import { Auth0Provider } from "./hooks/auth";
import * as serviceWorker from "./serviceWorker";

// Configure error tracking with Sentry
Sentry.init({
  dsn: "https://e68b1cd5e7a1495c9a8b66f971511079@sentry.io/1485108",
  environment: process.env.REACT_APP_ENVIRONMENT,
});

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <ErrorBoundary>
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      client_id={process.env.REACT_APP_CLIENTID}
      redirect_uri={window.location.origin}
      audience={process.env.REACT_APP_AUDIENCE}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
