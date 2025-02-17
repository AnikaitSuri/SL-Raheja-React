import React from "react";
import corpBanner from "../assets/images/spciallites/speciban.jpg";
import { baseImage_path } from '../variables/Variables';


const AcTpas = () => {
  // Data for Corporates and TPAs
  const corporates = [
    "Airport Authority Of India",
    "Bank Of India",
    "Bharat Heavy Electricals Ltd. (BHEL)",
    "Bharat Petroleum Corp. Ltd. (BPCL)",
    "Hindustan Petroleum Corp. Ltd.",
    "IDBI Bank",
    "Indian Oil Corporation Limited (IOCL)",
    "Mazagon Dock Ltd",
    "Mumbai Metropolitan Region Development Authority (MMRDA)",
    "Mahanagar Telephone Nigam Limited (MTNL)",
    "NABARD",
    "ONGC",
    "Power System Operation Corporation (POSOCO)",
    "Rail Vikas Nigam Limited",
    "Reserve Bank Of India (RBI)",
    "Small Industries Development Bank of India (SIDBI)",
    "State Bank Of India",
  ];

  const tpasAndInsurance = [
    "National Insurance Company Limited",
    "The Oriental Insurance Company Limited",
    "The New India Assurance Company Limited",
    "United India Insurance Company Limited",
    "Aditya Birla Health Insurance Company Limited",
    "Bajaj Allianz General Insurance Company Limited",
    "Care Health Insurance Limited",
    "Cholamandalam MS General Insurance Company Limited",
    "Cigna TTK Health Insurance Company Limited",
    "Future Generali India Insurance Company Limited",
    "Go Digit General Insurance Limited",
    "HDFC ERGO General Insurance Company Limited",
    "ICICI Lombard General Insurance Company Limited",
    "ICICI Prudential Life Insurance Company Limited",
    "IFFCO-Tokio General Insurance Company Limited",
    "Liberty General Insurance Limited",
    "ManipalCigna Health Insurance Company Limited",
  ];

  return (
    <>
      {/* Banner Section */}
      <section className="banner-spac">
        <div className="cust-container">
          <div className="banner-box">
            <img src={corpBanner} alt="Banner" />
            <div className="ban-con">
              <h1>Associated Corporates, TPAs & Insurance Companies</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Corporates & TPAs Section */}
      <section className="asso-cor-tps-sec mrgntop70 margnbot90">
        <div className="cust-container">
          <div className="row">
            {/* List of Corporates */}
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
              <div className="asso-cor-tps-sec-item">
                <p>List of Corporates:</p>
                <ul className="level1">
                  {/* {corporates && corporates.map((corporate, index) => (
                    <li key={index}>{corporate}</li>
                  ))} */}
                  <li>Airport Authority Of India</li>
                  <li>Bank Of India</li>
                  <li>Bharat Heavy Electricals Ltd. (BHEL)</li>
                  <li>Bharat Petroleum Corp. Ltd. (BPCL)</li>
                  <li>Hindustan Petroleum Corp. Ltd.</li>
                  <li>IDBI Bank</li>
                  <li>Indian Oil Corporation Limited (IOCL)</li>
                  <li>Mazagon Dock Ltd</li>
                  <li>Mumbai Metropolitan Region Development Authority (MMRDA)</li>
                  <li>Mahanagar Telephone Nigam Limited (MTNL)</li>
                  <li>NABARD</li>
                  <li>ONGC</li>
                  <li>Power System Operation Corporation (POSOCO)</li>
                  <li>Rail Vikas Nigam Limited </li>
                  <li>Reserve Bank Of India (RBI)</li>
                  <li>Small Industries Development Bank of India (SIDBI)</li>
                  <li>State Bank Of India</li>
                </ul>
              </div>
            </div>

            {/* List of TPAs & Insurance Companies */}
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
              <div className="asso-cor-tps-sec-item">
                <p>List of TPAs & Insurance Companies:</p>
                <ul className="level1">
                  {tpasAndInsurance.map((tpa, index) => (
                    <li key={index}>{tpa}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Note Section */}
          <div className="asso-corpnote">
            <p>
              The empanelment list is for reference only. Please verify the current status with
              your Corporate/Insurance Company/TPA before admission. For assistance, call{" "}
              <strong>022-66529612 (TPA Helpdesk)</strong> or email{" "}
              <a href="mailto:tpacell@rahejahospital.com">tpacell@rahejahospital.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AcTpas;
