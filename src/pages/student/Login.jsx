import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStudentAuth } from "../../context/StudentAuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useStudentAuth();

  const [formData, setFormData] = useState({
    usn: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const result = login(formData.usn, formData.password);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Login Successful");

    navigate("/student");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Student Login</h1>

        <p className="text-center text-gray-500 mb-8">
          SmartLab AI Attendance System
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="font-semibold">USN</label>

            <input
              type="text"
              name="usn"
              value={formData.usn}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-2"
              placeholder="Enter USN"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-2"
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="mt-8 border-t pt-5">
          <p className="text-sm text-gray-500 text-center">
            Default Password :
            <span className="font-bold text-black"> student123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;