import DashboardLayout from "../../components/layout/DashboardLayout";

import { useStudentAuth } from "../../context/StudentAuthContext";
import { useProjects } from "../../context/ProjectContext";

import StudentProjectCard from "../../components/student/StudentProjectCard";

const Projects = () => {
  const { currentStudent } = useStudentAuth();

  const { projects } = useProjects();

  const myProjects = projects.filter((project) =>
    project.assignedStudents?.some(
      (student) => student.studentId === currentStudent.id,
    ),
  );

  return (
    <DashboardLayout title="My Projects">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>

      {myProjects.length === 0 ? (
        <div className="border rounded p-5">No Projects Assigned</div>
      ) : (
        <div className="space-y-6">
          {myProjects.map((project) => (
            <StudentProjectCard
              key={project.id}
              project={project}
              student={currentStudent}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Projects;
