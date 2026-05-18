import "./FormField.css";

const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  ...rest
}) => {
  const hasError = !!error;

  return (
    <div className={`form-field ${hasError ? "form-field--error" : ""}`}>
      {label && <label className="form-field__label" htmlFor={name}>{label}</label>}
      {type === "textarea" ? (
        <textarea
          className="form-field__input"
          id={name}
          placeholder={placeholder}
          {...register(name)}
          {...rest}
        />
      ) : (
        <input
          className="form-field__input"
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          {...rest}
        />
      )}
      {hasError && <span className="form-field__error">{error.message}</span>}
    </div>
  );
};

export default FormField;
