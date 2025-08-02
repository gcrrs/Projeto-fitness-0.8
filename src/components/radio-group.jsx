import React from 'react';

export const RadioGroup = ({ children, value, onValueChange, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`} onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </div>
  );
};

export const RadioGroupItem = ({ id, value, children }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name="radio-group"
        value={value}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
        {children}
      </label>
    </div>
  );
};