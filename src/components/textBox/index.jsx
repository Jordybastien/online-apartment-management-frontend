import React from 'react';

const TextBox = ({
  type,
  placeholder,
  value,
  name,
  onChange,
  errorMessage,
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="form-control"
      />
      <div className="error-msg-container">
        <span className="error-msg-label">{errorMessage}</span>
      </div>
    </div>
  );
};

export default TextBox;
