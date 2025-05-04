import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// Abbott Medicines Database
const medicineDatabase = [
  {
    id: 1,
    name: 'Abbott Paracetamol',
    company: 'Abbott Laboratories',
    category: 'Pain Relief',
    description: 'For fever and mild pain relief',
    recommendedFor: ['Fever', 'Headache', 'Body Pain'],
    sideEffects: ['Rare: Skin rash'],
    dosage: '500mg',
    price: 15.50,
    abbottExclusive: true,
    image: 'https://www.abbott.co.in/content/dam/abbott/products/IN/Paracetamol.png' // sample/representative
  },
  {
    id: 2,
    name: 'Abbott Amoxicillin',
    company: 'Abbott Laboratories',
    category: 'Antibiotic',
    description: 'For bacterial infections',
    recommendedFor: ['Bacterial Infections', 'Pneumonia', 'Sinusitis'],
    sideEffects: ['Common: Diarrhea', 'Rare: Allergic reactions'],
    dosage: '500mg',
    price: 45.75,
    abbottExclusive: true,
    image: 'https://www.abbott.co.in/content/dam/abbott/products/IN/Amoxycillin.png' // sample/representative
  },
  {
    id: 3,
    name: 'Abbott Vitamin D3',
    company: 'Abbott Laboratories',
    category: 'Vitamin Supplement',
    description: 'For bone health and immune support',
    recommendedFor: ['Vitamin D Deficiency', 'Bone Health', 'Immune Support'],
    sideEffects: ['Rare: Hypercalcemia'],
    dosage: '1000 IU',
    price: 25.25,
    abbottExclusive: true,
    image: 'https://www.abbott.co.in/content/dam/abbott/products/IN/VitaminD3.png' // sample/representative
  },
  {
    id: 4,
    name: 'Abbott Omeprazole',
    company: 'Abbott Laboratories',
    category: 'Gastrointestinal',
    description: 'For acid reflux and stomach ulcers',
    recommendedFor: ['Acid Reflux', 'Stomach Ulcers', 'GERD'],
    sideEffects: ['Common: Headache', 'Rare: Vitamin B12 deficiency'],
    dosage: '20mg',
    price: 35.00,
    abbottExclusive: true,
    image: 'https://www.abbott.co.in/content/dam/abbott/products/IN/Omeprazole.png' // sample/representative
  },
  {
    id: 5,
    name: 'Abbott Atorvastatin',
    company: 'Abbott Laboratories',
    category: 'Cardiovascular',
    description: 'For cholesterol management',
    recommendedFor: ['High Cholesterol', 'Cardiovascular Health'],
    sideEffects: ['Common: Muscle pain', 'Rare: Liver problems'],
    dosage: '10mg',
    price: 55.50,
    abbottExclusive: true,
    image: 'https://www.abbott.co.in/content/dam/abbott/products/IN/Atorvastatin.png' // sample/representative
  }
];

// Add doctors database
const doctorsDatabase = [
  {
    id: 1,
    name: 'Dr. Rajesh Sharma',
    department: 'Cardiology',
    specialization: 'Heart Specialist',
    relatedMedicines: [5] // Abbott Atorvastatin
  },
  {
    id: 2,
    name: 'Dr. Priya Patel',
    department: 'Gastroenterology',
    specialization: 'Digestive Health',
    relatedMedicines: [4] // Abbott Omeprazole
  },
  {
    id: 3,
    name: 'Dr. Amit Kumar',
    department: 'General Medicine',
    specialization: 'Family Medicine',
    relatedMedicines: [1, 2, 3] // Multiple medicines
  },
  {
    id: 4,
    name: 'Dr. Meera Gupta',
    department: 'Infectious Diseases',
    specialization: 'Antibiotic Therapy',
    relatedMedicines: [2] // Abbott Amoxicillin
  },
  {
    id: 5,
    name: 'Dr. Sanjay Verma',
    department: 'Neurology',
    specialization: 'Brain Specialist',
    relatedMedicines: [1] // Abbott Paracetamol
  },
  {
    id: 6,
    name: 'Dr. Anjali Singh',
    department: 'Pediatrics',
    specialization: 'Child Specialist',
    relatedMedicines: [1, 3] // Abbott Paracetamol and Vitamin D3
  },
  {
    id: 7,
    name: 'Dr. Vikram Reddy',
    department: 'Orthopedics',
    specialization: 'Bone Specialist',
    relatedMedicines: [1, 3] // Abbott Paracetamol and Vitamin D3
  },
  {
    id: 8,
    name: 'Dr. Neha Kapoor',
    department: 'Dermatology',
    specialization: 'Skin Specialist',
    relatedMedicines: [1] // Abbott Paracetamol
  },
  {
    id: 9,
    name: 'Dr. Arjun Malhotra',
    department: 'Endocrinology',
    specialization: 'Diabetes Specialist',
    relatedMedicines: [5] // Abbott Atorvastatin
  },
  {
    id: 10,
    name: 'Dr. Kavita Desai',
    department: 'Gynecology',
    specialization: 'Women\'s Health',
    relatedMedicines: [1, 3] // Abbott Paracetamol and Vitamin D3
  },
  {
    id: 11,
    name: 'Dr. Rohit Joshi',
    department: 'ENT',
    specialization: 'Ear, Nose & Throat',
    relatedMedicines: [2] // Abbott Amoxicillin
  },
  {
    id: 12,
    name: 'Dr. Sunita Mishra',
    department: 'Ophthalmology',
    specialization: 'Eye Specialist',
    relatedMedicines: [1] // Abbott Paracetamol
  }
];

// Add departments database
const departmentsDatabase = [
  {
    id: 1,
    name: 'Chest Department',
    description: 'Specialized care for respiratory conditions',
    doctors: ['Dr. Rajesh Sharma', 'Dr. Priya Patel'],
    images: [
      process.env.PUBLIC_URL + '/images/1.jpg',
      process.env.PUBLIC_URL + '/images/2.jpg'
    ]
  },
  {
    id: 2,
    name: 'ENT Department',
    description: 'Ear, Nose & Throat specialists',
    doctors: ['Dr. Rohit Joshi'],
    images: [
      process.env.PUBLIC_URL + '/images/1.jpg',
      process.env.PUBLIC_URL + '/images/2.jpg'
    ]
  },
  {
    id: 3,
    name: 'Pediatrics Department',
    description: 'Child healthcare specialists',
    doctors: ['Dr. Anjali Singh'],
    images: [
      process.env.PUBLIC_URL + '/images/1.jpg',
      process.env.PUBLIC_URL + '/images/2.jpg'
    ]
  },
  {
    id: 4,
    name: 'Consultant Physician',
    description: 'General medical consultation',
    doctors: ['Dr. Amit Kumar', 'Dr. Meera Gupta'],
    images: [
      process.env.PUBLIC_URL + '/images/1.jpg',
      process.env.PUBLIC_URL + '/images/2.jpg'
    ]
  }
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'medicine-recommendation', 'toolkit'
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const slideshowRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const licenseNumber = e.target.elements.licenseNumber.value;
    const password = e.target.elements.password.value;

    // Demo credentials
    if (licenseNumber === 'test' && password === 'test') {
      setIsLoggedIn(true);
      setDoctorInfo({
        name: 'Jitendra',
        specialization: 'Manager',
        licenseNumber: 'test'
      });
    } else {
      alert('Invalid credentials. Use License Number: test and Password: test');
    }
  };

  // Slideshow navigation handlers
  const handlePrevSlide = () => {
    if (selectedDepartment && selectedDepartment.images && selectedDepartment.images.length > 0) {
      setSlideIndex((prev) => (prev === 0 ? selectedDepartment.images.length - 1 : prev - 1));
    }
  };
  const handleNextSlide = () => {
    if (selectedDepartment && selectedDepartment.images && selectedDepartment.images.length > 0) {
      if (slideIndex === selectedDepartment.images.length - 1) {
        setSelectedDepartment(null); // Close slideshow
      } else {
        setSlideIndex((prev) => prev + 1);
      }
    }
  };

  // Reset slideIndex to 0 if selectedDepartment changes
  useEffect(() => {
    setSlideIndex(0);
  }, [selectedDepartment]);

  // Robust fullscreen effect: only call when ref is set and department is selected
  useEffect(() => {
    if (
      selectedDepartment &&
      selectedDepartment.images &&
      selectedDepartment.images.length > 0 &&
      slideshowRef.current
    ) {
      if (document.fullscreenElement !== slideshowRef.current) {
        slideshowRef.current.requestFullscreen?.();
      }
    }
  }, [selectedDepartment, slideshowRef.current]);

  if (!isLoggedIn) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>AbbottWorld</h1>
          <p className="subtitle">Exclusive Medicine Recommendations for Doctors</p>
        </header>
        <main className="login-container">
          <form onSubmit={handleLogin} className="login-form">
            <h2>Doctor Login</h2>
            <div className="form-group">
              <label>License Number:</label>
              <input type="text" required name="licenseNumber" />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" required name="password" />
            </div>
            <button type="submit">Login</button>
          </form>
        </main>
      </div>
    );
  }

  if (currentPage === 'home') {
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <h1>AbbottWorld</h1>
            <div className="doctor-info">
              <span>Welcome, {doctorInfo.name}</span>
              <span>{doctorInfo.specialization}</span>
            </div>
          </div>
        </header>

        <main className="home-container">
          <div className="tiles-grid">
            <div className="tile" onClick={() => setCurrentPage('medicine-recommendation')}>
              <h2>Medicine Recommendation</h2>
              <p>Access specialist doctors and their recommended Abbott medicines</p>
            </div>
            <div className="tile" onClick={() => setCurrentPage('toolkit')}>
              <h2>Toolkit</h2>
              <p>Access different medical departments and their specialists</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentPage === 'toolkit') {
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <h1>Medical Departments</h1>
            <div className="doctor-info">
              <span>Welcome, {doctorInfo.name}</span>
              <span>{doctorInfo.specialization}</span>
            </div>
            <button className="back-button" onClick={() => { setCurrentPage('home'); setSelectedDepartment(null); setSlideIndex(0); }}>Back to Home</button>
          </div>
        </header>

        <main className="App-main">
          <div className="toolkit-container">
            <h2>Department Directory</h2>
            <p>Select a department to view its specialists</p>
            <div className="departments-grid">
              {departmentsDatabase.map(department => (
                <div key={department.id} className="department-card" onClick={() => { setSelectedDepartment(department); setSlideIndex(0); }}>
                  <h3>{department.name}</h3>
                  <p className="description">{department.description}</p>
                  <div className="doctors-list">
                    <h4>Specialists:</h4>
                    <ul>
                      {department.doctors.map(doctor => (
                        <li key={doctor}>{doctor}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            {/* Slideshow for all departments using department images */}
            {selectedDepartment && selectedDepartment.images && selectedDepartment.images.length > 0 && (
              <div ref={slideshowRef} style={{ marginTop: 30, background: '#000', borderRadius: 8 }}>
                <h3 style={{ color: '#fff' }}>{selectedDepartment.name} - Slideshow</h3>
                <div style={{ position: 'relative', width: '100%', maxWidth: 500, margin: '0 auto' }}>
                  {slideIndex >= 0 && slideIndex < selectedDepartment.images.length && (
                    <img
                      src={selectedDepartment.images[slideIndex]}
                      alt={`Slide ${slideIndex + 1}`}
                      style={{ width: '100%', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                    />
                  )}
                  <button onClick={handlePrevSlide} style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', background: '#002855', color: 'white', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 18, cursor: 'pointer' }}>&lt;</button>
                  <button onClick={handleNextSlide} style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', background: '#002855', color: 'white', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 18, cursor: 'pointer' }}>&gt;</button>
                  <div style={{ textAlign: 'center', marginTop: 10, color: '#fff' }}>
                    {slideIndex + 1} / {selectedDepartment.images.length}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  if (currentPage === 'medicine-recommendation') {
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <h1>Medicine Recommendation</h1>
            <div className="doctor-info">
              <span>Welcome, {doctorInfo.name}</span>
              <span>{doctorInfo.specialization}</span>
            </div>
            <button className="back-button" onClick={() => setCurrentPage('home')}>Back to Home</button>
          </div>
        </header>

        <main className="App-main">
          <div className="toolkit-container">
            <h2>Specialist Doctors Directory</h2>
            <p>Select a doctor to view their recommended Abbott medicines</p>
            
            <div className="doctors-grid">
              {doctorsDatabase.map(doctor => (
                <div 
                  key={doctor.id} 
                  className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <h3>{doctor.name}</h3>
                  <p className="department">{doctor.department}</p>
                  <p className="specialization">{doctor.specialization}</p>
                </div>
              ))}
            </div>

            {selectedDoctor && (
              <div className="recommended-medicines">
                <h3>Recommended Abbott Medicines for {selectedDoctor.name}</h3>
                <div className="medicines-grid">
                  {selectedDoctor.relatedMedicines.map(medicineId => {
                    const medicine = medicineDatabase.find(m => m.id === medicineId);
                    return (
                      <div key={medicine.id} className="medicine-card">
                        <div className="abbott-badge">Abbott Exclusive</div>
                        <h3>{medicine.name}</h3>
                        <p className="category">Category: {medicine.category}</p>
                        <p className="description">{medicine.description}</p>
                        <div className="medicine-details">
                          <h4>Recommended For:</h4>
                          <ul>
                            {medicine.recommendedFor.map(condition => (
                              <li key={condition}>{condition}</li>
                            ))}
                          </ul>
                          <h4>Side Effects:</h4>
                          <ul>
                            {medicine.sideEffects.map(effect => (
                              <li key={effect}>{effect}</li>
                            ))}
                          </ul>
                          <p className="dosage">Dosage: {medicine.dosage}</p>
                          <p className="price">Price: ₹{medicine.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
