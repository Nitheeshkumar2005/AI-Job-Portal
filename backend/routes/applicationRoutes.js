const express = require("express");
const { applyJob,  getMyApplications,getJobApplicants,  updateApplicationStatus,} = require("../controllers/applicationController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();

router.post("/apply", authMiddleware, applyJob);
// router.get("/candidate/:id", getMyApplications);
router.get("/my", authMiddleware, getMyApplications);
router.get("/recruiter/my", authMiddleware, getJobApplicants);
// router.get("/recruiter/:id",getJobApplicants)
// router.put("/status/:id", updateApplicationStatus);
router.put(
  "/status/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  updateApplicationStatus
);
module.exports = router;