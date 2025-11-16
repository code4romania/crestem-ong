"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/evaluations/:id/resend",
      handler: "evaluation.resend",
    },
  ],
};
