import React, { Fragment } from 'react';

export class BagsData extends React.Component {
  render() {
    return (
      <div>
        <b>Bags data</b>
        <div className="tokens-data">
          {Object.keys(this.props.bagsData).map((k) => {
            return (
              <Fragment key={k}>
                <span>
                  {k} (bag ID) :{' '}
                  {this.props.bagsData[k].length > 200
                    ? `${this.props.bagsData[k].substr(0, 200)}...`
                    : this.props.bagsData[k]}
                </span>
                <hr />
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}
