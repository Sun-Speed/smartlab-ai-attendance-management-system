import { createContext, useContext, useEffect, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    setProjects((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),

        ...project,

        assignedStudents: [],

        createdAt: new Date().toISOString(),

        status: "ACTIVE",
      },
    ]);
  };

  const updateProject = (id, updates) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? {
              ...project,

              ...updates,
            }
          : project,
      ),
    );
  };

  const updateProjectStudent = (projectId, studentId, updates) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id !== projectId) return project;

        return {
          ...project,

          assignedStudents: project.assignedStudents.map((student) =>
            String(student.studentId) === String(studentId)
              ? {
                  ...student,
                  ...updates,
                }
              : student,
          ),
        };
      }),
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const assignStudents = (projectId, studentIds) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              assignedStudents: studentIds.map((studentId) => ({
                studentId,
                status: "PENDING",
                teacherRemarks: "",
                marks: "",
                submittedAt: null,
              })),
            }
          : project,
      ),
    );
  };

  const getProjectById = (id) => projects.find((project) => project.id === id);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        assignStudents,
        updateProject,
        updateProjectStudent,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
