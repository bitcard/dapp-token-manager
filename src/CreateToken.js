import React from 'react';

import { defaultData } from './UpdateTokenData';

export class CreateToken extends React.Component {
  state = {
    n: 'pizza',
    price: 1,
    quantity: 10,
    data: defaultData,
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h4 className="title is-4">Create token(s)</h4>
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
        <div className="field">
          <label className="label">Token ID / token type</label>
          <div className="control">
            <input
              className="input"
              onChange={(e) => this.setState({ n: e.target.value })}
              type="text"
              defaultValue="pizza"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Price (dusts)</label>
          <div className="control">
            <input
              className="input"
              onChange={(e) =>
                this.setState({ price: parseInt(e.target.value) })
              }
              type="number"
              placeholder="1"
              step={1}
              min={1}
              defaultValue={1}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Quantity</label>
          <div className="control">
            <input
              className="input"
              onChange={(e) =>
                this.setState({ quantity: parseInt(e.target.value) })
              }
              type="number"
              placeholder="10"
              step={1}
              min={0}
              defaultValue={10}
            />
          </div>
        </div>
        {typeof this.state.quantity === 'number' &&
        typeof this.state.price === 'number' ? (
          <div className="field">
            <label className="label">
              Bag total value (dusts) {this.state.price * this.state.quantity}
            </label>
          </div>
        ) : undefined}
        <div className="field">
          <button
            className="button is-light"
            type="button"
            onClick={(e) => {
              this.props.createToken({
                registryUri: this.props.registryUri,
                n: this.state.n,
                data: this.state.data || undefined,
                price: this.state.price,
                quantity: this.state.quantity,
              });
            }}
          >
            Create token(s)
          </button>
        </div>
      </div>
    );
  }
}
