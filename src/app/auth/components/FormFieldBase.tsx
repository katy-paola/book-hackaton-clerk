interface formFieldBaseProps {
  label: string
  id: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormFieldBase({ ...props }: formFieldBaseProps) {
  const { label, id, name, type, value, placeholder, onChange } = props;
  return (
    <label htmlFor={id}>
      {label}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
}
