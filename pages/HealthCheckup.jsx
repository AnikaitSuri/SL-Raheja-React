import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHealthCheckupDetails } from "../Adapter/PageAdapter";
import arrSvg from "../assets/images/arrw.svg";
import { Dialog, DialogContent, Button } from "@mui/material";
import { baseImage_path } from "../variables/Variables";

const HealthCheckup = () => {
  const [healthPackages, setHealthPackages] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHealthCheckups = async () => {
      try {
        const response = await fetchHealthCheckupDetails();
        if (response && response.data) {
          setHealthPackages(response.data);
        }
      } catch (error) {
        console.error("Error fetching health checkup details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthCheckups();
  }, []);

  const handleApplyNow = (id) => {
    navigate(`/health-checkup-details/${id}`);
  };

  const handleAddToCompare = (pkg) => {
    if (compareList.length < 3 && !compareList.some((item) => item.checkup_id === pkg.checkup_id)) {
      setCompareList([...compareList, pkg]);
    } else if (compareList.some((item) => item.checkup_id === pkg.checkup_id)) {
      setCompareList(compareList.filter((item) => item.checkup_id !== pkg.checkup_id));
    } else {
      alert("You can only compare up to 3 packages.");
    }
  };

  const handleCompare = () => {
    if (compareList.length < 2) {
      alert("You need to select at least two packages to compare.");
      return;
    }
    const ids = compareList.map((pkg) => pkg.checkup_id);
    navigate("/health-checkup-comparison", { state: { ids } });
  };

  if (loading) {
    return <p>Loading health checkup packages...</p>;
  }

  return (
    <div>
      {/* Banner Section */}
      <section className="banner-spac">
        <div className="cust-container">
          <div className="banner-box">
            <img src="/assets/images/careerdetailban.jpg" alt="Health Checkups" />
            <div className="ban-con">
              <h1>Health Check Ups</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section about-host">
        <div className="cust-container">
          <h4>
            Prevention Begins with You: Stay Ahead of Disease with{" "}
            <span>Regular Check-Ups</span>.
          </h4>
        </div>
      </section>

      {/* Health Checkup Packages Section */}
      <section className="healthcheckup-sec">
        <div className="cust-container">
          <div className="row">
            {healthPackages.map((pkg) => (
              <div key={pkg.checkup_id} className="col-md-4">
                <div className="healthcheckup-card">
                  <img
                    src={`${baseImage_path}/${pkg.checkup_image || "default-image.jpg"}`}
                    alt={pkg.checkup_title}
                  />
                  <div className="healthcheckup-desc">
                    <p>{pkg.checkup_title}</p>
                    <span>Rs. {pkg.checkup_fees}/-</span>
                    <div className="healthcheckup-ctas">
                      <div
                        className={`healthcheckup-compare ${
                          compareList.some((item) => item.checkup_id === pkg.checkup_id) ? "selected" : ""
                        }`}
                        onClick={() => handleAddToCompare(pkg)}
                      >
                        {compareList.some((item) => item.checkup_id === pkg.checkup_id) ? "✓" : ""}
                        <span>Compare</span>
                      </div>
                      <button
                        className="btn with-color with-arr"
                        onClick={() => handleApplyNow(pkg.checkup_id)}
                      >
                        <img src={arrSvg} alt="Apply Now" /> Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare Dialog */}
      <Dialog
        open={isCompareDialogOpen || compareList.length > 0}
        onClose={() => setIsCompareDialogOpen(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogContent style={{ backgroundColor: "#0ca854", padding: "20px" }}>
          <h4 style={{ color: "#fff" }}>Compare Packages</h4>
          <div className="compare-items">
            {compareList.map((pkg) => (
              <div key={pkg.checkup_id} className="compare-item">
                <img
                  src={`${baseImage_path}/${pkg.checkup_image || "default-image.jpg"}`}
                  alt={pkg.checkup_title}
                  className="compare-img"
                />
                <div className="compare-details">
                  <p>{pkg.checkup_title}</p>
                  <span>Rs. {pkg.checkup_fees}/-</span>
                </div>
                <button
                  onClick={() => handleAddToCompare(pkg)}
                  className="compare-remove"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <Button
            variant="contained"
            style={{ marginTop: "10px", backgroundColor: "#fff", color: "#0ca854" }}
            onClick={handleCompare}
          >
            Compare Now
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HealthCheckup;
