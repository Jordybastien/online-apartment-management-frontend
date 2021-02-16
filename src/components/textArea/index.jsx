import React from 'react';

const TextArea = ({
  type,
  placeholder,
  value,
  name,
  onChange,
  errorMessage,
}) => {
  return (
    <div>
      <textarea
        id="w3review"
        name={name}
        rows="4"
        cols="50"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className="form-control"
      />
      <div className="error-msg-container">
        <span className="error-msg-label">{errorMessage}</span>
      </div>
    </div>
  );
};

export default TextArea;
