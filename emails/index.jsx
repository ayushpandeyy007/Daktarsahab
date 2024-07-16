import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const EmailTemplate = ({
  patientName = "Ayush",
  appointmentDate = "July 20, 2024",
  appointmentTime = "2:30 PM",
}) => (
  <Html>
    <Head />
    <Preview>Your appointment with DaktarSahab has been confirmed.</Preview>
    <Body style={main}>
      <Container style={container}>
        <h1>DaktarSahab</h1>
        <Text style={paragraph}>Dear {patientName},</Text>
        <Text style={paragraph}>
          Your appointment with DaktarSahab has been successfully booked. We're
          looking forward to providing you with excellent healthcare service.
        </Text>
        <Text style={paragraph}>
          Appointment Details:
          <br />
          Date: {appointmentDate}
          <br />
          Time: {appointmentTime}
        </Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href="https://daktarsahab.vercel.app/my-booking"
          >
            View Appointment
          </Button>
        </Section>
        <Text style={paragraph}>
          If you need to reschedule or cancel your appointment, please do so at
          least 24 hours in advance.
        </Text>
        <Text style={paragraph}>
          Best regards,
          <br />
          The DaktarSahab Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          DaktarSahab - meet and treat
          <br />
          Kathmandu, Nepal
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#007bff",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
