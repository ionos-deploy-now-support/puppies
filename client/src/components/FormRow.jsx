const FormRow = ({ type, name, labelText, defaultValue, required, onChange }) => {
  if (required) {
    return (
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          className="form-input"
          defaultValue={defaultValue || ''}
          required
          onChange={onChange}
        />
      </div>
    );
  } else {
    return (
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          className="form-input"
          defaultValue={defaultValue || ''}
        />
      </div>
    );
  }
};
export default FormRow;
