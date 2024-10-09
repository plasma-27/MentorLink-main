import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import registerImage from '../assets/login-image.jpg';
import Navbar from '../navigation/Navbar'; // Import Navbar

const techOptions = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'Ruby',
  'PHP',
  'Go',
];

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    linkedinProfile: '', // New field for LinkedIn profile
    yearPassed: '',
    company: '',
    techStack: [],
    userType: '',
    dob: '', 
    college: '', 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === 'select-multiple') {
      const options = Array.from(selectedOptions, option => option.value);
      setFormData({ ...formData, [name]: options });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTechStackChange = (e) => {
    const { value, checked } = e.target;
    const { techStack } = formData;

    if (checked) {
      setFormData({ ...formData, techStack: [...techStack, value] });
    } else {
      setFormData({ ...formData, techStack: techStack.filter(tech => tech !== value) });
    }
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, userType: e.target.value });
  };

  const handleNext = () => {
    setStep(step + 1);
    setError(''); 
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Prepare the request body for the API call
    const requestBody = {
      name: formData.name + " " + formData.surname,
      email: formData.username, // Assuming username is the email
      password: formData.password,
      role: formData.userType.toLowerCase(),
      bio: "I am an experienced software developer.",
      skills: formData.techStack,
      linkedinProfile: formData.linkedinProfile, // Include LinkedIn profile in the request
    };

    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      console.log(data);
      

      if (response.ok) {
        console.log('Registration successful:', data);
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="image-section">
          <img src={registerImage} alt="Register" />
        </div>
        <div className="form-section">
          <form className="register-form" onSubmit={handleRegister}>
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            {step === 1 && (
              <>
                <div className="input-field">
                  <label htmlFor="name">First Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder='Enter Name' />
                </div>
                <div className="input-field">
                  <label htmlFor="surname">Last Name</label>
                  <input type="text" name="surname" value={formData.surname} onChange={handleChange} required placeholder='Enter surname' />
                </div>
                <div className="input-field">
                  <label htmlFor="username">Username (Email)</label>
                  <input type="email" name="username" value={formData.username} onChange={handleChange} required placeholder='Enter Email' />
                </div>
                <div className="input-field">
                  <label htmlFor="linkedinProfile">LinkedIn Profile URL</label> {/* New input field */}
                  <input 
                    type="url" 
                    name="linkedinProfile" 
                    value={formData.linkedinProfile} 
                    onChange={handleChange} 
                    required 
                    placeholder="Enter LinkedIn Profile URL" 
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder='Enter Password' />
                </div>
                <button type="button" className="register-button" onClick={handleNext}>Next</button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="input-field">
                  <label htmlFor="yearPassed">Year Passed</label>
                  <input type="number" name="yearPassed" value={formData.yearPassed} onChange={handleChange} required placeholder='Enter Year Passed From College' />
                </div>
                <div className="input-field">
                  <label htmlFor="dob">Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div className="input-field">
                  <label htmlFor="college">College</label>
                  <input type="text" name="college" value={formData.college} onChange={handleChange} required placeholder='Enter College Name' />
                </div>
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      value="mentor" 
                      checked={formData.userType === 'mentor'} 
                      onChange={handleRadioChange} 
                    />
                    Alumni
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      value="mentee" 
                      checked={formData.userType === 'mentee'} 
                      onChange={handleRadioChange} 
                    />
                    Student
                  </label>
                </div>
                <button type="button" className="register-button" onClick={handleNext}>Next</button>
              </>
            )}
            {step === 3 && (
              <>
                <div className="input-field">
                  <label>Select Tech Stack</label>
                  {techOptions.map((tech, index) => (
                    <div key={index}>
                      <input 
                        type="checkbox" 
                        value={tech} 
                        checked={formData.techStack.includes(tech)} 
                        onChange={handleTechStackChange} 
                      />
                      {tech}
                    </div>
                  ))}
                </div>
                <button type="submit" className="register-button">Register</button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
