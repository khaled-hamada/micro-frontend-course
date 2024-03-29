import React, { useRef, useEffect } from 'react';
import { mount } from 'marketing/Marketing';
import { useHistory } from 'react-router-dom';
export default () => {
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
    });
    history.listen(onParentNavigate);
  }, []);
  return <div ref={ref}></div>;
};
