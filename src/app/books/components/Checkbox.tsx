import Check from "@/components/icons/Check";

interface checkboxProps {
  id: string;
  name: string;
  value: string;
  label: string;
}

export default function Checkbox({ ...props }: checkboxProps) {
  const { id, name, value, label } = props;
  return (
    <label className="item-categories" htmlFor={id}>
      <input
        className="input-checkbox"
        id={id}
        type="checkbox"
        name={name}
        value={value}
      />
      <span className="check-icon-container">
        <Check />
      </span>
      {label}
    </label>
  );
}
