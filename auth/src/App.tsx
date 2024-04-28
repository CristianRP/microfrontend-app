import React from 'react'
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { MemoryHistory } from 'history';
import { SignUp, Signin } from './components';


const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});

interface AppProps {
  history: MemoryHistory;
}

export default ({ history }: AppProps ) => {
  return (
    <div>
      <StylesProvider generateClassName={ generateClassName }>
        <Router history={ history }>
          <Switch>
            <Route path='/auth/signin' component={Signin} />
            <Route exact path='/auth/signup' component={SignUp} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}
