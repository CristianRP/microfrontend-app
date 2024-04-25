import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, LocationListener, createBrowserHistory, MemoryHistory } from 'history';

import App from './App';

interface ListenerProps {
  onNavigate?: LocationListener;
  defaultHistory?: MemoryHistory;
}

type LocationType = {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
  key: string;
}

// Mount function to start up the app
const mount = (element: HTMLElement, { onNavigate, defaultHistory }: ListenerProps) => {
  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(
    <App history={ history } />,
    element,
  );

  return {
    onParentNavigate({ pathname: nextPathname }: LocationType) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector<HTMLElement>('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory() as MemoryHistory
    });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
