interface radioButtonProps {
  label: string;
}

export default function RadioButton({ ...props }: radioButtonProps) {
  const { label } = props;
  return (
    <label className="item-access-type">
      <input className="input-radio" type="radio" name="access-type" />
      <span className="input-radio-icon"></span>
      {label}
    </label>
  );
}
