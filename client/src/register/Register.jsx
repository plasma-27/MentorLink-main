import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import registerImage from '../assets/login-image.jpg'; // Ensure you have a different image for register
import credentials from '../data/credentials'; // Import credentials from JSON
import mentorData from '../data/mentordata'; // Import mentor data
import Navbar from '../navigation/Navbar'; // Import Navbar

const techOptions = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'Ruby',
  'PHP',
  'Go',
  // Add more tech stack options as needed
];

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    yearPassed: '',
    company: '',
    techStack: [],
    userType: '',
    dob: '', // New field for date of birth
    college: '', // New field for college
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
    setError(''); // Clear any previous error
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if user already exists in credentials
    const userExists = credentials.users.some(user => user.username === formData.username);

    if (userExists) {
      setError('User already exists. Please choose a different username.');
      return;
    }

    // Depending on the user type, save the data in the respective file
    if (formData.userType === 'Alumni') {
      // Add new mentor to mentor data
      mentorData.push({
        name: formData.name,
        surname: formData.surname,
        username: formData.username, // Save the username
        password: formData.password, // Save the password
        yearPassed: formData.yearPassed,
        company: formData.company,
        techStack: formData.techStack,
        dob: formData.dob, // Save the DOB
        college: formData.college, // Save the college
      });

      // Save updated mentor data to local storage
      localStorage.setItem('mentorData', JSON.stringify(mentorData));
    } else if (formData.userType === 'Student') {
      // Add new user to credentials
      credentials.users.push({ ...formData });

      // Save updated credentials to local storage
      localStorage.setItem('credentials', JSON.stringify(credentials));
    }

    console.log('Registration successful');
    navigate('/login'); // Redirect to login page after successful registration
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
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
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
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" value={formData.username} onChange={handleChange} required placeholder='Enter Username' />
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
                  <label htmlFor="company">Company</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder='Enter Present Company Name' />
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
                      value="Alumni" 
                      checked={formData.userType === 'Alumni'} 
                      onChange={handleRadioChange} 
                    />
                    Alumni
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      value="Student" 
                      checked={formData.userType === 'Student'} 
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
