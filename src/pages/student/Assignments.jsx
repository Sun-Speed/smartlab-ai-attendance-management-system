import DashboardLayout from "../../components/layout/DashboardLayout";

import { useStudentAuth } from "../../context/StudentAuthContext";
import { useAssignments } from "../../context/AssignmentContext";

import StudentAssignmentCard from "../../components/student/StudentAssignmentCard";

const Assignments = () => {
  const { currentStudent } = useStudentAuth();

  const { assignments } = useAssignments();

  const myAssignments = assignments.filter((assignment) =>
    assignment.assignedStudents?.some(
      (student) => student.studentId === currentStudent.id,
    ),
  );

  return (
    <DashboardLayout title="My Assignments">
      <h1 className="text-3xl font-bold mb-6">My Assignments</h1>

      {myAssignments.length === 0 ? (
        <div className="border rounded p-6">No Assignments Assigned</div>
      ) : (
        <div className="space-y-6">
          {myAssignments.map((assignment) => (
            <StudentAssignmentCard
              key={assignment.id}
              assignment={assignment}
              student={currentStudent}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Assignments;