const dbConnection = require("../../util/database");

exports.postAddBrand=(req, res, next) => {
    const { name, website_link, owner_name } = req.body;
    const sql = 'INSERT INTO brands (name, website_link, owner_name) VALUES (?, ?, ?)';
    dbConnection.query(sql, [name, website_link, owner_name], (err, result) => {
      if (err) {
        console.error('Error creating brand:', err);
        res.status(500).json({ error: 'Error creating brand' });
      } else {
        res.status(201).json({ message: 'brand created successfully' });
      }
    });
};

exports.getBrands=(req, res, next) => {
    const sql = 'SELECT * FROM brands';
    dbConnection.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching brands:', err);
        res.status(500).json({ error: 'Error fetching brands' });
      } else {
        res.status(200).json(results);
      }
    });
};

exports.getBrand=(req, res, next) => {
    const { id } = req.body;
    const sql = 'SELECT * FROM brands WHERE id = ?';
    dbConnection.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Error fetching brand:', err);
        res.status(500).json({ error: 'Error fetching brand' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'brnad not found' });
      } else {
        res.status(200).json(results[0]);
      }
    });
};


exports.updateBrand=(req, res, next) => {
    const { name, website_link, owner_name, id } = req.body;
    const sql = 'UPDATE brands SET name = ?, website_link = ?, owner_name = ?  WHERE id = ?';
    dbConnection.query(sql, [name, website_link, owner_name, id], (err, result) => {
      if (err) {
        console.error('Error updating brand:', err);
        res.status(500).json({ error: 'Error updating brand' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'brand not found' });
      } else {
        res.status(200).json({ message: 'brand Update Successfully'});
      }
    });
};

exports.deleteBrand=(req, res, next) => {
    const { id } = req.body;
    const sql = 'Delete FROM  brands WHERE id = ?';
    dbConnection.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting brand:', err);
        res.status(500).json({ error: 'Error deleting brand' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'brand not found' });
      } else {
        res.status(200).json({ message: 'brand deleted Successfully'});
      }
    });
};