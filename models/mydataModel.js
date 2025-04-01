const pool = require("../database");

async function getAllData() {
    const result = await pool.query("SELECT * FROM mydata");
    return result.rows;
}

async function addData(key, value) {
    await pool.query(
        "INSERT INTO mydata (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2",
        [key, value]
    );
}

async function deleteData(key) {
    await pool.query("DELETE FROM mydata WHERE key = $1", [key]);
}

module.exports = { getAllData, addData, deleteData };
