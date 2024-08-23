const db = require('../config/db');


exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    
    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    console.log(name, address, latitude, longitude)
    try {
        await db.query('INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)', 
            [name, address, latitude, longitude]);

        res.status(201).json({ message: 'School added successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    try {
        const [schools] = await db.query('SELECT * FROM schools');

        // Calculate distance and sort by proximity
        const sortedSchools = schools.map(school => {
            const distance = Math.sqrt(Math.pow(latitude - school.latitude, 2) + Math.pow(longitude - school.longitude, 2));
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};
