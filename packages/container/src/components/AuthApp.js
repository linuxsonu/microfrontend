import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathName }) => {
        const { pathName } = history.location;
        if (pathName !== nextPathName) {
          history.push(nextPathName);
        }
      },
      onSignIn: () => {
        onSignIn();
      },
    });
    history.listen(onParentNavigate);
  }, []);
  return <div ref={ref} />;
};
