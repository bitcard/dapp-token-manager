import React from 'react';

export class Top extends React.Component {
  render() {
    if (!this.registryUri && this.props.registryUri) {
      this.registryUri = this.props.registryUri;
    }
    return (
      <div className="form horizontal form-horizontal">
        <div className="field">
          <div className="control">
            <input
              onChange={(e) => (this.registryUri = e.target.value)}
              className="input registry-uri-input"
              type="text"
              placeholder="Registry URI"
              defaultValue={this.props.registryUri}
            />
            {this.props.loading ? (
              <button disabled={true} type="button" className="button is-light">
                Loading
              </button>
            ) : (
              <button
                onClick={() => {
                  this.props.loadToken({
                    registryUri: this.registryUri,
                  });
                }}
                type="button"
                className="button is-light"
              >
                {this.props.registryUri ? 'Reload' : 'Load'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
