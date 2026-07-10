import { createContext, useContext, useEffect, useState } from "react";

import { useStudents } from "./StudentContext";

const StudentAuthContext = createContext();

export const StudentAuthProvider = ({ children }) => {
  const { students } = useStudents();

  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    const savedStudent = localStorage.getItem("student");

    if (savedStudent) {
      setCurrentStudent(JSON.parse(savedStudent));
    }
  }, []);

  const login = (usn, password) => {
    const student = students.find(
      (student) => student.username === usn && student.password === password,
    );

    if (!student) {
      return {
        success: false,
        message: "Invalid USN or Password",
      };
    }

    setCurrentStudent(student);

    localStorage.setItem("student", JSON.stringify(student));

    return {
      success: true,
    };
  };

  const logout = () => {
    setCurrentStudent(null);

    localStorage.removeItem("student");
  };

  return (
    <StudentAuthContext.Provider
      value={{
        currentStudent,
        login,
        logout,
      }}
    >
      {children}
    </StudentAuthContext.Provider>
  );
};

export const useStudentAuth = () => useContext(StudentAuthContext);
