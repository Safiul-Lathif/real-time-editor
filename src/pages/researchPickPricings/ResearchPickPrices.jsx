import React from "react";
import "./ResearchPickPricing.css"; // Create a CSS file for styling
import Header from "../../components/header/Header";
import visaIcon from "../../assets/all_payment.png";
import masterCardIcon from "../../assets/mastercard.png";
import paypalIcon from "../../assets/paypal.png";

function ResearchPickPricing() {
  return (
    <div className="pricing-page">
      <div
        style={{
          backgroundColor: "rgb(91, 3, 91)",
        }}
      >
        <Header />
        <div className="page-title">ResearchPick plans and pricing</div>
      </div>
      {/* <div className="content">
        <div className="intro">
          <h1>Get the best ResearchPick experience</h1>
          <p>
            We have several powerful plans for everyone - from individual
            students and researchers, to large businesses and universities.
            Everything you need.
          </p>
        </div>

        <div className="plans">
          <div className="plan trial">
            <h3>Trial</h3>
            <ul>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                1 Article
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Content Editor
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Real time Collaboration
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Track Changes
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Word Export
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Publisher specific predefined alerts
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Unlimited validity
              </li>
              <li>
                <span role="img" aria-label="cross">
                  ✗
                </span>{" "}
                Pre-Submission Review
              </li>
              <li>
                <span role="img" aria-label="cross">
                  ✗
                </span>{" "}
                End-to-end Submission Service
              </li>
            </ul>
            <div className="price">$0</div>
            <div className="validity">14 days valid</div>
            <button className="current-plan-button">Current Plan</button>
          </div>

          <div className="plan pro">
            <h3>Pro</h3>
            <ul>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                1 Article
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Content Editor
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Real time Collaboration
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Track Changes
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Word Export
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Publisher specific predefined alerts
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Unlimited validity
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Pre-Submission Review
              </li>
              <li>
                <span role="img" aria-label="cross">
                  ✗
                </span>{" "}
                End-to-end Submission Service
              </li>
            </ul>
            <div className="price">$79</div>
            <button className="buy-button">Buy</button>
          </div>

          <div className="plan super-pro">
            <div className="save-badge">Save $10</div>
            <h3>Super Pro</h3>
            <ul>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                1 Article
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Content Editor
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Real time Collaboration
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Track Changes
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Word Export
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Publisher specific predefined alerts
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Unlimited validity
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                Pre-Submission Review
              </li>
              <li>
                <span role="img" aria-label="check">
                  ✓
                </span>{" "}
                End-to-end Submission Service
              </li>
            </ul>
            <div className="price">$99</div>
            <button className="buy-button">Buy</button>
          </div>

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
        </div> */}

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
    // </div>
  );
}

export default ResearchPickPricing;
