// import { useState } from "react";

// import { useStudents } from "../../context/StudentContext";
// import { useLabs } from "../../context/LabContext";
// import Select from "../common/Select";
// import {
//   DEPARTMENTS,
//   SEMESTERS,
//   SECTIONS,
// } from "../../utils/constants";

// const StudentLabAssignment = () => {
//   const { students, updateStudent } = useStudents();

//   const { labs } = useLabs();

//   const [department, setDepartment] = useState("");
// const [semester, setSemester] = useState("");
// const [section, setSection] = useState("");
// const [labId, setLabId] = useState("");

//   const filteredStudents = students.filter(
//   (student) =>
//     (!department || student.department === department) &&
//     (!semester || String(student.semester) === semester) &&
//     (!section || student.section === section)
// );

//   const toggleLab = (labId) => {
//   if (!student) return;

//   const assignedLabs = student.assignedLabs || [];

//   const updatedLabs = assignedLabs.includes(labId)
//     ? assignedLabs.filter((id) => id !== labId)
//     : [...assignedLabs, labId];

//   console.log("Student Before:", student);
//   console.log("Updated Labs:", updatedLabs);

//   updateStudent(student.id, {
//     assignedLabs: updatedLabs,
//   });

//   console.log("Update Called");
// };

// // console.log("Student:", student);
// console.log("Labs:", labs);

//   return (
//   <div className="border rounded p-5">
//     <h2 className="text-2xl font-bold mb-5">
//       Assign Lab to Students
//     </h2>

//     {/* Department */}

//     <Select
//       label="Department"
//       value={department}
//       onChange={(e) => setDepartment(e.target.value)}
//       options={DEPARTMENTS.map((dept) => ({
//         label: dept,
//         value: dept,
//       }))}
//     />

//     {/* Semester */}

//     <Select
//       label="Semester"
//       value={semester}
//       onChange={(e) => setSemester(e.target.value)}
//       options={SEMESTERS.map((sem) => ({
//         label: sem,
//         value: sem,
//       }))}
//     />

//     {/* Section */}

//     <Select
//       label="Section"
//       value={section}
//       onChange={(e) => setSection(e.target.value)}
//       options={SECTIONS.map((sec) => ({
//         label: sec,
//         value: sec,
//       }))}
//     />

//     <p className="mt-5 font-semibold">
//       Students Found : {filteredStudents.length}
//     </p>

//     {/* Lab */}

//     <div className="mt-5">
//       <label className="font-semibold">
//         Select Lab
//       </label>

//       <select
//         className="border p-2 w-full mt-2"
//         value={labId}
//         onChange={(e) => setLabId(e.target.value)}
//       >
//         <option value="">
//           Select Lab
//         </option>

//         {labs
//           .filter(
//             (lab) =>
//               lab.department === department &&
//               String(lab.assignedSemester) === semester
//           )
//           .map((lab) => (
//             <option
//               key={lab.id}
//               value={lab.id}
//             >
//               {lab.labName}
//             </option>
//           ))}
//       </select>
//     </div>

//     <button
//       onClick={assignLabToStudents}
//       className="border px-5 py-2 mt-6 rounded"
//       disabled={!labId || filteredStudents.length === 0}
//     >
//       Assign Lab To All Students
//     </button>
//   </div>
// );
// };

// export default StudentLabAssignment;

import { useState } from "react";

import Select from "../common/Select";

import { useStudents } from "../../context/StudentContext";
import { useLabs } from "../../context/LabContext";

import { DEPARTMENTS, SEMESTERS, SECTIONS } from "../../utils/constants";

const StudentLabAssignment = () => {
  const { students, updateStudent } = useStudents();

  const { labs } = useLabs();

  const [department, setDepartment] = useState("");

  const [semester, setSemester] = useState("");

  const [section, setSection] = useState("");

  const [labId, setLabId] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      (!department || student.department === department) &&
      (!semester || String(student.semester) === String(semester)) &&
      (!section || student.section === section),
  );

  const availableLabs = labs.filter(
    (lab) =>
      lab.department === department &&
      String(lab.assignedSemester) === String(semester),
  );

  const assignLabToStudents = () => {
    if (!labId) {
      alert("Please select a lab.");
      return;
    }

    if (filteredStudents.length === 0) {
      alert("No students found.");
      return;
    }

    filteredStudents.forEach((student) => {
      const assignedLabs = student.assignedLabs || [];

      if (!assignedLabs.includes(labId)) {
        updateStudent(student.id, {
          assignedLabs: [...assignedLabs, labId],
        });
      }
    });

    alert("Lab assigned successfully.");
  };

  return (
    <div className="border rounded p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Assign Lab To Students</h2>

      <div className="grid grid-cols-3 gap-4">
        <Select
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          options={DEPARTMENTS.map((item) => ({
            label: item,
            value: item,
          }))}
        />

        <Select
          label="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          options={SEMESTERS.map((item) => ({
            label: item,
            value: item,
          }))}
        />

        <Select
          label="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          options={SECTIONS.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </div>

      <div className="mt-6">
        <p className="font-semibold">
          Students Found : {filteredStudents.length}
        </p>
      </div>

      <div className="mt-6">
        <label className="block mb-2 font-semibold">Select Lab</label>

        <select
          className="border p-2 rounded w-full"
          value={labId}
          onChange={(e) => setLabId(e.target.value)}
        >
          <option value="">Select Lab</option>

          {availableLabs.map((lab) => (
            <option key={lab.id} value={lab.id}>
              {lab.labName}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={assignLabToStudents}
        disabled={!labId || filteredStudents.length === 0}
        className="border rounded px-6 py-2 mt-6"
      >
        Assign Lab To All Students
      </button>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Selected Students</h3>

        {filteredStudents.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="space-y-2">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="border rounded p-3 flex justify-between"
              >
                <div>
                  <p className="font-semibold">{student.name}</p>

                  <p className="text-sm">{student.usn}</p>
                </div>

                <div>Assigned Labs : {student.assignedLabs?.length || 0}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentLabAssignment;
