const FormRowRadio = ({
  name,
  labelText,
  defaultValue = 'checked',
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type="radio"
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      ></input>
    </div>
  );
};
export default FormRowRadio;
