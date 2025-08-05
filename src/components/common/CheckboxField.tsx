interface CheckboxFieldProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ id, label, checked, onChange, required }) => (
    <div className="flex items-center space-x-2">
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            required={required}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor={id} className="text-sm text-gray-700">{label}</label>
    </div>
);

export default CheckboxField;
