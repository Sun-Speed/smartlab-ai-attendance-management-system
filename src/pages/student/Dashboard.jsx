import DashboardLayout from "../../components/layout/DashboardLayout";

import { useStudentAuth } from "../../context/StudentAuthContext";
import { useLabSession } from "../../context/LabSessionContext";
import { useAssignments } from "../../context/AssignmentContext";
import { useProjects } from "../../context/ProjectContext";

const Dashboard = () => {
  const { currentStudent } = useStudentAuth();

  const { sessions } = useLabSession();

  const { assignments } = useAssignments();

  const { projects } = useProjects();

  if (!currentStudent) {
    return (
      <DashboardLayout title="Student Dashboard">
        Student Not Found
      </DashboardLayout>
    );
  }

  /* ================= Attendance ================= */

  const attendance = [];

  sessions.forEach((session) => {
    session.students.forEach((student) => {
      if (student.studentId === currentStudent.id) {
        attendance.push(student);
      }
    });
  });

  const present = attendance.filter(
    (student) => student.attendance === "PRESENT",
  ).length;

  const late = attendance.filter(
    (student) => student.attendance === "LATE",
  ).length;

  const absent = attendance.filter(
    (student) => student.attendance === "ABSENT",
  ).length;

  const attendancePercentage =
    attendance.length === 0
      ? 0
      : Math.round(((present + late) / attendance.length) * 100);

  /* ================= Assignments ================= */

  const myAssignments = assignments.filter((assignment) =>
    assignment.assignedStudents?.some(
      (student) => student.studentId === currentStudent.id,
    ),
  );

  const pendingAssignments = myAssignments.filter((assignment) => {
    const student = assignment.assignedStudents.find(
      (s) => s.studentId === currentStudent.id,
    );

    return student.status !== "COMPLETED";
  }).length;

  const completedAssignments = myAssignments.filter((assignment) => {
    const student = assignment.assignedStudents.find(
      (s) => s.studentId === currentStudent.id,
    );

    return student.status === "COMPLETED";
  }).length;

  /* ================= Projects ================= */

  const myProjects = projects.filter((project) =>
    project.assignedStudents?.some(
      (student) => student.studentId === currentStudent.id,
    ),
  );

  const pendingProjects = myProjects.filter((project) => {
    const student = project.assignedStudents.find(
      (s) => s.studentId === currentStudent.id,
    );

    return student.status !== "COMPLETED";
  }).length;

  const completedProjects = myProjects.filter((project) => {
    const student = project.assignedStudents.find(
      (s) => s.studentId === currentStudent.id,
    );

    return student.status === "COMPLETED";
  }).length;

  return (
    <DashboardLayout title="Student Dashboard">
      {/* Welcome */}

      <div className="border rounded-xl p-6 mb-8 bg-white">
        <h1 className="text-3xl font-bold">
          👋 Welcome, {currentStudent.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {currentStudent.department} • Semester {currentStudent.semester} •
          Section {currentStudent.section}
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="border rounded-xl p-5 shadow-sm">
          <p className="text-gray-500">Attendance</p>
          <h2 className="text-4xl font-bold mt-3">{attendancePercentage}%</h2>
        </div>

        <div className="border rounded-xl p-5 shadow-sm">
          <p className="text-gray-500">Pending Assignments</p>
          <h2 className="text-4xl font-bold mt-3">{pendingAssignments}</h2>
        </div>

        <div className="border rounded-xl p-5 shadow-sm">
          <p className="text-gray-500">Pending Projects</p>
          <h2 className="text-4xl font-bold mt-3">{pendingProjects}</h2>
        </div>

        <div className="border rounded-xl p-5 shadow-sm">
          <p className="text-gray-500">Completed Assignments</p>
          <h2 className="text-4xl font-bold mt-3">{completedAssignments}</h2>
        </div>

        <div className="border rounded-xl p-5 shadow-sm">
          <p className="text-gray-500">Completed Projects</p>
          <h2 className="text-4xl font-bold mt-3">{completedProjects}</h2>
        </div>

        <div className="border rounded-xl p-5 shadow-sm">
          <p className="text-gray-500">Performance</p>
          <h2 className="text-3xl font-bold mt-3">
            {currentStudent.activities.labPerformance.rating}
          </h2>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="border rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-5">⚡ Quick Actions</h2>

        <div className="grid grid-cols-4 gap-5">
          <button
            onClick={() => navigate("/student/attendance")}
            className="border rounded-lg p-6 hover:bg-gray-100"
          >
            📊
            <h3 className="mt-3 font-bold">Attendance</h3>
          </button>

          <button
            onClick={() => navigate("/student/assignments")}
            className="border rounded-lg p-6 hover:bg-gray-100"
          >
            📝
            <h3 className="mt-3 font-bold">Assignments</h3>
          </button>

          <button
            onClick={() => navigate("/student/projects")}
            className="border rounded-lg p-6 hover:bg-gray-100"
          >
            💻
            <h3 className="mt-3 font-bold">Projects</h3>
          </button>

          <button
            onClick={() => navigate("/student/profile")}
            className="border rounded-lg p-6 hover:bg-gray-100"
          >
            👤
            <h3 className="mt-3 font-bold">Profile</h3>
          </button>
        </div>
      </div>

      {/* Recent Assignments */}

      <div className="border rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-5">📝 Recent Assignments</h2>

        {myAssignments.length === 0 ? (
          <p>No Assignments Assigned.</p>
        ) : (
          myAssignments.slice(0, 3).map((assignment) => {
            const student = assignment.assignedStudents.find(
              (s) => s.studentId === currentStudent.id,
            );

            return (
              <div
                key={assignment.id}
                className="border rounded p-4 mb-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{assignment.title}</h3>

                  <p className="text-sm text-gray-500">{assignment.deadline}</p>
                </div>

                <span className="font-semibold">{student.status}</span>
              </div>
            );
          })
        )}
      </div>

      {/* Recent Projects */}

      <div className="border rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-5">💻 Recent Projects</h2>

        {myProjects.length === 0 ? (
          <p>No Projects Assigned.</p>
        ) : (
          myProjects.slice(0, 3).map((project) => {
            const student = project.assignedStudents.find(
              (s) => s.studentId === currentStudent.id,
            );

            return (
              <div
                key={project.id}
                className="border rounded p-4 mb-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{project.title}</h3>

                  <p className="text-sm text-gray-500">{project.deadline}</p>
                </div>

                <span className="font-semibold">{student.status}</span>
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
