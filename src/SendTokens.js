import React from 'react';

export class SendTokens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bagId: undefined,
      publicKey: '',
    };
  }

  render() {
    return (
      <div>
        <h4 className="title is-4">Send token(s)</h4>
        <div className="field">
          <label className="label">From (bag you own)</label>
          <div className="control">
            <div class="select">
              <select
                onChange={(e) => {
                  if (e.target.value === 'Select a bag') {
                    this.setState({ bagId: undefined });
                  } else {
                    this.setState({
                      bagId: e.target.value,
                    });
                  }
                }}
              >
                <option value={undefined}>Select a bag</option>
                {Object.keys(this.props.bags).map((k) => {
                  return (
                    <option
                      disabled={this.props.bags[k] === 0}
                      key={k}
                      value={k}
                    >
                      {k}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">To (public key)</label>
          <div className="control">
            <input
              className="input"
              type="text"
              onInput={(e) => {
                this.setState({ publicKey: e.target.value });
              }}
            ></input>
          </div>
        </div>
        <div className="field">
          <label className="label">Amount / Quantity of tokens to send</label>
          {this.state.bagId ? (
            <p className="text-warning">
              The selected bag contains{' '}
              {this.props.bags[this.state.bagId].quantity} token(s)
            </p>
          ) : undefined}
          <div className="control">
            <input
              type="number"
              className="input"
              min={0}
              onInput={(e) => {
                this.setState({ quantity: parseInt(e.target.value) });
              }}
            ></input>
          </div>
        </div>
        <div className="field">
          <button
            className="button is-light"
            type="button"
            disabled={
              typeof this.state.bagId !== 'string' ||
              typeof this.state.quantity !== 'number'
            }
            onClick={(e) => {
              this.props.sendTokens({
                publicKey: this.props.publicKey,
                registryUri: this.props.registryUri,
                publicKey: this.state.publicKey,
                nonce: this.props.bags[this.state.bagId].nonce,
                bagId: this.state.bagId,
                quantity: this.state.quantity,
              });
            }}
          >
            Send token(s)
          </button>
        </div>
      </div>
    );
  }
}
