import { Routes, Route } from "react-router-dom";

import LayoutApp from "../components/LayoutApp";
import LayoutEvaluation from "../components/LayoutEvaluation";
import RequireUser from "../components/RequireUser";
import Evaluation from "../pages/Evaluation";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Demo from "../pages/Demo";
import Reports from "../pages/Reports";
import EditReport from "../pages/EditReport";

const Router = () => {
  return (
    <Routes>
      <Route element={<LayoutApp />}>
        <Route index element={<Demo />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        {/*Private Route */}
        <Route element={<RequireUser />}>
          <Route path="reports" element={<Reports />} />
          <Route path="reports/:reportId" element={<EditReport />} />
        </Route>
      </Route>
      <Route element={<LayoutEvaluation />}>
        <Route path="evaluation/:evaluationId" element={<Evaluation />} />
      </Route>
    </Routes>
  );
};

export default Router;
