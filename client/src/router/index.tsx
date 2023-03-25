import { Routes, Route } from "react-router-dom";

import LayoutApp from "@/components/LayoutApp";
import LayoutEvaluation from "@/components/LayoutEvaluation";
import RequireUser from "@/components/RequireUser";
import Home from "@/pages/Home";
import Evaluation from "@/pages/Evaluation";
import ForgotPassword from "@/pages/ForgotPassword";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Report from "@/pages/Report";
import NewReport from "@/pages/NewReport";

const Router = () => {
  return (
    <Routes>
      <Route element={<LayoutApp />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/*Private Route */}
        <Route element={<RequireUser />}>
          <Route path="/reports/:reportId" element={<Report />} />
          <Route path="/create/report" element={<NewReport />} />
        </Route>
      </Route>
      <Route element={<LayoutEvaluation />}>
        <Route path="/evaluation/:evaluationId" element={<Evaluation />} />
      </Route>
    </Routes>
  );
};

export default Router;
