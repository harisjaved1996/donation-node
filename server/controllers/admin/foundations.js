const dbConnection = require("../../util/database");

exports.postAddFoundation=(req, res, next) => {
    const { name, website_link, owner_name } = req.body;
    const sql = 'INSERT INTO foundations (name, website_link, owner_name) VALUES (?, ?, ?)';
    dbConnection.query(sql, [name, website_link, owner_name], (err, result) => {
      if (err) {
        console.error('Error creating foundation:', err);
        res.status(500).json({ error: 'Error creating foundation' });
      } else {
        res.status(201).json({ message: 'foundation created successfully' });
      }
    });
};

exports.getFoundations=(req, res, next) => {
    const sql = 'SELECT * FROM foundations';
    dbConnection.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching foundation:', err);
        res.status(500).json({ error: 'Error fetching foundation' });
      } else {
        res.status(200).json(results);
      }
    });
};

exports.getFoundation=(req, res, next) => {
    const { id } = req.body;
    const sql = 'SELECT * FROM foundations WHERE id = ?';
    dbConnection.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Error fetching Foundations:', err);
        res.status(500).json({ error: 'Error fetching foundations' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Foundation not found' });
      } else {
        res.status(200).json(results[0]);
      }
    });
};


exports.updateFoundation=(req, res, next) => {
    const { name, website_link, owner_name, id } = req.body;
    const sql = 'UPDATE foundations SET name = ?, website_link = ?, owner_name = ?  WHERE id = ?';
    dbConnection.query(sql, [name, website_link, owner_name, id], (err, result) => {
      if (err) {
        console.error('Error updating foundation:', err);
        res.status(500).json({ error: 'Error updating foundation' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'foundation not found' });
      } else {
        res.status(200).json({ message: 'foundation Update Successfully'});
      }
    });
};

exports.deleteFoundation=(req, res, next) => {
    const { id } = req.body;
    const sql = 'Delete FROM  foundations WHERE id = ?';
    dbConnection.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting foundation:', err);
        res.status(500).json({ error: 'Error deleting foundation' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'foundation not found' });
      } else {
        res.status(200).json({ message: 'foundation deleted Successfully'});
      }
    });
};