import React, { Fragment } from 'react';

export class Dashboard extends React.Component {
  render() {
    return (
      <div>
        {this.props.locked === true ? (
          <Fragment>
            <h4 className="title is-5 locked-t">
              This contract is{' '}
              <span className="tag is-success is-medium">locked</span>
            </h4>
            <p className="locked-p">
              The owner cannot add tokens or change existing tokens data
              anymore.
              <br />
              <br />
            </p>
          </Fragment>
        ) : undefined}
        {this.props.locked === false ? (
          <Fragment>
            <h4 className="title is-5 locked-t">
              This contract is{' '}
              <span className="tag is-danger is-medium">not locked</span>
            </h4>
            <p className="locked-p">
              The owner <b>{this.props.publicKey}</b> can still add tokens, and
              change existing tokens data.
              <br />
              <br />
            </p>
          </Fragment>
        ) : undefined}
        <b>Tokens data</b>
        <div className="tokens-data">
          {Object.keys(this.props.tokensData).map((k) => {
            return (
              <Fragment key={k}>
                <span>
                  {k} (token ID):{' '}
                  {this.props.tokensData[k].length > 200
                    ? `${this.props.tokensData[k].substr(0, 200)}...`
                    : this.props.tokensData[k]}
                </span>
                <hr />
              </Fragment>
            );
          })}
        </div>
        <b>Token ownerships / bags</b>
        <div className="bags">
          {Object.keys(this.props.bags).map((k) => {
            return (
              <Fragment key={k}>
                <div className="bag">
                  <span>token ID : {this.props.bags[k].n}</span>
                  <span>bag ID : {k}</span>
                  <span>quantity : {this.props.bags[k].quantity}</span>
                  <span>public key : {this.props.bags[k].publicKey}</span>
                  <span>price (per token) : {this.props.bags[k].price}</span>
                </div>
                <hr />
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}
