import React from "react";

const InputField = (props) => {
  const { type, name, placeholder, className, value, id,onChange ,onBlur} = props;
  return (
    <div>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`form-control ${className}`}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputField;
