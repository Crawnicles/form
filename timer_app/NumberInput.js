// NumberInput.js
function NumberInput({ label, name, value, onChange, placeholder }) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input
          type="number"
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
  
  export default NumberInput;
  