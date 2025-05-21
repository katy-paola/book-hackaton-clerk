interface RadioButtonProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export default function RadioButton({ label, checked, onChange }: RadioButtonProps) {
  return (
    <label className="item-access-type">
      <input 
        className="input-radio" 
        type="radio" 
        name="access-type" 
        checked={checked}
        onChange={onChange}
      />
      <span className="input-radio-icon"></span>
      {label}
    </label>
  );
}
