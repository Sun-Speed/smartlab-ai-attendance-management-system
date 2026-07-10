import { useState } from "react";

import { useStudents } from "../../context/StudentContext";

const ProjectCard = ({ project, updateProjectStudent }) => {
  const { getStudentById } = useStudents();

  const saveStudent = (studentId, updates) => {
    updateProjectStudent(project.id, studentId, updates);
  };

  return (
    <div className="border rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold">{project.title}</h2>

      <p className="mt-2 text-gray-600">{project.description}</p>

      <p className="mt-2">
        <strong>Technology :</strong> {project.technology}
      </p>

      <p>
        <strong>Due Date :</strong> {project.dueDate}
      </p>

      <hr className="my-6" />

      <h3 className="text-xl font-bold mb-5">Assigned Students</h3>

      {project.assignedStudents.length === 0 ? (
        <p>No Students Assigned.</p>
      ) : (
        project.assignedStudents.map((studentProject) => {
          const student = getStudentById(studentProject.studentId);

          return (
            <div
              key={studentProject.studentId}
              className="border rounded-lg p-5 mb-5"
            >
              <h4 className="font-bold text-lg">{student?.name}</h4>

              <p>{student?.usn}</p>

              <div className="mt-4">
                <label>Status</label>

                <select
                  className="border w-full p-2 mt-2"
                  value={studentProject.status}
                  onChange={(e) =>
                    saveStudent(studentProject.studentId, {
                      status: e.target.value,
                    })
                  }
                >
                  <option value="PENDING">Pending</option>

                  <option value="IN_PROGRESS">In Progress</option>

                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              <div className="mt-4">
                <label>Marks</label>

                <input
                  type="number"
                  className="border w-full p-2 mt-2"
                  value={studentProject.marks}
                  onChange={(e) =>
                    saveStudent(studentProject.studentId, {
                      marks: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mt-4">
                <label>Teacher Remarks</label>

                <textarea
                  rows={3}
                  className="border w-full p-2 mt-2"
                  value={studentProject.teacherRemarks}
                  onChange={(e) =>
                    saveStudent(studentProject.studentId, {
                      teacherRemarks: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProjectCard;
