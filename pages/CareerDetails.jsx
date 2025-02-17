import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobDetails, fetchCareerDetailsBanner, createJobApplication } from "../Adapter/PageAdapter";
import { Dialog, TextField, Button, Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import arrSvg from "../assets/images/arrw.svg";
import { baseImage_path } from '../variables/Variables';

// const BASE_IMAGE_URL = 'http://localhost/slraheja/sl-raheja/public';

const CareerDetails = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [bannerData, setBannerData] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    resume: null,
    message: "",
    description: jobDetails?.description || "",
  });

  useEffect(() => {
    const getJobDetails = async () => {
      try {

        const bannerResponse = await fetchCareerDetailsBanner();
        setBannerData(bannerResponse.data);


        const response = await fetchJobDetails(id);
        if (response && response.data.length > 0) {
          setJobDetails(response.data[0]); // Set the job details
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    getJobDetails();
  }, [id]);

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (!jobDetails) {
    return <p>Job details not found for ID: {id}</p>;
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formBody = new FormData();
    formBody.append("first_name", formData.first_name);
    formBody.append("last_name", formData.last_name);
    formBody.append("email", formData.email);
    formBody.append("resume", formData.resume);
    formBody.append("message", formData.message);
    formBody.append("description", formData.description);

    try {
      const response = await createJobApplication(formBody);
      if (response?.message) {
        toast.success(response.message);
        setOpen(false); // Close the modal on success
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          resume: null,
          message: "",
          description: jobDetails?.description || "",
        });
      }
    } catch (error) {
      toast.error("Failed to submit the application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Banner Section */}
      <section className="banner-spac">
        <div className="cust-container">
          <div className="banner-box">
            {bannerData && bannerData.img_path ? (
              <img
                src={`${baseImage_path}${bannerData.img_path.replace(".", "")}`}
                alt="Career Banner"
              />
            ) : (
              <img
                src={"http://localhost/slraheja/sl-raheja/public/images/default-banner.jpg"}
                alt="Default Banner"
              />
            )}
            <div className="ban-con">
              <h1>{jobDetails.title || "Job Title"}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Job Description Section */}
      <section className="jobdescriptionsec">
        <div className="cust-container">
          <div className="jobdescription-inner">
            <div className="row">
              <div className="col-md-12">
                <div className="host-det mobtopmarg">
                  <h4>Job Description</h4>

                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                    professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
                    <b> consectetur</b>, from a Lorem Ipsum passage, and going through the cites of the word in
                    classical literature, discovered the undoubtable source.
                  </p>

                  <p>
                    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of <i> "de Finibus Bonorum et Malorum" </i> (The
                    Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
                    ethics, very popular during the Renaissance. The first line of Lorem Ipsum, <i>"Lorem ipsum dolor
                      sit amet.."</i>, comes from a line in section 1.10.32.
                  </p>

                  <p>
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from <i>"de Finibus Bonorum et Malorum"</i> by Cicero are also
                    reproduced in their exact original form, accompanied by English versions from the 1914 translation
                    by H. Rackham.
                  </p>

                  <h4>Job Responsibilities</h4>
                  <p>{jobDetails.description || "No description provided."}</p>

                  <h4>Department</h4>
                  <p>{jobDetails.department || "Not specified."}</p>

                  <h4>Designation</h4>
                  <p>{jobDetails.designation || "Not specified."}</p>

                  <h4>Skills Required</h4>
                  <p>{jobDetails.skills || "Not specified."}</p>

                  <h4>Education</h4>
                  <p>{jobDetails.education || "Not specified."}</p>

                  <h4>Experience Required</h4>
                  <p>{jobDetails.exp_required ? `${jobDetails.exp_required} years` : "Not specified."}</p>

                  <h4>Posted By</h4>
                  <p>{jobDetails.posted_by || "Admin"}</p>

                  {/* Apply Now Button */}
                  <div className="jdapplybtn">
                    <button className="btn with-color with-arr" onClick={handleOpen}>
                      <img src={arrSvg} alt="Arrow" /> Apply Now
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Box p={3}>
            <h3>Apply for the Job</h3>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Message"
              name="message"
              multiline
              rows={3}
              value={formData.message}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              disabled
            />
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
              style={{ margin: "16px 0" }}
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={handleClose} style={{ marginRight: "8px" }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Box>
          </Box>
        </form>
      </Dialog>
    </>
  );
};

export default CareerDetails;