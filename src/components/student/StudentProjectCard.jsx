// // import { useState } from "react";

// // import { useProjects } from "../../context/ProjectContext";

// // const StudentProjectCard = ({ project, student }) => {
// //   const { updateProjectStudent } = useProjects();

// //   const assignedStudent = project.assignedStudents.find(
// //     (s) => s.studentId === student.id,
// //   );

// //   const [github, setGithub] = useState(assignedStudent.github || "");

// //   const [demo, setDemo] = useState(assignedStudent.demo || "");

// //   const [zip, setZip] = useState(assignedStudent.zip || "");

// //   const submit = () => {
// //     updateProjectStudent(project.id, student.id, {
// //       github,

// //       demo,

// //       zip,

// //       status: "SUBMITTED",

// //       submittedAt: new Date().toLocaleString(),
// //     });

// //     alert("Project Submitted Successfully");
// //   };

// //   return (
// //     <div className="border rounded-xl p-6">
// //       <h2 className="text-2xl font-bold">{project.title}</h2>

// //       <p className="mt-3">{project.description}</p>

// //       <p className="mt-3">Deadline : {project.deadline}</p>

// //       <p className="mt-3">Status : {assignedStudent.status}</p>

// //       <div className="mt-5">
// //         <label>GitHub Repository</label>

// //         <input
// //           className="border w-full p-2 mt-2"
// //           value={github}
// //           onChange={(e) => setGithub(e.target.value)}
// //         />
// //       </div>

// //       <div className="mt-5">
// //         <label>Live Demo</label>

// //         <input
// //           className="border w-full p-2 mt-2"
// //           value={demo}
// //           onChange={(e) => setDemo(e.target.value)}
// //         />
// //       </div>

// //       <div className="mt-5">
// //         <label>ZIP File Name</label>

// //         <input
// //           className="border w-full p-2 mt-2"
// //           value={zip}
// //           onChange={(e) => setZip(e.target.value)}
// //         />
// //       </div>

// //       <button onClick={submit} className="border px-5 py-2 mt-6">
// //         Submit Project
// //       </button>

// //       <hr className="my-5" />

// //       <p>
// //         <strong>Submitted :</strong>

// //         {assignedStudent.submittedAt || "--"}
// //       </p>

// //       <p>
// //         <strong>Marks :</strong>

// //         {assignedStudent.marks || "--"}
// //       </p>

// //       <p>
// //         <strong>Teacher Remarks :</strong>

// //         {assignedStudent.teacherRemarks || "--"}
// //       </p>
// //     </div>
// //   );
// // };

// // export default StudentProjectCard;

// const StudentProjectCard = ({ project, student }) => {

//   const studentProject = project.assignedStudents.find(
//     (s) => String(s.studentId) === String(student.id)
//   );

//   if (!studentProject) return null;

//   return (
//     <div className="border rounded p-5">

//       <h3 className="text-xl font-bold">
//         {project.title}
//       </h3>

//       <p className="mt-2">
//         {project.description}
//       </p>

//       <p className="mt-2">
//         Technology : {project.technology}
//       </p>

//       <p className="mt-2">
//         Due Date : {project.dueDate}
//       </p>

//       <hr className="my-4"/>

//       <p>
//         <strong>Status :</strong>{" "}
//         {studentProject.status}
//       </p>

//       <p>
//         <strong>Marks :</strong>{" "}
//         {studentProject.marks || "--"}
//       </p>

//       <p>
//         <strong>Teacher Remarks :</strong>{" "}
//         {studentProject.teacherRemarks || "--"}
//       </p>

//     </div>
//   );
// };

// export default StudentProjectCard;

import { useState } from "react";

const StudentProjectCard = ({ project, student, updateProjectStudent }) => {
  const studentProject = project.assignedStudents.find(
    (s) => String(s.studentId) === String(student.id),
  );

  const [marks, setMarks] = useState(studentProject?.marks || "");

  const [remarks, setRemarks] = useState(studentProject?.teacherRemarks || "");

  const save = () => {
    updateProjectStudent(project.id, student.id, {
      marks,
      teacherRemarks: remarks,
    });

    alert("Project Updated");
  };

  return (
    <div className="border rounded p-5">
      <h3 className="text-xl font-bold">{project.title}</h3>

      <p className="mt-2">{project.description}</p>

      <p className="mt-2">Technology : {project.technology}</p>

      <p className="mt-2">Due : {project.dueDate}</p>

      <div className="mt-5">
        <label>Status</label>

        <select
          className="border p-2 w-full mt-2"
          value={studentProject?.status || "PENDING"}
          onChange={(e) =>
            updateProjectStudent(project.id, student.id, {
              status: e.target.value,
            })
          }
        >
          <option value="PENDING">Pending</option>

          <option value="IN_PROGRESS">In Progress</option>

          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <div className="mt-5">
        <label>Marks</label>

        <input
          type="number"
          className="border w-full p-2 mt-2"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />
      </div>

      <div className="mt-5">
        <label>Teacher Remarks</label>

        <textarea
          rows={3}
          className="border w-full p-2 mt-2"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </div>

      <button className="border px-5 py-2 mt-5" onClick={save}>
        Save
      </button>
    </div>
  );
};

export default StudentProjectCard;
