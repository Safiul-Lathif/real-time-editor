import {
  AccountBoxTwoTone,
  CalendarMonth,
  CalendarMonthOutlined,
  CalendarTodayOutlined,
  CalendarTodayRounded,
  CardGiftcard,
  GifTwoTone,
  Inventory,
  Refresh,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import calenderIcon from "../../assets/calendar-line.png";

const PlanSection = ({ credits }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Card>
        <CardHeader>
          <div>
            Purchased Credits
            <PlanName>{credits.purchase.length}</PlanName>
          </div>
          <CrownContainer>
            <GifTwoTone />
          </CrownContainer>
        </CardHeader>
        <Validity>
          <img
            src={calenderIcon}
            alt="Calender Icon"
            style={{
              width: "20px",
              height: "20px",
              filter: "invert(56%) sepia(23%) saturate(4361%) hue-rotate(174deg) brightness(104%) contrast(87%)", /* Cyan */
            }} />
          --
        </Validity>
      </Card>

      <Card>
        <CardHeader>
          <div>
            Consumed Credits
            <PlanName>{credits.consumed_credits}</PlanName>
          </div>
          <CrownContainer>
            <Inventory />
          </CrownContainer>
        </CardHeader>
        <Validity>
          <img
            src={calenderIcon}
            alt="Calender Icon"
            style={{
              width: "20px",
              height: "20px",
              filter: "invert(56%) sepia(23%) saturate(4361%) hue-rotate(174deg) brightness(104%) contrast(87%)", /* Cyan */
            }} />
          --
        </Validity>
      </Card>
      <Card>
        <CardHeader>
          <div>
            Available Credits
            <PlanName>{credits.available_credits}</PlanName>
          </div>
          <CrownContainer>
            <Refresh />
          </CrownContainer>
        </CardHeader>
        <Validity>
          <img
            src={calenderIcon}
            alt="Calender Icon"
            style={{
              width: "20px",
              height: "20px",
              filter: "invert(56%) sepia(23%) saturate(4361%) hue-rotate(174deg) brightness(104%) contrast(87%)", /* Cyan */
            }} />
          Unlimited Validity
        </Validity>
      </Card>
      <Credits>
        Do you want more credits?
        <button
          className="upgrade-button"
          onClick={() => {
            navigate("/researchPickPricing");
          }}
        >
          Purchase
        </button>
      </Credits>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
  padding-bottom: 20px;
  padding-top: 10px;

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
  background: white; // Light grey background
  border-radius: 20px;
  padding: 20px;
  width: 220px; // Adjust as needed
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
  text-align: start;
`;

const Credits = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
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
  margin-top: 20px;
  margin-bottom: 15px;
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
  gap: 5px;
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
