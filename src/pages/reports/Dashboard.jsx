import DashboardLayout from "../../components/layout/DashboardLayout";

import { useStudents } from "../../context/StudentContext";
import { useTeachers } from "../../context/TeacherContext";
import { useClerks } from "../../context/ClerkContext";
import { useLabs } from "../../context/LabContext";
import { useProjects } from "../../context/ProjectContext";
import { useAssignments } from "../../context/AssignmentContext";
import { useLabSession } from "../../context/LabSessionContext";

const Dashboard = () => {

  const { students } = useStudents();

  const { teachers } = useTeachers();

  const { clerks } = useClerks();

  const { labs } = useLabs();

  const { projects } = useProjects();

  const { assignments } = useAssignments();

  const { sessions } = useLabSession();

  return (
    <DashboardLayout title="Reports Dashboard">

  {/* Header */}

  <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow mb-8">

    <h1 className="text-4xl font-bold">
      HOD Analytics Dashboard
    </h1>

    <p className="mt-3 text-indigo-100 text-lg">
      Monitor students, teachers, labs and academic activities across the institution.
    </p>

  </div>

  {/* Statistics */}

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

    {/* Students */}

    <div className="bg-white rounded-xl border shadow-sm p-6">

      <p className="text-gray-500">
        Total Students
      </p>

      <h2 className="text-4xl font-bold text-blue-600 mt-3">
        {students.length}
      </h2>

    </div>

    {/* Teachers */}

    <div className="bg-white rounded-xl border shadow-sm p-6">

      <p className="text-gray-500">
        Total Teachers
      </p>

      <h2 className="text-4xl font-bold text-green-600 mt-3">
        {teachers.length}
      </h2>

    </div>

    {/* Clerks */}

    <div className="bg-white rounded-xl border shadow-sm p-6">

      <p className="text-gray-500">
        Total Clerks
      </p>

      <h2 className="text-4xl font-bold text-purple-600 mt-3">
        {clerks.length}
      </h2>

    </div>

    {/* Labs */}

    <div className="bg-white rounded-xl border shadow-sm p-6">

      <p className="text-gray-500">
        Total Labs
      </p>

      <h2 className="text-4xl font-bold text-orange-500 mt-3">
        {labs.length}
      </h2>

    </div>

  </div>


  {/* Academic Statistics */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

  {/* Projects */}

  <div className="bg-white rounded-xl border shadow-sm p-6">

    <p className="text-gray-500">
      Total Projects
    </p>

    <h2 className="text-4xl font-bold text-cyan-600 mt-3">
      {projects.length}
    </h2>

  </div>

  {/* Assignments */}

  <div className="bg-white rounded-xl border shadow-sm p-6">

    <p className="text-gray-500">
      Total Assignments
    </p>

    <h2 className="text-4xl font-bold text-pink-600 mt-3">
      {assignments.length}
    </h2>

  </div>

  {/* Sessions */}

  <div className="bg-white rounded-xl border shadow-sm p-6">

    <p className="text-gray-500">
      Lab Sessions
    </p>

    <h2 className="text-4xl font-bold text-emerald-600 mt-3">
      {sessions.length}
    </h2>

  </div>

  {/* Attendance */}

  <div className="bg-white rounded-xl border shadow-sm p-6">

    <p className="text-gray-500">
      Attendance Records
    </p>

    <h2 className="text-4xl font-bold text-red-500 mt-3">
      {sessions.reduce(
        (total, session) => total + session.students.length,
        0
      )}
    </h2>

  </div>

</div>

{/* ================= Department Statistics ================= */}

<div className="bg-white border rounded-xl shadow-sm p-6 mt-8">

  <h2 className="text-2xl font-bold mb-6">
    Department Statistics
  </h2>

  <div className="space-y-4">

    {[
      ...new Set(
        students.map((student) => student.department)
      ),
    ].map((department) => {

      const total = students.filter(
        (student) =>
          student.department === department
      ).length;

      return (

        <div
          key={department}
          className="flex justify-between items-center border rounded-lg p-4"
        >

          <div>

            <h3 className="font-semibold text-lg">
              {department}
            </h3>

            <p className="text-gray-500">
              Department
            </p>

          </div>

          <div className="text-right">

            <p className="text-3xl font-bold text-blue-600">
              {total}
            </p>

            <p className="text-gray-500">
              Students
            </p>

          </div>

        </div>

      );

    })}

  </div>

</div>


{/* ================= Teacher Workload ================= */}

<div className="bg-white border rounded-xl shadow-sm p-6 mt-8">

  <h2 className="text-2xl font-bold mb-6">
    Teacher Workload
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    {teachers.map((teacher) => {

      const teacherLabs = labs.filter(
        (lab) => lab.assignedTeacherId === teacher.id
      );

      const teacherStudents = students.filter((student) =>
        student.assignedLabs?.some((labId) =>
          teacherLabs.some((lab) => lab.id === labId)
        )
      );

      return (

        <div
          key={teacher.id}
          className="border rounded-xl p-5 hover:shadow-md transition"
        >

          <h3 className="text-xl font-bold">
            {teacher.name}
          </h3>

          <p className="text-gray-500 mt-1">
            {teacher.department}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-5">

            <div>

              <p className="text-gray-500">
                Assigned Labs
              </p>

              <h2 className="text-3xl font-bold text-blue-600">
                {teacherLabs.length}
              </h2>

            </div>

            <div>

              <p className="text-gray-500">
                Students
              </p>

              <h2 className="text-3xl font-bold text-green-600">
                {teacherStudents.length}
              </h2>

            </div>

          </div>

        </div>

      );

    })}

  </div>

</div>


{/* ================= Lab Utilization ================= */}

<div className="bg-white border rounded-xl shadow-sm p-6 mt-8">

  <h2 className="text-2xl font-bold mb-6">
    Lab Utilization
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    {labs.map((lab) => {

      const teacher = teachers.find(
        (t) => t.id === lab.assignedTeacherId
      );

      const totalStudents = students.filter((student) =>
        student.assignedLabs?.includes(lab.id)
      ).length;

      const totalSessions = sessions.filter(
        (session) => session.lab.id === lab.id
      ).length;

      return (

        <div
          key={lab.id}
          className="border rounded-xl p-5 hover:shadow-md transition"
        >

          <h3 className="text-xl font-bold">
            {lab.labName}
          </h3>

          <p className="text-gray-500 mt-1">
            {lab.department}
          </p>

          <div className="mt-5 space-y-3">

            <div className="flex justify-between">

              <span>Teacher</span>

              <strong>
                {teacher?.name || "Not Assigned"}
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Students</span>

              <strong>{totalStudents}</strong>

            </div>

            <div className="flex justify-between">

              <span>Sessions</span>

              <strong>{totalSessions}</strong>

            </div>

            <div className="flex justify-between">

              <span>Semester</span>

              <strong>{lab.assignedSemester}</strong>

            </div>

            <div className="flex justify-between">

              <span>Section</span>

              <strong>{lab.assignedSection}</strong>

            </div>

          </div>

        </div>

      );

    })}

  </div>

</div>

{/* ================= Assignment & Project Analytics ================= */}

<div className="grid md:grid-cols-2 gap-6 mt-8">

  {/* Assignment Analytics */}

  <div className="bg-white border rounded-xl shadow-sm p-6">

    <h2 className="text-2xl font-bold mb-6">
      Assignment Analytics
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">
        <span>Total Assignments</span>
        <strong>{assignments.length}</strong>
      </div>

      <div className="flex justify-between">
        <span>Assigned Students</span>
        <strong>
          {assignments.reduce(
            (total, assignment) =>
              total + (assignment.assignedStudents?.length || 0),
            0
          )}
        </strong>
      </div>

      <div className="flex justify-between">
        <span>Completed</span>
        <strong className="text-green-600">
          {assignments.reduce(
            (total, assignment) =>
              total +
              (assignment.assignedStudents?.filter(
                (student) => student.status === "EVALUATED"
              ).length || 0),
            0
          )}
        </strong>
      </div>

      <div className="flex justify-between">
        <span>Pending</span>
        <strong className="text-red-600">
          {assignments.reduce(
            (total, assignment) =>
              total +
              (assignment.assignedStudents?.filter(
                (student) => student.status !== "EVALUATED"
              ).length || 0),
            0
          )}
        </strong>
      </div>

    </div>

  </div>

  {/* Project Analytics */}

  <div className="bg-white border rounded-xl shadow-sm p-6">

    <h2 className="text-2xl font-bold mb-6">
      Project Analytics
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">
        <span>Total Projects</span>
        <strong>{projects.length}</strong>
      </div>

      <div className="flex justify-between">
        <span>Assigned Students</span>
        <strong>
          {projects.reduce(
            (total, project) =>
              total + (project.assignedStudents?.length || 0),
            0
          )}
        </strong>
      </div>

      <div className="flex justify-between">
        <span>Completed</span>
        <strong className="text-green-600">
          {projects.reduce(
            (total, project) =>
              total +
              (project.assignedStudents?.filter(
                (student) => student.status === "COMPLETED"
              ).length || 0),
            0
          )}
        </strong>
      </div>

      <div className="flex justify-between">
        <span>Pending</span>
        <strong className="text-red-600">
          {projects.reduce(
            (total, project) =>
              total +
              (project.assignedStudents?.filter(
                (student) => student.status !== "COMPLETED"
              ).length || 0),
            0
          )}
        </strong>
      </div>

    </div>

  </div>

</div>

{/* ================= Quick Insights ================= */}

<div className="bg-white border rounded-xl shadow-sm p-6 mt-8">

  <h2 className="text-2xl font-bold mb-6">
    📢 Quick Insights
  </h2>

  <div className="space-y-4">

    {/* Total Pending Assignments */}

    <div className="flex items-center gap-3 border rounded-lg p-4">

      <span className="text-2xl">📝</span>

      <p>

        <strong>
          {
            assignments.reduce(
              (total, assignment) =>
                total +
                (assignment.assignedStudents?.filter(
                  (student) => student.status !== "EVALUATED"
                ).length || 0),
              0
            )
          }
        </strong>{" "}
        assignment submissions are still pending.

      </p>

    </div>

    {/* Total Pending Projects */}

    <div className="flex items-center gap-3 border rounded-lg p-4">

      <span className="text-2xl">💻</span>

      <p>

        <strong>
          {
            projects.reduce(
              (total, project) =>
                total +
                (project.assignedStudents?.filter(
                  (student) => student.status !== "COMPLETED"
                ).length || 0),
              0
            )
          }
        </strong>{" "}
        project submissions are pending.

      </p>

    </div>

    {/* Department with Highest Students */}

    <div className="flex items-center gap-3 border rounded-lg p-4">

      <span className="text-2xl">🎓</span>

      <p>

        Department with highest students :

        <strong className="ml-2">

          {
            [...new Set(students.map((s) => s.department))]
              .sort(
                (a, b) =>
                  students.filter((s) => s.department === b).length -
                  students.filter((s) => s.department === a).length
              )[0] || "--"
          }

        </strong>

      </p>

    </div>

    {/* Teacher with Highest Labs */}

    <div className="flex items-center gap-3 border rounded-lg p-4">

      <span className="text-2xl">👨‍🏫</span>

      <p>

        Teacher handling the most labs :

        <strong className="ml-2">

          {
            teachers
              .sort(
                (a, b) =>
                  labs.filter((l) => l.assignedTeacherId === b.id).length -
                  labs.filter((l) => l.assignedTeacherId === a.id).length
              )[0]?.name || "--"
          }

        </strong>

      </p>

    </div>

    {/* Lab with Highest Sessions */}

    <div className="flex items-center gap-3 border rounded-lg p-4">

      <span className="text-2xl">🧪</span>

      <p>

        Most active lab :

        <strong className="ml-2">

          {
            labs
              .sort(
                (a, b) =>
                  sessions.filter((s) => s.lab.id === b.id).length -
                  sessions.filter((s) => s.lab.id === a.id).length
              )[0]?.labName || "--"
          }

        </strong>

      </p>

    </div>

  </div>

</div>

</DashboardLayout>
  );

};

export default Dashboard;