import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { App } from './App';

const Index = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

window.onload = () => {
  ReactDOM.render(<Index />, document.getElementById('root'));
};

// In Dappy, window is already loaded when this code executes
if (typeof dappyRChain !== 'undefined') {
  dappyRChain
    .fetch('dappy://REGISTRY_URI')
    .then((a) => {
      const response = JSON.parse(a);
      const rholangTerm = response.expr[0];
      const mainValues = blockchainUtils.rhoValToJs(rholangTerm);
      console.log(mainValues);

      dappyRChain
        .identify({ publicKey: undefined })
        .then((a) => {
          if (a.identified) {
            store.dispatch({
              type: 'INIT',
              payload: {
                registryUri: mainValues.registryUri.replace('rho:id:', ''),
                publicKey: a.publicKey,
              },
            });
            ReactDOM.render(<Index />, document.getElementById('root'));
          } else {
            console.error('This dapp needs identification');
          }
        })
        .catch((err) => {
          console.error('This dapp needs identification');
          console.log(err);
        });
    })
    .catch((err) => {
      console.error(
        'Something went wrong when retreiving the files module object'
      );
      console.log(err);
    });
}
