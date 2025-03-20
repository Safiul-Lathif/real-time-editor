import React, { useEffect, useState } from "react";
import "./ResearchPickPricing.css"; // Create a CSS file for styling
import Header from "../../components/header/Header";
import visaIcon from "../../assets/all_payment.png";
import PayPalCheckout from "../../components/PayPal";
import ExpandableGrid from "../../sample";

function ResearchPickPricing() {
  const [packageDetails, setPackageDetails] = useState([]);
  const [showPayPal, setShowPayPal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageId, setPackageId] = useState(null);
  useEffect(() => {
    const fetchPackageDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://pocapi.researchpick.com/api/packagedetails",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setPackageDetails(data.package_details);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackageDetails();
  }, []);

  return (
    <div >
      <div>
        <Header />
        <div style={{ position: "absolute", top: 120, left: 0, width: "100%", color: "white" }}>
          ResearchPick plans and pricing
        </div>
      </div>
      <div className="pricing-page">
        <div className="intro">
          <h1>Get the best ResearchPick experience</h1>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "500",
              letterSpacing: "0.5px",
            }}
          >
            We have several powerful plans for everyone - from individual
            students and researchers, to large businesses and universities.
            Everything you need.
          </p>
        </div>
        <div className="content">
          <div className="plans ">
            {packageDetails.map((packageDetail, index) => (
              <div
                key={index}
                className={`plan ${packageDetail.package_name
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {packageDetail.package_name}
                  </div>
                  {packageDetail.package_name
                    .toLowerCase()
                    .replace(/\s/g, "-") === "super-pro" ? (
                    <div className="save-badge">Save $10</div>
                  ) : (
                    <></>
                  )}
                </div>
                <ul>
                  {packageDetail.package_description.map(
                    (packageDetail, index) => (
                      <li key={index}>
                        <span role="img" aria-label="check">
                          ✓
                        </span>{" "}
                        {packageDetail}
                      </li>
                    )
                  )}
                  {packageDetails
                    .filter(
                      (packageDetail) =>
                        packageDetail.package_name
                          .toLowerCase()
                          .replace(/\s/g, "-") === "super-pro"
                    )[0]
                    .package_description.filter(
                      (item) =>
                        !packageDetail.package_description.includes(item)
                    )
                    .map((packageDetail, index) => (
                      <li key={index} className="cross">
                        <span role="img" aria-label="cross">
                          ✗
                        </span>{" "}
                        {packageDetail}
                      </li>
                    ))}
                </ul>
                {packageDetail.amount === 0 ? (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="price">$0</div>
                      <div className="validity">14 days valid</div>
                    </div>
                    <button className="current-plan-button">
                      Current Plan
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="price">${packageDetail.amount}</div>
                    {
                      (showPayPal && selectedPackage === packageDetail.package_name) ?

                        (<PayPalCheckout amount={`${packageDetail.amount}`} package_id={packageDetail.package_id} />) : (<button
                          className={`buy-button ${packageDetail.package_name
                            .toLowerCase()
                            .replace(/\s/g, "-") === "super-pro" ? "active" : ""} `}
                          onClick={() => {
                            setShowPayPal(true);
                            setSelectedPackage(packageDetail.package_name);
                          }}
                        >
                          Buy
                        </button>)}
                  </div>
                )}
              </div>
            ))}

            <div className="plan institution">
              <h3>Institution</h3>
              <p>
                Site-wide access available for large institutions and
                organizations.
              </p>
              <p>
                For better solutions please contact us for customized pricing
                based on your need.
              </p>
              <button className="contact-button">Contact</button>
            </div>
          </div>
          <div className="footer">
            <p>
              All prices displayed are in DOLLAR. Prices may be subject to
              additional VAT, depending on your country.
            </p>
            <div className="payment-icons">
              <img src={visaIcon} alt="Visa" />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ResearchPickPricing;
