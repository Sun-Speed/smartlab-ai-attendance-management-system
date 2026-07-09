import DashboardLayout from "../../components/layout/DashboardLayout";

import StatCard from "../../components/common/StatCard";

import { useStudents } from "../../context/StudentContext";
import { useTeachers } from "../../context/TeacherContext";
import { useLabSession } from "../../context/LabSessionContext";

import analyticsService from "../../services/analyticsService";

const Dashboard = () => {
  const { students } = useStudents();

  const { teachers } = useTeachers();

  const { sessions, activeSession } =
    useLabSession();

  return (
    <DashboardLayout
      title="Reports Dashboard"
      
    >
      <div className="grid grid-cols-4 gap-5">

        <StatCard
          title="Students"
          value={analyticsService.getTotalStudents(
            students
          )}
        />

        <StatCard
          title="Teachers"
          value={teachers.length}
        />

        <StatCard
          title="Completed Sessions"
          value={analyticsService.getCompletedSessions(
            sessions
          )}
        />

        <StatCard
          title="Active Sessions"
          value={analyticsService.getActiveSessions(
            sessions
          )}
        />

      </div>

      {activeSession && (

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Live Session
          </h2>

          <div className="grid grid-cols-4 gap-5">

            <StatCard
              title="Present"
              value={analyticsService.getPresentCount(
                activeSession
              )}
            />

            <StatCard
              title="Absent"
              value={analyticsService.getAbsentCount(
                activeSession
              )}
            />

            <StatCard
              title="Late"
              value={analyticsService.getLateCount(
                activeSession
              )}
            />

            <StatCard
              title="Attendance %"
              value={`${analyticsService.getAttendancePercentage(
                activeSession
              )}%`}
            />

          </div>

        </div>

      )}

    </DashboardLayout>
  );
};

export default Dashboard;