
const Job = require("../models/Job");

// Create Job
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      jobType,
      experience,
      description,
      recruiter,
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      jobType,
      experience,
      description,
      recruiter : req.user.id
    });

    res.status(201).json({
      message: "Job Created Successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// getting Alljobs

const getAllJob = async(req,res)=>{
    try{
      //pagination 
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const skip = (page-1)*limit
      // search
      const search = req.query.search || ""
      //filter-> it gives me exact location or exact details 
      const location = req.query.location;
         const jobs = await Job.find({
          // search 

          // if I search title react then it gives me react developer..
          // if we search partially it gives us full requried result
          // 'i' is case sensitive
          title:{
            $regex: search,
            $options: 'i'
          },
          // filter..if i search ch it gives me chennai
           ...(location && {
    location: {
      $regex: location,
      $options: "i"
    }
  })
         })
         .sort({salary:-1})
         .skip(skip)
         .limit(limit)
         // instead of getting recruiter's id, i receive name roll email like that
         .populate("recruiter")
         
         res.status(200).json({
            message:"Jobs Fetched Successfully",
            jobs
         })
    }
    catch(err){
          res.status(500).json({
      message: err.message,
    });
    }
  
}


// getting single job
const getsingle_job = async(req,res)=>{
    try{
        const job = await Job.findById(req.params.id)
        if(!job){
            res.status(500).json({
                message:"no job found"
            })
        }
        res.status(200).json({
      message: "Job Fetched Successfully",
      job,
    });
    }
    catch(err){
        res.status(500).json({
      message: err.message,
    });
    }
}

//update job

// Update Job
const updateJob = async (req, res) => {
  try {
    const update_job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
    //   { new: true }
     {
    returnDocument: "after"
  }
    );

    if (!update_job) {
      return res.status(404).json({
        message: "Job Not Found",
      });
    }

    res.status(200).json({
      message: "Job Updated Successfully",
      update_job,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//Delete user
// Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
      });
    }

    res.status(200).json({
      message: "Job Deleted Successfully",
      job,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createJob,
  getAllJob,
  getsingle_job,
  updateJob,
  deleteJob
};

// req.body → Frontend/Postman data receive pannum.
// Job.create() → MongoDB-la job save pannum.