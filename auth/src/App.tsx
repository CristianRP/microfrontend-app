import React, { MouseEventHandler } from 'react'
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { MemoryHistory } from 'history';
import { SignUp, Signin } from './components';


const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});

interface AppProps {
  history: MemoryHistory;
  onSignIn: MouseEventHandler;
}

export default ({ history, onSignIn }: AppProps ) => {
  return (
    <div>
      <StylesProvider generateClassName={ generateClassName }>
        <Router history={ history }>
          <Switch>
            <Route path='/auth/signin'>
              <Signin onSignIn={onSignIn} />
            </Route>
            <Route exact path='/auth/signup'>
              <SignUp onSignUp={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}
