import React, { useState } from 'react';
/*import './App.css';*/

function App() {
  const initialFormState = {
    name: '',
    machine: '',
    date: '',
    workOrder: '',
    serialNumber: '',
    partNumber: '',
    quantity: '',
    notes: '',
    setupTime: '00:00:00',
    machiningTime: '00:00:00'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSetupActive, setIsSetupActive] = useState(false);
  const [setupStartTime, setSetupStartTime] = useState(null);
  const [isMachiningActive, setIsMachiningActive] = useState(false);
  const [machiningStartTime, setMachiningStartTime] = useState(null);
  const [isMachiningPaused, setIsMachiningPaused] = useState(false);
  const [machiningPauseTime, setMachiningPauseTime] = useState(null);
  const [lastSubmission, setLastSubmission] = useState(null);
  

/*
  useEffect(() => {
    let interval;
    if (isSetupActive) {
      interval = setInterval(() => {
        const elapsed = setupStartTime ? Math.floor((Date.now() - setupStartTime) / 1000) : 0;
        const formattedTime = new Date(elapsed * 1000).toISOString().substr(11, 8);
        setFormData(formData => ({ ...formData, setupTime: formattedTime }));
      }, 1000);
    } else if (isMachiningActive) {
      interval = setInterval(() => {
        const pausedDuration = machiningPauseTime ? Date.now() - machiningPauseTime : 0;
        const elapsed = machiningStartTime ? Math.floor(((Date.now() - machiningStartTime) - pausedDuration) / 1000) : 0;
        const formattedTime = new Date(elapsed * 1000).toISOString().substr(11, 8);
        setFormData(formData => ({ ...formData, machiningTime: formattedTime }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSetupActive, isMachiningActive, isMachiningPaused, setupStartTime, machiningStartTime, machiningPauseTime]);
*/
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'quantity' && value === '' ? null : value;
    setFormData({ ...formData, [name]: updatedValue });
  };
  

  const startSetupTimer = () => {
    setIsSetupActive(true);
    setSetupStartTime(Date.now());
  };

  const startMachiningTimer = () => {
    setIsSetupActive(false);
    setIsMachiningActive(true);
    setMachiningStartTime(Date.now());
  };

  const pauseMachiningTimer = () => {
    if (!isMachiningPaused) {
      setMachiningPauseTime(Date.now());
    } else {
      setMachiningStartTime(prevStartTime => prevStartTime + (Date.now() - machiningPauseTime));
      setMachiningPauseTime(null);
    }
    setIsMachiningPaused(!isMachiningPaused);
  };

  const stopMachiningTimer = () => {
    setIsMachiningActive(false);
    setMachiningPauseTime(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Form submitted successfully!');
    setLastSubmission(formData);  // Update UI with submitted data
    setFormData(initialFormState);  // Reset form data after submission
  };

  /*
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submissionData = { ...formData };

    // Convert quantity to null if it's an empty string
    if (submissionData.quantity === '') {
      submissionData.quantity = null;
    } else {
      submissionData.quantity = parseInt(submissionData.quantity, 10);
    }
    
    try {
      const response = await fetch('http://localhost:8000/machinelog/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert('Form submitted successfully!');
        console.log('Submission result:', result);
        setLastSubmission(submissionData);  // Update UI with submitted data
        setFormData(initialFormState);  // Reset form data after submission
      } else {
        // Handle HTTP error response
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('Submission failed. Please check console for details.');
    }
  };*/

  return (
    <div className="App">
      <header className="App-header">
        <h2>Machinist Daily Log</h2>
        <form onSubmit={handleSubmit}>
          <select name="name" value={formData.name} onChange={handleInputChange} >
            <option value="">Name</option>
            <option value="anthony">Anthony</option>
            <option value="bao">Bao</option>
            <option value="brennon">Brennon</option>
            <option value="don">Don</option>
            <option value="edgar">Edgar</option>
            <option value="felipe">Felipe</option>
            <option value="jesus">Jesus</option>
            <option value="larry">Larry</option>
            <option value="luke">Luke</option>
            <option value="michael">Michael</option>
            <option value="randy">Randy</option>
            <option value="rick">Rick</option>
            <option value="tai">Tai</option>
            <option value="tyler">Tyler</option>
          </select>
          <select name="machine" value={formData.machine} onChange={handleInputChange}>
            <option value="">Select a Machine</option>
            <option value="410h">410H</option>
            <option value="dahlil mill">Dahlil Mill</option>
            <option value="dahlil vertical access">Dahlil Vertical Access</option>
            <option value="haas small">Haas Small</option>
            <option value="hl-4">HL-4</option>
            <option value="lathe">Lathe</option>
            <option value="lehman">Lehman</option>
            <option value="m5">M5</option>
            <option value="mazak 3 axis">Mazak 3 Axis</option>
            <option value="mazak 5 axis">Mazak 5 Axis</option>
            <option value="haas st-40l">Haas ST-40L</option>
            <option value="polish">Polish</option>
            <option value="rotor">Rotor</option>
            <option value="sc-20">SC-20</option>
            <option value="sc-25">SC-25</option>
            <option value="sc-32">SC-32</option>
            <option value="slant 60">Slant 60</option>
            <option value="summit manual">Summit Manual</option>
          </select>
          {/* Add more inputs for each form field as needed */}
          <input type="text" placeholder="Work Order" name="workOrder" value={formData.workOrder} onChange={handleInputChange} />
          <input type="text" placeholder="Serial Number" name="serialNumber" value={formData.serialNumber} onChange={handleInputChange} />
          <input type="text" placeholder="Part Number" name="partNumber" value={formData.partNumber} onChange={handleInputChange} />
          {formData.partNumber && <input type="number" placeholder="Quantity of Part" name="quantity" value={formData.quantity} onChange={handleInputChange} />}
          <textarea placeholder="Notes" name="notes" value={formData.notes} onChange={handleInputChange}></textarea>
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
          <input type="text" placeholder="Setup Time" name="setupTime" value={formData.setupTime} onChange={handleInputChange}/>
          <input type="text" placeholder="Machining Time" name="machiningTime" value={formData.machiningTime} onChange={handleInputChange}/>
          <button type="button" onClick={startSetupTimer}>Start Setup Timer</button>
          <button type="button" onClick={startMachiningTimer} disabled={!setupStartTime || isMachiningActive}>Start Machining Timer</button>
          <button type="button" onClick={pauseMachiningTimer} disabled={!isMachiningActive}>Pause/Resume Machining Timer</button>
          <button type="button" onClick={stopMachiningTimer} disabled={!isMachiningActive}>Stop Machining Timer</button>
          <button type="submit">Submit Form</button>
        </form>
        <div>Setup Time: {formData.setupTime}</div>
        <div>Machining Time: {formData.machiningTime}</div>
      </header>
      {lastSubmission && (
        <div className="submission-result">
          <h3>Last Submission</h3>
          <pre>{JSON.stringify(lastSubmission, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
