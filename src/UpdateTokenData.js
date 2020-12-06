import React from 'react';

export const defaultData = `{ "name": "pizza regina" }`;

export class UpdateTokenData extends React.Component {
  constructor(props) {
    super(props);
    this.textarea = React.createRef();
    this.state = {
      token: undefined,
      data: defaultData,
    };
  }

  render() {
    return (
      <div>
        <h4 className="title is-4">Update token data</h4>
        <div className="field">
          <label className="label">Token to update</label>
          <div className="control">
            <div class="select">
              <select
                onChange={(e) => {
                  if (e.target.value === 'Select a token') {
                    this.textarea.current.value = '';
                    this.setState({ token: undefined });
                  } else {
                    console.log(this.textarea.current);
                    this.textarea.current.value = this.props.tokensData[
                      e.target.value
                    ];
                    this.setState({
                      token: e.target.value,
                      data: this.props.tokensData[e.target.value],
                    });
                  }
                }}
              >
                <option value={undefined}>Select a token</option>
                {Object.keys(this.props.tokensData).map((k) => {
                  return (
                    <option
                      disabled={this.props.tokensData[k] === 0}
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
          <label className="label">Data</label>
          <p className="note">
            <b>Note: </b>Data will be stored as a string, and secured with{' '}
            <b>encodeURI()</b>
          </p>
          <div className="control">
            <textarea
              className="textarea"
              ref={this.textarea}
              onChange={(e) => {
                this.setState({ data: e.target.value });
              }}
              defaultValue={defaultData}
            ></textarea>
          </div>
        </div>
        <div className="field">
          <button
            className="button is-light"
            type="button"
            disabled={typeof this.state.token !== 'string'}
            onClick={(e) => {
              this.props.updateTokenData({
                registryUri: this.props.registryUri,
                n: this.state.token,
                data: this.state.data,
              });
            }}
          >
            Update data
          </button>
        </div>
      </div>
    );
  }
}
