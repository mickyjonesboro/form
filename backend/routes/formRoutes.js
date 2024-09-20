import { Router } from "express";
import { getLink, sendEmail } from "../controllers/formController.js";
const router = Router();

router.post("/send-email", sendEmail);
router.get("/get-link", getLink);
router.get("/ping", (req, res) => {
  return res.status(200).send("The server never sleeps");
});

export default router;
