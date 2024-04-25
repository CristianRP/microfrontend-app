import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import { mount } from 'marketing/MarketingApp';


type LocationType = {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
  key: string;
}

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }: LocationType) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      }
    });
  }, []);

  return <div ref={ref} />;
};
