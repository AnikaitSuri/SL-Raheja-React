import React from "react";

const HealthCheckupComparison = () => {
  return (
    <div>
      {/* Banner Section */}
      <section className="banner-spac">
        <div className="cust-container">
          <div className="banner-box">
            <img
              src="assets/images/careerdetailban.jpg"
              alt="Health Checkup Packages"
            />
            <div className="ban-con">
              <h1>Health Check Up Packages Comparison</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Test Names Section */}
      <section className="testnames-sec">
        <div className="cust-container">
          <div className="testname-sec-inner">
            <div className="testname-head">
              <p>Tests Names</p>
            </div>
            <div className="testname-item-list">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="testname-items">
                  <div className="testitem-img">
                    <img
                      src="assets/images/healthcheckup/healthdetl.jpg"
                      alt="Health Detail"
                    />
                    <button>X</button>
                  </div>
                  <div className="testitem-desc">
                    <h5>Comprehensive Health Package – Male</h5>
                    <span>Rs. 8000/-</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Health Comparison Table */}
      <section className="health-compare-table mrgntop70 margnbot90">
        <div className="cust-container">
          <div className="health-compare-table-inner">
            <table>
              <thead>
                <tr>
                  <th></th>
                  {[1, 2, 3].map((_, index) => (
                    <th key={index}>
                      <div className="jdapplybtn">
                        <a href="javascript::" className="btn with-color with-arr">
                          <img src="assets/images/arrw.svg" alt="Arrow" />
                          Book Now
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    category: "Diabetes Risk Evaluation",
                    tests: [
                      "Blood Sugar Fasting",
                      "Blood Sugar PP",
                      "HbA1C",
                    ],
                  },
                  {
                    category: "Lipid Profile",
                    tests: [
                      "Total Cholesterol",
                      "HDL Cholesterol",
                      "LDL Cholesterol",
                      "VLDL",
                      "Triglycerides",
                      "Total Cholesterol / HDL Ratio",
                    ],
                  },
                ].map((section, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <th>
                        <h5>{section.category}</h5>
                      </th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                    {section.tests.map((test, testIndex) => (
                      <tr key={testIndex}>
                        <td>
                          <p>{test}</p>
                        </td>
                        {[1, 2, 3].map((_, colIndex) => (
                          <td key={colIndex}>
                            {colIndex === testIndex % 3 && (
                              <img
                                src="assets/images/healthcheckup/righttick.svg"
                                alt="Right Tick"
                              />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthCheckupComparison;