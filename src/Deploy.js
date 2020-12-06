import React from 'react';

export class Deploy extends React.Component {
  render() {
    return (
      <div>
        <h4 className="title is-4">Deploy new rchain-token contract</h4>
        <p>
          After deployment, go in the <u>Transactions</u> section and wait for
          the registry URI to pop.
          <br />
          <br />
        </p>
        <div className="field">
          <button
            className="button is-medium is-primary"
            type="button"
            onClick={(e) => {
              this.props.deploy({ publicKey: this.props.publicKey });
            }}
          >
            Deploy
          </button>
        </div>
      </div>
    );
  }
}
