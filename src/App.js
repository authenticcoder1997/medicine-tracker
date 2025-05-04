import React, { useState } from 'react';
import './App.css';

function App() {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedication(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMedication.name && newMedication.dosage) {
      setMedications([...medications, { ...newMedication, id: Date.now() }]);
      setNewMedication({
        name: '',
        dosage: '',
        frequency: '',
        time: '',
        notes: ''
      });
    }
  };

  const deleteMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Medicine Tracker</h1>
      </header>
      
      <main className="App-main">
        <section className="add-medication">
          <h2>Add New Medication</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Medication Name:</label>
              <input
                type="text"
                name="name"
                value={newMedication.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Dosage:</label>
              <input
                type="text"
                name="dosage"
                value={newMedication.dosage}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Frequency:</label>
              <select
                name="frequency"
                value={newMedication.frequency}
                onChange={handleInputChange}
                required
              >
                <option value="">Select frequency</option>
                <option value="Once daily">Once daily</option>
                <option value="Twice daily">Twice daily</option>
                <option value="Three times daily">Three times daily</option>
                <option value="As needed">As needed</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Time:</label>
              <input
                type="time"
                name="time"
                value={newMedication.time}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Notes:</label>
              <textarea
                name="notes"
                value={newMedication.notes}
                onChange={handleInputChange}
              />
            </div>
            
            <button type="submit">Add Medication</button>
          </form>
        </section>

        <section className="medication-list">
          <h2>Your Medications</h2>
          {medications.length === 0 ? (
            <p>No medications added yet.</p>
          ) : (
            <div className="medications-grid">
              {medications.map(medication => (
                <div key={medication.id} className="medication-card">
                  <h3>{medication.name}</h3>
                  <p><strong>Dosage:</strong> {medication.dosage}</p>
                  <p><strong>Frequency:</strong> {medication.frequency}</p>
                  <p><strong>Time:</strong> {medication.time}</p>
                  {medication.notes && <p><strong>Notes:</strong> {medication.notes}</p>}
                  <button 
                    onClick={() => deleteMedication(medication.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
