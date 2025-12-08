import User from "../model/user.js";
import nodemailer from "nodemailer";


// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Update user info
export const updateUser = async (req, res, next) => {
  try {
    const { name, email, role, status } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, status },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Toggle active/inactive
export const toggleStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✔ If user is deactivated → send email
    if (status === "Inactive") {
      await sendDeactivationEmail(user.email, user.name);
    }

    res.json({ message: "Status updated", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const sendDeactivationEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Your Account Has Been Deactivated",
    html: `
      <h2>Hello ${name},</h2>
      <p>Your account has been <strong>deactivated</strong> by the admin.</p>
      <p>If you think this is a mistake, please contact support.</p>
      <br/>
      <p>— Admin Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
