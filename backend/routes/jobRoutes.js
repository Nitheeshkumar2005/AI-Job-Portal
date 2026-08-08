const express = require("express");

const {
  createJob,
  getAllJob,
  getsingle_job,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/create-job",
  authMiddleware,
  roleMiddleware("recruiter"),
  createJob
);

router.get("/getJobs", getAllJob);
router.get("/:id", getsingle_job);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;