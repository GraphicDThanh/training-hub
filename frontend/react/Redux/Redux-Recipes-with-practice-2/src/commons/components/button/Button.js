import React from 'react';
import ButtonStyled from '../styles/ButtonStyled.js';
import PropTypes from 'prop-types';

const Button = (props) => {
  Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };

  Button.defaultProps = {
    bg: '#ccc',
    text: 'Testing Button',
    size: 'default',
    onClick: () => {}
  };

  return (
    <ButtonStyled
      bg={props.bg}
      primary={props.primary}
      secondary={props.secondary}
      size={props.size}
      textColor={props.textColor}
      type={props.type}

      onClick={props.onClick}
    >
      {props.text}
    </ButtonStyled>
  );
}

export default Button;