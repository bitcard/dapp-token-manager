import React from 'react';

export class Transactions extends React.Component {
  state = {
    n: 0,
  };

  reload = (e) => {
    e.preventDefault();
    this.setState({
      n: this.state.n + 1,
    });
  };

  render() {
    if (typeof dappyStore === 'undefined') {
      console.warn('window.dappyStore is undefined, cannot lock contract');
      return <div></div>;
    }

    const transactions = dappyStore.getState().transactions;

    return (
      <div>
        <h4 className="title is-4">
          Transactions{' '}
          <button className="button is-light is-small" onClick={this.reload}>
            Reload
          </button>
        </h4>
        <p>
          If you deployed a new rchain-tokenERC-1155 contract, reload this
          section until see the registry URI displayed.
        </p>
        <br />
        <ul>
          {Object.keys(transactions).map((k) => {
            let val;
            console.log(transactions[k]);
            if (typeof transactions[k].value === 'string') {
              val = transactions[k].value;
            } else if (transactions[k].value.registryUri) {
              val = `registry URI : ${transactions[k].value.registryUri.replace(
                'rho:id:',
                ''
              )}`;
            } else if (transactions[k].value.status) {
              val = `status : ${transactions[k].value.status}`;
            }

            return (
              <li key={k}>
                {k}: {val}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
