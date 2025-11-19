import React from "react";
import PropTypes from "prop-types";

const Input = ({ label, value, onChange, placeholder, type = "text", disabled = false }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`border p-2 rounded ${disabled ? "bg-gray-200" : "bg-white"}`}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
