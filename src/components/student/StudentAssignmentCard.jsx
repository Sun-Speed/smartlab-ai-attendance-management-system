import { useState } from "react";

import { useAssignments } from "../../context/AssignmentContext";

const StudentAssignmentCard = ({ assignment, student }) => {
  const { updateAssignmentStudent } = useAssignments();

  const assignedStudent = assignment.assignedStudents.find(
    (s) => s.studentId === student.id,
  );

  const [pdfName, setPdfName] = useState(assignedStudent?.pdf || "");

  const [github, setGithub] = useState(assignedStudent?.github || "");

  const submit = () => {
    updateAssignmentStudent(assignment.id, student.id, {
      status: "SUBMITTED",

      pdf: pdfName,

      github,

      submittedAt: new Date().toLocaleString(),
    });

    alert("Assignment Submitted Successfully");
  };

  return (
    <div className="border rounded-xl p-6">
      <h2 className="text-2xl font-bold">{assignment.title}</h2>

      <p className="mt-3">{assignment.description}</p>

      <p className="mt-3">
        <strong>Deadline :</strong> {assignment.deadline}
      </p>

      <p className="mt-3">
        <strong>Status :</strong> {assignedStudent.status}
      </p>

      <div className="mt-5">
        <label>PDF File Name</label>

        <input
          className="border w-full p-2 mt-2"
          value={pdfName}
          onChange={(e) => setPdfName(e.target.value)}
          placeholder="assignment.pdf"
        />
      </div>

      <div className="mt-5">
        <label>GitHub Link</label>

        <input
          className="border w-full p-2 mt-2"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="https://github.com/..."
        />
      </div>

      <button onClick={submit} className="border px-5 py-2 mt-6">
        Submit Assignment
      </button>

      {assignedStudent.submittedAt && (
        <div className="mt-5 border-t pt-4">
          <p>
            <strong>Submitted :</strong>

            {assignedStudent.submittedAt}
          </p>

          <p>
            <strong>Marks :</strong>

            {assignedStudent.marks || "--"}
          </p>

          <p>
            <strong>Teacher Remarks :</strong>

            {assignedStudent.teacherRemarks || "--"}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentAssignmentCard;
