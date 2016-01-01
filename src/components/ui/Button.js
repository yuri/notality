import React from 'react';

const Button = (props) => {
  const {
    children,
    className = '',
    style = {
    },
    type = 'button',
    onClick,
  } = props;

  return (
    <button
      type={ type }
      className={ `btn p0 h5 px1 ${ className }` }
      style={{ ...styles.base, ...style }}
      onClick={ onClick }>
      { children }
    </button>
  );
};

const styles = {
  base: {},
};

export default Button;
