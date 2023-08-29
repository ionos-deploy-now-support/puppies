const FormRow = ({ type, name, labelText, defaultValue, required }) => {
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
