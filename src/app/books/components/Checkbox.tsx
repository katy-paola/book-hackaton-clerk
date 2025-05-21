import Check from '@/components/icons/Check';

interface checkboxProps {
  id: string;
  name?: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

export default function Checkbox({ ...props }: checkboxProps) {
  const { id, name, value, label, checked, onChange } = props;
  return (
    <label className="item-categories" htmlFor={id}>
      <input
        className="input-checkbox"
        id={id}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="check-icon-container">
        <Check />
      </span>
      {label}
    </label>
  );
}
