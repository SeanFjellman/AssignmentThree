import React from 'react';

const StudentInformationView = () => {
  // Example data, replace with actual data fetch if necessary
  const students = [
    { name: "Nicholas Messerges", email: "nickm04@iastate.edu" },
    { name: " Sean Fjellman", email: "fjellman@iastate.edu" },
   
  ];

  const courseInfo = {
    courseNumber: "COMS 319",
    courseName: "Software Construction and User Interfaces",
    date: "Spring 2024",
    professorName: "Md Solaiman Hosen",
    projectDescription: "This project is a steam page of games added and updated via server"
  };

  return (
    <div className="container">
      <h1>Course Information</h1>
      <p><strong>Course Number:</strong> {courseInfo.courseNumber}</p>
      <p><strong>Course Name:</strong> {courseInfo.courseName}</p>
      <p><strong>Date:</strong> {courseInfo.date}</p>
      <p><strong>Professor:</strong> {courseInfo.professorName}</p>
      <p>{courseInfo.projectDescription}</p>

      <h2>Student Information</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentInformationView;
