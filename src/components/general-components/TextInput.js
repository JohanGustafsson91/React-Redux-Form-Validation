import React, { PropTypes } from 'react';

const TextInput = React.createClass({
  render () {
    return (
      <input
        type={this.props.type}
        className={this.props.className}
        style={this.props.style}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur} />
    );
  }
});

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  keyName: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string
};

export default TextInput;
