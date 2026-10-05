function FormField({ label, error, children }) {
  return (
    <label className="form-field">
      <span className="form-field-label">{label}</span>
      {children}
      {error && <span className="form-field-error">{error}</span>}
    </label>
  )
}

export default FormField
