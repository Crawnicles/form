import React from 'react';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
// import other components

const Form = ({ formData, onInputChange }) => {
  const machineOptions = [
    { value: '', label: 'Select a Machine' },
    { value: 'lathe', label: 'Lathe' },
    { value: 'milling', label: 'Milling Machine' },
    // other options...
  ];

  return (
    <form>
      <TextInput
        label="Name"
        name="name"
        value={formData.name}
        onChange={onInputChange}
        placeholder="Enter Name"
      />
      <SelectInput
        label="Machine"
        name="machine"
        value={formData.machine}
        onChange={onInputChange}
        options={machineOptions}
      />
      {/* Use other field components similarly */}
    </form>
  );
};

export default Form;
