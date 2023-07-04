import { Routes, Route } from "react-router-dom";

import LayoutApp from "@/components/LayoutApp";
import LayoutEvaluation from "@/components/LayoutEvaluation";
import RequireUser from "@/components/RequireUser";
import Home from "@/pages/Home";
import Evaluation from "@/pages/Evaluation";
import ForgotPassword from "@/pages/ForgotPassword";
import Login from "@/pages/Login";
import ResetPassword from "@/pages/ResetPassword";
import Register from "@/pages/Register";
import Report from "@/pages/Report";
import NewReport from "@/pages/NewReport";
import UserReports from "@/pages/UserReports";
import { useAppSelector } from "@/redux/store";
import Dashboard from "@/pages/Dashboard";
import ReportsList from "@/pages/ReportsList";
import UsersList from "@/pages/UsersList";

const Router = () => {
  const user = useAppSelector((state) => state.userState.user);
  const userType = user?.role?.type;
  const isFDSC = userType === "fdsc";

  return (
    <Routes>
      <Route element={<LayoutApp />}>
        <Route index element={isFDSC ? <Dashboard /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/*Private Route */}
        <Route element={<RequireUser />}>
          <Route path="/reports/:reportId" element={<Report />} />
          <Route path="/create/report" element={<NewReport />} />
          <Route path="/users/:userId" element={<UserReports />} />
        </Route>
        <Route element={<RequireUser />}>
          <Route path="/reports" element={<ReportsList />} />
          <Route path="/users" element={<UsersList />} />
        </Route>
      </Route>
      <Route element={<LayoutEvaluation />}>
        <Route path="/evaluation/:evaluationId" element={<Evaluation />} />
      </Route>
    </Routes>
  );
};

export default Router;
