import React from 'react';

const defaultData = '';

export class PurchaseToken extends React.Component {
  state = {
    bagId: undefined,
    quantity: 0,
    data: '',
  };

  render() {
    return (
      <div>
        <h4 className="title is-4">Purchase token(s)</h4>
        <div className="field">
          <label className="label">Token ownership / bag to buy from</label>
          <div className="control">
            <div class="select">
              <select
                onChange={(e) => {
                  if (e.target.value === 'Select a bag') {
                    this.setState({ bagId: undefined });
                  } else {
                    this.setState({ bagId: e.target.value });
                  }
                }}
              >
                <option value={undefined}>Select a bag</option>
                {Object.keys(this.props.bags)
                  .filter((k) => typeof this.props.bags[k].price === 'number')
                  .map((k) => {
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
          <label className="label">
            Quantity
            {typeof this.state.bagId === 'string'
              ? `(available: ${this.props.bags[this.state.bagId].quantity})`
              : ''}
          </label>
          <div className="control">
            <input
              className="input"
              onChange={(e) =>
                this.setState({ quantity: parseInt(e.target.value) })
              }
              type="number"
              placeholder="1"
              step={1}
              min={0}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Data (token data)</label>
          <div className="control">
            <textarea
              className="textarea"
              onChange={(e) => {
                this.setState({ data: e.target.value });
              }}
              defaultValue={defaultData}
            ></textarea>
          </div>
        </div>
        {typeof this.state.bagId === 'string' ? (
          <div className="field">
            <label className="label">
              Price (total){' '}
              {this.props.bags[this.state.bagId].price * this.state.quantity}
            </label>
          </div>
        ) : undefined}
        <div className="field">
          <button
            disabled={
              typeof this.state.bagId !== 'string' || !this.state.quantity
            }
            className="button is-light"
            type="button"
            onClick={(e) => {
              this.props.purchaseToken({
                publicKey: this.props.publicKey,
                registryUri: this.props.registryUri,
                bagId: this.state.bagId,
                data: this.state.data,
                price: this.props.bags[this.state.bagId].price,
                quantity: this.state.quantity,
              });
            }}
          >
            Purchase token(s)
          </button>
        </div>
      </div>
    );
  }
}
