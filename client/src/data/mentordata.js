// mentordata.js

let mentorData = [
  {
    name: 'Robert',
    surname: 'Brown',
    username: 'robertb',
    password: 'securepassword5', // Use a secure password in production
    yearPassed: 2023,
    company: 'Cloud Innovations',
    techStack: ['C#', 'ASP.NET', 'Azure'],
    dob: '1985-03-22',
    college: 'Georgia Tech'
  },
  {
    name: 'Sandesh',
    surname: 'Yadav',
    username: 'sandesh',
    password: 'securepassword1', // Use a secure password in production
    yearPassed: 2019,
    company: 'TechCorp',
    techStack: ['React', 'Node.js', 'Python'],
    dob: '1990-01-15',
    college: 'MIT'
  },
  {
    name: 'Alok',
    surname: 'Yadav',
    username: 'alok',
    password: 'securepassword2', // Use a secure password in production
    yearPassed: 2020,
    company: 'InnovateTech',
    techStack: ['Angular', 'Java', 'Spring Boot'],
    dob: '1992-05-20',
    college: 'Stanford'
  },
  {
    name: 'Shivam',
    surname: 'Prajapati',
    username: 'shivam',
    password: 'securepassword3', // Use a secure password in production
    yearPassed: 2021,
    company: 'FutureTech',
    techStack: ['Vue.js', 'Ruby on Rails', 'PostgreSQL'],
    dob: '1988-09-12',
    college: 'Harvard'
  },
  {
    name: 'Jane',
    surname: 'Doe',
    username: 'janedoe',
    password: 'securepassword4', // Use a secure password in production
    yearPassed: 2022,
    company: 'Web Solutions',
    techStack: ['Django', 'JavaScript', 'MySQL'],
    dob: '1995-11-30',
    college: 'University of California'
  }
  
];

// Load existing mentor data from localStorage
const storedMentors = JSON.parse(localStorage.getItem('mentorData'));
if (storedMentors) {
  mentorData = [...mentorData, ...storedMentors]; // Merge existing and new mentors
}

export default mentorData;