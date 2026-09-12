import "./InputField.css";

const InputField = ({
  id,
  label,
  isError,
  errorMsg,
  imgElement,
  register,
  name,
  ...props
}) => {
  const errorId = `${id}-error`;

  return (
    <div className="input-field-wrapper">
      <label htmlFor={id} className="input-label">
        {label}
      </label>

      <div className="input-container">
        <span className="input-icon" aria-hidden="true">
          {imgElement}
        </span>

        <input
          {...register(name)}
          id={id}
          name={name}
          className={`input-element ${isError ? "input-error" : ""}`}
          aria-invalid={isError}
          aria-describedby={errorMsg ? errorId : undefined}
          {...props}
        />

        <p
          id={errorId}
          className="input-error-message"
          role="alert"
          aria-live="polite"
        >
          {isError && errorMsg}
        </p>
      </div>
    </div>
  );
};

export default InputField;
