// Form.js
import React from 'react';



const Form = ({ form, onInputChange, children }) => (
  <form>
    {/* Form fields here, e.g., name, machine selection, etc. */}
    {React.Children.map(children, child => {
      // Extend form inputs with value and onChange props
      if (["input", "select", "textarea"].includes(child.type)) {
        return React.cloneElement(child, {
          value: form[child.props.name],
          onChange: onInputChange
        });
      }
      return child;
    })}
  </form>
);
