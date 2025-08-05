import React from 'react';

interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
                                                   id,
                                                   label,
                                                   type = 'text',
                                                   value,
                                                   onChange,
                                                   placeholder,
                                                   required = false,
                                                   error,
                                               }) => {
    return (
        <div className="w-full mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`
          w-full px-4 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2
          ${error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'}
        `}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
