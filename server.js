const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const DATA_FILE = "./data.json";

// Read data.json
app.get("/data", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });
        res.json(JSON.parse(data));
    });
});

// Write to data.json
app.post("/data", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });

        let jsonData = JSON.parse(data);
        jsonData.users.push(req.body);

        fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 4), (err) => {
            if (err) return res.status(500).json({ error: "Error writing file" });
            res.json({ message: "Data added successfully" });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
