import express from "express";
import { submitContact } from "./contact.controller";


const router = express.Router();

router.post("/send", submitContact);

export const contactRouter = router;