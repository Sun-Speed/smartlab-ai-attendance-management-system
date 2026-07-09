import { createContext, useContext, useEffect, useState } from "react";

const StudentContext = createContext();

const initialStudents = [
  {
    id: 1,

    usn: "1RV23CS001",

    name: "Rahul",

    department: "Computer Science",

    semester: 5,

    section: "A",

    subjects: [
      {
        subjectCode: "CSL51",
        subjectName: "Python Lab",
      },
    ],

    activities: {
      projects: [
        {
          title: "Library Management",
          status: "Completed",
        },
      ],

      internals: [
        {
          test: "Internal 1",
          marks: 24,
          outOf: 30,
        },
      ],

      assignments: [
        {
          title: "Assignment 1",
          status: "Completed",
        },
      ],

      certificates: [],

      remarks: "",

      labPerformance: "Good",
    },
  },
];

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");

    return saved ? JSON.parse(saved) : initialStudents;
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // ========================
  // Student CRUD
  // ========================

  const addStudent = (student) => {
    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),

        ...student,

        assignedLabs: student.assignedLabs || [],

        activities: {
          projects: [],
          internals: [],
          assignments: [],
          certificates: [],

          remarks: "",

          labPerformance: {
            rating: "GOOD",

            teacherRemarks: "",
          },
        },
      },
    ]);
  };

  const updateStudent = (id, updatedData) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              ...updatedData,
            }
          : student,
      ),
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  // ========================
  // Subject Management
  // ========================

  const assignSubject = (studentId, subject) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id !== studentId) return student;

        const exists = student.subjects.some(
          (s) => s.subjectCode === subject.subjectCode,
        );

        if (exists) return student;

        return {
          ...student,
          subjects: [...student.subjects, subject],
        };
      }),
    );
  };

  // ========================
  // Projects
  // ========================

  const addProject = (studentId, project) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              activities: {
                ...student.activities,
                projects: [...student.activities.projects, project],
              },
            }
          : student,
      ),
    );
  };

  // ========================
  // Internals
  // ========================

  const addInternalMark = (studentId, internal) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              activities: {
                ...student.activities,
                internals: [...student.activities.internals, internal],
              },
            }
          : student,
      ),
    );
  };

  // ========================
  // Assignments
  // ========================

  const addAssignment = (studentId, assignment) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              activities: {
                ...student.activities,
                assignments: [...student.activities.assignments, assignment],
              },
            }
          : student,
      ),
    );
  };

  // ========================
  // Certificates
  // ========================

  const addCertificate = (studentId, certificate) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              activities: {
                ...student.activities,
                certificates: [...student.activities.certificates, certificate],
              },
            }
          : student,
      ),
    );
  };

  // ========================
  // Remarks
  // ========================

  const updateRemarks = (studentId, remarks) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              activities: {
                ...student.activities,
                remarks,
              },
            }
          : student,
      ),
    );
  };

  // ========================
  // Lab Performance
  // ========================

  const updateLabPerformance = (studentId, performance) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,

              activities: {
                ...student.activities,

                labPerformance: performance,
              },
            }
          : student,
      ),
    );
  };

  const getStudentById = (id) =>
    students.find((student) => String(student.id) === String(id));

  return (
    <StudentContext.Provider
      value={{
        students,

        addStudent,

        updateStudent,

        deleteStudent,

        assignSubject,

        addProject,

        addInternalMark,

        addAssignment,

        addCertificate,

        updateRemarks,

        updateLabPerformance,

        getStudentById,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => useContext(StudentContext);
