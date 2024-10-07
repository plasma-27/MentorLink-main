// credentials.js

const credentials = {
  users: [
    {
      name: 'sandesh',
      surname: 'yadav',
      username: 'sandesh',
      password: '123', // Use secure password hashing in production
      yearPassed: 2019,
      company: 'TechCorp',
      techStack: ['React', 'Node.js'],
    },
    {
      name: 'alok',
      surname: 'yadav',
      username: 'alok',
      password: '1234', // Use secure password hashing in production
      yearPassed: 2020,
      company: 'InnovateTech',
      techStack: ['Angular', 'Java'],
    },
    {
      name: 'Jane',
      surname: 'Smith',
      username: 'janesmith',
      password: 'password789', // Use secure password hashing in production
      yearPassed: 2021,
      company: 'FutureTech',
      techStack: ['Vue.js', 'Python'],
    },
    // Add more users as needed
  ],
};

export default credentials;
