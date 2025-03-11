import {
  AccountBoxTwoTone,
  CardGiftcard,
  GifTwoTone,
  Inventory,
  Refresh,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";

const PlanSection = () => {
  return (
    <Container>
      <PlanCard>
        <CardHeader>
          <div>
            Your Plan
            <PlanName>Free</PlanName>
          </div>
          <CrownContainer>
            <GifTwoTone />
          </CrownContainer>
        </CardHeader>
        <Validity>
          <CalendarIcon />
          Valid for 14 days
        </Validity>
      </PlanCard>

      <CreditCard>
        <CardHeader>
          <div>
            Available Credits
            <PlanName>02</PlanName>
          </div>
          <CrownContainer>
            <Inventory />
          </CrownContainer>
        </CardHeader>
        <Validity>
          <CalendarIcon />
          Valid for 14 days
        </Validity>
      </CreditCard>

      <ConsumeCard>
        <CardHeader>
          <div>
            Consumed Credits
            <PlanName>01</PlanName>
          </div>
          <CrownContainer>
            <Refresh />
          </CrownContainer>
        </CardHeader>
        <Validity>
          <CalendarIcon />
          Valid for 14 days
        </Validity>
      </ConsumeCard>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
  padding: 20px;
`;
const CrownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(78, 90, 219, 0.2);
  margin-right: 10px;
`;

const Card = styled.div`
  background: #f8f9fa; // Light grey background
  border-radius: 8px;
  padding: 20px;
  width: 200px; // Adjust as needed
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const PlanCard = styled(Card)`
  /* Add specific styles for the plan card */
  text-align: left;
`;

const CreditCard = styled(Card)`
  /* Add specific styles for the credit card */
  text-align: left;
`;

const ConsumeCard = styled(Card)`
  /* Add specific styles for the consume card */
  text-align: left;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  margin-bottom: 20px;
  align-items: start;
`;

const PlanName = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 5px;
  align-items: start;
`;

const CreditCount = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ConsumeCount = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Validity = styled.div`
  display: flex;
  align-items: end;
  justify-content: start;
  color: #6c757d; // Grey color
`;

const PurchasesTitle = styled.div`
  font-weight: bold;
  margin-top: 20px;
  width: 100%;
`;

// Placeholder Icons (Replace with your actual icons)
const CrownIcon = styled.span`
  /* Replace with your crown icon */
  &:before {
    content: "👑";
  }
`;

const CubeIcon = styled.span`
  /* Replace with your cube icon */
  &:before {
    content: "📦";
  }
`;

const CalendarIcon = styled.span`
  /* Replace with your calendar icon */
  &:before {
    content: "📅";
  }
`;

export default PlanSection;
