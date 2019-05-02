/* eslint-disable no-unused-vars */
import React from 'react';

const displayedStyle = {
  display: 'inline-block',
  backgroundColor: '#f2f2f2',
  padding: '0 0.3rem 0 0.3rem'
};

const hiddenStyle = {
  display: 'none',
  backgroundColor: '#f2f2f2',
  padding: '0 0.3rem 0 0.3rem'
};

class Reveal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayed: true };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(eventObject) {
    const displayed = eventObject.target.name !== 'hide';
    this.setState({ displayed });
  }

  render() {
    const { displayed } = this.state;
    const divStyle = displayed ? displayedStyle : hiddenStyle;

    return (
      <>
        <div {...this.props.attributes} style={divStyle}>
          {this.props.children}
        </div>
        {displayed ? (
          <button name='hide' onClick={this.handleOnClick}>
            Hide
          </button>
        ) : (
          <button name='reveal' onClick={this.handleOnClick}>
            Reveal
          </button>
        )}
      </>
    );
  }
}

export default Reveal;
