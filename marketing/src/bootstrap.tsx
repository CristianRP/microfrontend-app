import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, LocationListener } from 'history';

import App from './App';

interface ListenerProps {
  onNavigate: LocationListener;
}

// Mount function to start up the app
const mount = (element: HTMLElement, { onNavigate }: ListenerProps) => {
  const history = createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(
    <App history={ history } />,
    element,
  );
}

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector<HTMLElement>('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot, {
      onNavigate: () => {
        console.log('Mounted in isolation');
      }
    });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
