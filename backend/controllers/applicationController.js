const Application = require("../models/Application");

// Apply for Job[POST]
const applyJob = async (req, res) => {
  try {
    
   const candidate = req.user.id;   // Token la irundhu edukkrom
const { job } = req.body;        // Frontend la irundhu job mattum varudhu


    const application = await Application.create({
      candidate,
      job,
    });

    res.status(201).json({
      message: "Application Submitted Successfully",
      application,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


//GET application....
//Candidate login pannina, avan apply pannina jobs ellam paakanum.


// Get My Applications..
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user.id,
    })
      .populate("job")
      .populate("candidate");

    res.status(200).json({
      message: "Applications Fetched Successfully",
      applications,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// populate using for this ...it gives the details 
// {
//   "candidate": {
//     "name": "Raj",
//     "email": "raj@gmail.com"
//   },
//   "job": {
//     "title": "React Developer",
//     "company": "TCS"
//   }
// }



// HR or Recruiter oru job-ku yaar yaar apply pannirukanga nu paakanum.
// Get Applicants for Recruiter's Jobs

const Job = require("../models/Job");

const getJobApplicants = async (req, res) => {
  try {

    console.log("Logged Recruiter ID:", req.user.id);

    const jobs = await Job.find({
      recruiter: req.user.id,
    });

    console.log("Jobs:", jobs);

    const jobIds = jobs.map(job => job._id);

    console.log("Job IDs:", jobIds);

    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("candidate")
      .populate("job");

    console.log("Applications:", applications);

    res.status(200).json({
      message: "Applicants Fetched Successfully",
      applications,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};




// Update Application Status
// Recruiter candidate-a Accept or Reject pannuvanga.
const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application Not Found",
      });
    }

    res.status(200).json({
      message: "Application Status Updated Successfully",
      application,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


module.exports = {
  applyJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus,
};