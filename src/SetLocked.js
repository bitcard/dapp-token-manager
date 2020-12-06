import React from 'react';

export class SetLocked extends React.Component {
  render() {
    return (
      <div>
        <h4 className="title is-4">Lock contract</h4>
        <article className="message is-danger">
          <div className="message-body">
            If you lock the contract, the tokens currently existing will be the
            only ones to ever exist for this contract. The only available
            operations available will be :
            <ul>
              <li>- Send tokens (as the owner of a bag).</li>
              <li>
                - Defining a price for tokens in a bag (as the owner of a bag).
              </li>
              <li>
                - Update data associated to a bag (as the owner of a bag).
              </li>
              <li>- Buy a set of tokens from a bag.</li>
            </ul>
          </div>
        </article>
        <div className="field">
          <button
            className="button is-danger"
            type="button"
            onClick={(e) => {
              this.props.setLocked({
                registryUri: this.props.registryUri,
              });
            }}
          >
            Lock contract
          </button>
        </div>
      </div>
    );
  }
}
