const express = require("express");
const { getAllData, addData, deleteData } = require("../models/mydataModel");

const router = express.Router();

// ✅ Get all data
router.get("/", async (req, res) => {
    try {
        const data = await getAllData();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// ✅ Add new data
router.post("/", async (req, res) => {
    try {
        const { key, value } = req.body;
        await addData(key, value);
        res.send("Data Added");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// ✅ Delete data
router.delete("/:key", async (req, res) => {
    try {
        const { key } = req.params;
        await deleteData(key);
        res.send("Data Deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
