// dummyStudentRequest.js
const studentRequests = [
  {
      name: 'sandesh2',
      surname: 'yadav',
      techStack: ['React', 'Node.js'],
      message: 'Looking for guidance on building full-stack applications.'
  },
  // other existing requests...
];

// Function to add a new request
export const addStudentRequest = (request) => {
  studentRequests.push(request);
};

export default studentRequests;
