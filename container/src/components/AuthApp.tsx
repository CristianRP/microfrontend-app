import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import { mount } from 'auth/AuthApp';


type LocationType = {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
  key: string;
}

interface AuthAppProps {
  onSignIn: Function;
}

export default ({ onSignIn }: AuthAppProps) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }: LocationType) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn,
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
