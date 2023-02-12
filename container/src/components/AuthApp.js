import React, { useRef, useEffect } from 'react';
import { mount } from 'auth/Auth';
import { useHistory } from 'react-router-dom';
export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathName }) => {
        // only push history in case of path change
        const { pathname } = history.location;
        if (nextPathName !== pathname) {
          history.push(nextPathName);
        }
      },
      initialPath: history.location.pathname,
      onSignIn,
    });
    history.listen(onParentNavigate);
  }, []);
  return <div ref={ref}></div>;
};
