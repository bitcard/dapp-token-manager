import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {
  purchaseTokensTerm,
  createTokensTerm,
  updateTokenDataTerm,
  setLockedTerm,
  mainTerm,
  updateBagDataTerm,
  sendTokensTerm,
} from 'rchain-token';

import { Top } from './Top';
import { Dashboard } from './Dashboard';
import { Transactions } from './Transactions';
import { UpdateTokenData } from './UpdateTokenData';
import { CreateToken } from './CreateToken';
import { SetLocked } from './SetLocked';
import { SendTokens } from './SendTokens';
import { PurchaseToken } from './PurchaseToken';
import { Deploy } from './Deploy';
import { UpdateBagData } from './UpdateBagData';

import { BagsData } from './BagsData';
import { loadToken } from './loadToken';

const AppComponent = (props) => {
  const [registryUri, setRegistryUri] = useState(undefined);

  const contractLoaded = props.bags && props.tokensData && props.registryUri;

  const dashboard = typeof props.tab === 'undefined';

  return (
    <div className="container">
      <h2 className="title is-2">rchain-token manager</h2>
      <div className="columns left-menu">
        <div className="column is-one-quarter">
          <div className="menu">
            <ul className="menu-list">
              <li>
                {' '}
                <a
                  className=""
                  onClick={(e) => {
                    props.goDashboard();
                  }}
                >
                  Dashboard
                </a>
              </li>
              <li>
                {' '}
                <a
                  className=""
                  onClick={(e) => {
                    props.goDeploy();
                  }}
                >
                  Deploy
                </a>
              </li>
              <li>
                {' '}
                <a
                  className=""
                  onClick={(e) => {
                    props.goTransactions();
                  }}
                >
                  Transactions
                </a>
              </li>
              {contractLoaded ? (
                <Fragment>
                  <li>
                    <a
                      onClick={(e) => {
                        props.goPurchase();
                      }}
                    >
                      Purchase token(s)
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.locked ? 'is-static' : ''}
                      title="Contract is locked, cannot create token"
                      onClick={(e) => {
                        if (!props.locked) props.goCreateToken();
                      }}
                    >
                      Create token(s)
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        props.goSend();
                      }}
                    >
                      Send token(s)
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.locked ? 'is-static' : ''}
                      title="Contract is locked, cannot update token data"
                      onClick={(e) => {
                        if (!props.locked) props.goUpdateTokenData();
                      }}
                    >
                      Update token data
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        props.goUpdateBagData();
                      }}
                    >
                      Update bag data
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        props.goSeeBagsData();
                      }}
                    >
                      See bags data
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.locked ? 'is-static' : ''}
                      title="Contract is locked, cannot lock"
                      onClick={(e) => {
                        if (!props.locked) props.goSetLocked();
                      }}
                    >
                      Lock contract
                    </a>
                  </li>
                </Fragment>
              ) : undefined}
            </ul>
          </div>
        </div>
        <div className="column is-three-quarters">
          {dashboard ? (
            <Top
              loadToken={(p) => {
                setRegistryUri(p.registryUri);
                props.loadToken(p);
              }}
              registryUri={registryUri}
              loading={props.loading}
            ></Top>
          ) : undefined}
          {props.tab === 'transactions' ? (
            <Transactions></Transactions>
          ) : undefined}
          {props.tab === 'creatingToken' ? (
            <CreateToken
              registryUri={registryUri}
              createToken={props.createToken}
            ></CreateToken>
          ) : undefined}
          {props.tab === 'sending' ? (
            <SendTokens
              registryUri={registryUri}
              bags={props.bags}
              publicKey={props.publicKey}
              sendTokens={props.sendTokens}
            ></SendTokens>
          ) : undefined}
          {props.tab === 'purchasing' ? (
            <PurchaseToken
              registryUri={registryUri}
              purchaseToken={props.purchaseToken}
              publicKey={props.publicKey}
              bags={props.bags}
            ></PurchaseToken>
          ) : undefined}
          {props.tab === 'updatingTokenData' ? (
            <UpdateTokenData
              registryUri={registryUri}
              updateTokenData={props.updateTokenData}
              tokensData={props.tokensData}
            ></UpdateTokenData>
          ) : undefined}
          {props.tab === 'seeingBagsData' ? (
            <BagsData bagsData={props.bagsData}></BagsData>
          ) : undefined}
          {props.tab === 'updatingBagData' ? (
            <UpdateBagData
              registryUri={registryUri}
              updateBagData={props.updateBagData}
              bagsData={props.bagsData}
              bags={props.bags}
            ></UpdateBagData>
          ) : undefined}
          {props.tab === 'locking' ? (
            <SetLocked
              registryUri={registryUri}
              setLocked={props.setLocked}
            ></SetLocked>
          ) : undefined}
          {props.tab === 'deploying' ? (
            <Deploy deploy={props.deploy} publicKey={props.publicKey}></Deploy>
          ) : undefined}
          {contractLoaded && dashboard ? (
            <Dashboard
              tokensData={props.tokensData}
              bags={props.bags}
              publicKey={props.publicKey}
              locked={props.locked}
            ></Dashboard>
          ) : undefined}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    tokensData: state.tokensData,
    bags: state.bags,
    bagsData: state.bagsData,
    tab: state.tab,
    registryUri: state.registryUri,
    nonce: state.nonce,
    publicKey: state.publicKey,
    locked: state.locked,
  };
};

export const App = connect(mapStateToProps, (dispatch, ownProps) => {
  return {
    goCreateToken: () => {
      dispatch({ type: 'CHANGE_TAB', payload: 'creatingToken' });
    },
    goUpdateTokenData: () => {
      dispatch({ type: 'CHANGE_TAB', payload: 'updatingTokenData' });
    },
    goUpdateBagData: () => {
      dispatch({ type: 'CHANGE_TAB', payload: 'updatingBagData' });
    },
    goSeeBagsData: () => {
      dispatch({ type: 'CHANGE_TAB', payload: 'seeingBagsData' });
    },
    goPurchase: () => {
      dispatch({ type: 'CHANGE_TAB', payload: 'purchasing' });
    },
    goDashboard: () => {
      dispatch({ type: 'CHANGE_TAB', payload: undefined });
    },
    goDeploy: () => {
      dispatch({ type: 'CHANGE_TAB', payload: 'deploying' });
    },
    goSend: () => {
      dispatch({ type: 'CHANGE_TAB', payload: 'sending' });
    },
    goTransactions: () => {
      dispatch({ type: 'CHANGE_TAB', payload: 'transactions' });
    },
    goSetLocked: () => {
      dispatch({ type: 'CHANGE_TAB', payload: 'locking' });
    },
    setLocked: (payload) => {
      console.log(payload);
      const newNonce = blockchainUtils.generateNonce();
      if (typeof dappyRChain === 'undefined') {
        console.warn('window.dappyRChain is undefined, cannot lock contract');
        return;
      }
      const p = {
        nonce: ownProps.nonce,
        newNonce: newNonce,
      };
      const ba = blockchainUtils.toByteArray(p);
      const term = setLockedTerm(payload.registryUri, p, 'SIGN');
      dappyRChain
        .transaction({
          term: term,
          signatures: { SIGN: blockchainUtils.uInt8ArrayToHex(ba) },
        })
        .then((a) => {
          console.log(a);
          dispatch({ type: 'UPDATE_NONCE', payload: newNonce });
        });
    },
    updateTokenData: (payload) => {
      console.log(payload);
      const newNonce = blockchainUtils.generateNonce();
      if (typeof dappyRChain === 'undefined') {
        console.warn('window.dappyRChain is undefined, cannot create token');
        return;
      }
      const p = {
        nonce: ownProps.nonce,
        newNonce: newNonce,
        n: payload.n,
        data: payload.data ? encodeURI(payload.data) : undefined,
      };
      const ba = blockchainUtils.toByteArray(p);

      const term = updateTokenDataTerm(payload.registryUri, p, 'SIGN');
      dappyRChain
        .transaction({
          term: term,
          signatures: { SIGN: blockchainUtils.uInt8ArrayToHex(ba) },
        })
        .then((a) => {
          console.log(a);
          dispatch({
            type: 'UPDATE_NONCE',
            payload: blockchainUtils.uInt8ArrayToHex(ba),
          });
        });
    },
    updateBagData: (payload) => {
      console.log(payload);
      const newNonce = blockchainUtils.generateNonce();
      if (typeof dappyRChain === 'undefined') {
        console.warn('window.dappyRChain is undefined, cannot create token');
        return;
      }
      const p = {
        nonce: getNonce(),
        newNonce: payload.newNonce,
        bagId: payload.bagId,
        data: payload.data ? encodeURI(payload.data) : undefined,
      };
      const ba = blockchainUtils.toByteArray(p);
      const term = updateBagDataTerm(payload.registryUri, p, 'SIGN');
      dappyRChain
        .transaction({
          term: term,
          signatures: { SIGN: blockchainUtils.uInt8ArrayToHex(ba) },
        })
        .then((a) => {
          console.log(a);
        });
    },
    sendTokens: (payload) => {
      console.log(payload);
      const bagNonce = blockchainUtils.generateNonce();
      const bagNonce2 = blockchainUtils.generateNonce();
      if (typeof dappyRChain === 'undefined') {
        console.warn('window.dappyRChain is undefined, cannot create token');
        return;
      }
      const p = {
        nonce: getNonce(),
        bagNonce: bagNonce,
        bagNonce2: bagNonce2,
        bagId: payload.bagId,
        quantity: payload.quantity,
        publicKey: payload.publicKey,
        data: undefined,
      };
      const ba = blockchainUtils.toByteArray(p);
      const term = sendTokensTerm(payload.registryUri, p, 'SIGN');

      dappyRChain
        .transaction({
          term: term,
          signatures: { SIGN: blockchainUtils.uInt8ArrayToHex(ba) },
        })
        .then((a) => {
          console.log(a);
        });
    },
    createToken: (payload) => {
      console.log('OWNPROPD', ownProps);
      console.log(payload);
      const newNonce = blockchainUtils.generateNonce();
      const bagNonce = blockchainUtils.generateNonce();
      if (typeof dappyRChain === 'undefined') {
        console.warn('window.dappyRChain is undefined, cannot create token');
        return;
      }
      const p = {
        nonce: ownProps.nonce,
        bagNonce: bagNonce,
        publicKey: payload.publicKey,
        data: payload.data ? encodeURI(payload.data) : undefined,
        n: payload.n,
        newNonce: newNonce,
        price: payload.price,
        quantity: payload.quantity,
      };

      const ba = blockchainUtils.toByteArray(p);
      const term = createTokensTerm(payload.registryUri, p, 'SIGN');

      dappyRChain
        .transaction({
          term: term,
          signatures: { SIGN: blockchainUtils.uInt8ArrayToHex(ba) },
        })
        .then((a) => {
          console.log(a);
          dispatch({ type: 'UPDATE_NONCE', payload: newNonce });
        });
    },
    purchaseToken: (payload) => {
      console.log(payload);
      const bagNonce = blockchainUtils.generateNonce();
      if (typeof dappyRChain === 'undefined') {
        console.warn('window.dappyRChain is undefined, cannot purchase token');
        return;
      }
      const term = purchaseTokensTerm(payload.registryUri, {
        publicKey: payload.publicKey,
        bagId: payload.bagId,
        quantity: payload.quantity,
        price: payload.price,
        bagNonce: bagNonce,
        data: payload.data,
      });

      dappyRChain
        .transaction({
          term: term,
          signatures: {},
        })
        .then((a) => {
          console.log(a);
        });
    },
    loadToken: (payload) => {
      console.log(payload);
      if (typeof dappyRChain === 'undefined') {
        console.warn('window.dappyRChain is undefined, cannot fetch data');
        return;
      }
      dispatch({ type: 'SET_LOADING', payload: true });
      loadToken(payload.registryUri)
        .then((all) => {
          dispatch({
            type: 'INIT_TOKEN',
            payload: all,
          });
        })
        .catch((err) => {
          console.error('Something went wrong when loading data');
          console.log(err);
        });
    },
    deploy: (payload) => {
      const newNonce = blockchainUtils.generateNonce();
      if (typeof dappyRChain === 'undefined') {
        console.warn('window.dappyRChain is undefined, cannot create token');
        return;
      }

      dappyRChain
        .transaction({
          term: mainTerm(newNonce, payload.publicKey),
          signatures: {},
        })
        .then((a) => {
          console.log(a);
          dispatch({ type: 'UPDATE_NONCE', payload: newNonce });
        });
    },
  };
})(AppComponent);
