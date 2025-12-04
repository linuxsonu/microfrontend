import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";
// Mount function to start up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory }) => {
  const history =
    defaultHistory || createMemoryHistory({ initialEntries: ["/auth/signin"] });
  if (onNavigate) history.listen(onNavigate);
  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);
  return {
    onParentNavigate({ pathName: nextPathName }) {
      const { pathName } = history.location;
      if (pathName !== nextPathName) {
        history.push(nextPathName);
      }
    },
  };
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and should export the mount function
export { mount };
