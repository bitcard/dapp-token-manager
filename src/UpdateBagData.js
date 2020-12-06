import React from 'react';

export const defaultData = `{ "color": "blue" }`;

export class UpdateBagData extends React.Component {
  constructor(props) {
    super(props);
    this.textarea = React.createRef();
    this.state = {
      bagId: undefined,
      data: defaultData,
    };
  }

  render() {
    return (
      <div>
        <h4 className="title is-4">Update bag data</h4>
        <div className="field">
          <label className="label">Token ownership / bag to update</label>
          <div className="control">
            <div class="select">
              <select
                onChange={(e) => {
                  if (e.target.value === 'Select a bag') {
                    this.textarea.current.value = '';
                    this.setState({ bagId: undefined });
                  } else {
                    if (this.props.bagsData[e.target.value]) {
                      this.textarea.current.value = this.props.bagsData[
                        e.target.value
                      ];
                    } else {
                      this.textarea.current.value = '';
                    }
                    this.setState({
                      bagId: e.target.value,
                      data: this.props.bagsData[e.target.value] || '',
                    });
                  }
                }}
              >
                <option value={undefined}>Select a bag</option>
                {Object.keys(this.props.bags).map((k) => {
                  return (
                    <option
                      disabled={this.props.bagsData[k] === 0}
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
              onInput={(e) => {
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
            disabled={typeof this.state.bagId !== 'string'}
            onClick={(e) => {
              this.props.updateBagData({
                registryUri: this.props.registryUri,
                nonce: this.props.bags[this.state.bagId].nonce,
                bagId: this.state.bagId,
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
