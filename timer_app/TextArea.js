// TextArea.js
function TextArea({ label, name, value, onChange, placeholder }) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <textarea
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
  
  export default TextArea;
  