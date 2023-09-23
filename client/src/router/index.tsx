import { Routes, Route, Navigate } from "react-router-dom";
import LayoutApp from "@/components/LayoutApp";
import LayoutEvaluation from "@/components/LayoutEvaluation";
import LayoutDashboard from "@/components/LayoutDashboard";
import Home from "@/pages/Home";
import Evaluation from "@/pages/Evaluation";
import ForgotPassword from "@/pages/public/ForgotPassword";
import Login from "@/pages/public/Login";
import ResetPassword from "@/pages/public/ResetPassword";
import Register from "@/pages/public/Register";
import SetPassword from "@/pages/public/SetPassword";
import Report from "@/pages/authenticated/Report";
import AdminReport from "@/pages/admin/Report";
import NewReport from "@/pages/NewReport";
import UserReports from "@/pages/UserReports";
import { useAppSelector } from "@/redux/store";
import Dashboard from "@/pages/Dashboard";
import ReportsList from "@/pages/ReportsList";
import UsersList from "@/pages/UsersList";
import Profile from "@/pages/Profile";
import Mentors from "@/pages/Mentors";
import CreateMentor from "@/pages/admin/CreateMentor";
import ProgramsList from "@/pages/admin/ProgramsList";
import Program from "@/pages/admin/Program";
import CreateProgram from "@/pages/admin/CreateProgram";
import getUserType from "@/lib/userType";
import HomeMentor from "@/pages/mentor/Home";
import Activities from "@/pages/mentor/Activities";
import NewActivity from "@/pages/mentor/NewActivity";

const Router = () => {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return (
    <Routes>
      <Route element={<LayoutEvaluation />}>
        <Route path="/evaluation/:evaluationId" element={<Evaluation />} />
      </Route>
      {userType === "fdsc" ? (
        <Route element={<LayoutDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="/reports" element={<ReportsList />} />
          <Route path="/reports/:reportId" element={<AdminReport />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:userId" element={<UserReports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/create/mentor" element={<CreateMentor />} />
          <Route path="/create/program" element={<CreateProgram />} />
          <Route path="/programs" element={<ProgramsList />} />
          <Route path="/programs/:programId" element={<Program />} />
        </Route>
      ) : userType === "authenticated" ? (
        <Route element={<LayoutApp />}>
          <Route index element={<Home />} />
          <Route path="/reports/:reportId" element={<Report />} />
          <Route path="/users/:userId" element={<UserReports />} />
          <Route path="/create/report" element={<NewReport />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      ) : userType === "mentor" ? (
        <Route element={<LayoutApp />}>
          <Route index element={<HomeMentor />} />
          <Route path={"/activities"} element={<Activities />} />
          <Route path={"/create/activity"} element={<NewActivity />} />
        </Route>
      ) : (
        <Route element={<LayoutApp />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirm-email" element={<SetPassword />} />
        </Route>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
