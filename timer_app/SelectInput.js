// SelectInput.js
function SelectInput({ label, name, value, onChange, options }) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <select className="form-control" name={name} value={value} onChange={onChange}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default SelectInput;
  