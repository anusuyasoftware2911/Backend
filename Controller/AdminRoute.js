
const express = require("express");
const AdminSchema = require("../Model/AdminSchema");

const AdminRoute = express.Router();

AdminRoute.get("/", async (req, res) => {
  try {
    const data = await AdminSchema.find({});
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = AdminRoute;