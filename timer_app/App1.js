// App.js
import React, { useState } from 'react';
import Timer from './Timer';
import Form from './Form';
// Import CSS as needed

function App() {
  const [form, setForm] = useState({
    // Initial form state
  });
  const [setupTimerActive, setSetupTimerActive] = useState(false);
  const [machiningTimerActive, setMachiningTimerActive] = useState(false);
  const [machiningTimerPaused, setMachiningTimerPaused] = useState(false);
  const [setupTime, setSetupTime] = useState('');
  const [machiningTime, setMachiningTime] = useState('');

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startSetupTimer = () => {
    setSetupTimerActive(true);
    setMachiningTimerActive(false); // Ensure machining timer is not running
  };

  const startMachiningTimer = () => {
    setSetupTimerActive(false); // Stop setup timer
    setMachiningTimerActive(true);
    setMachiningTimerPaused(false);
  };

  const pauseMachiningTimer = () => {
    setMachiningTimerPaused(!machiningTimerPaused);
  };

  const stopMachiningTimer = () => {
    setMachiningTimerActive(false);
    setMachiningTimerPaused(false); // Reset pause state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would assemble your form data, including the times, to send to your backend
    const dataToSend = { ...form, setupTime, machiningTime };
    console.log("Submitting:", dataToSend);
    // Example POST request (replace with your actual API endpoint)
    /*
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        // Handle response and possibly reset form/state as needed
        alert('Form submitted successfully');
        setForm(initialFormState); // Reset form
      } else {
        // Handle errors
        alert('Submission failed');
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
    */
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Work Order Form</h2>
        <Form form={form} onInputChange={handleInputChange}>
          {/* Insert form inputs here as children */}
          <Timer isActive={setupTimerActive} isPaused={false} onDuration={(duration) => setSetupTime(duration)} />
          <Timer isActive={machiningTimerActive} isPaused={machiningTimerPaused} onDuration={(duration) => setMachiningTime(duration)} />
          <button type="button" onClick={startSetupTimer}>Start Setup Timer</button>
          <button type="button" onClick={startMachiningTimer} disabled={!setupTimerActive}>Start Machining Timer</button>
          <button type="button" onClick={pauseMachiningTimer} disabled={!machiningTimerActive}>Pause/Resume Machining Timer</button>
          <button type="button" onClick={stopMachiningTimer} disabled={!machiningTimerActive}>Stop Machining Timer</button>
          <button type="submit" onClick={handleSubmit}>Submit Form</button>
        </Form>
      </header>
    </div>
  );
}

export default App;
