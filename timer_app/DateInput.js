// DateInput.js
function DateInput({ label, name, value, onChange }) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input
          type="date"
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
  
  export default DateInput;
  