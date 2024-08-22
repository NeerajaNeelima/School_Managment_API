const db = require('../config/db');


exports.addSchool = async (req, res) => {
    const { name, address, lattitude, longitude } = req.body;
    
    if (!name || !address || typeof lattitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    console.log(name, address, lattitude, longitude)
    try {
        await db.query('INSERT INTO schoos (name, address, lattitude, longitude) VALUES (?, ?, ?, ?)', 
            [name, address, lattitude, longitude]);

        res.status(201).json({ message: 'School added successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.listSchools = async (req, res) => {
    const { lattitude, longitude } = req.query;

    try {
        const [schoos] = await db.query('SELECT * FROM schoos');

        // Calculate distance and sort by proximity
        const sortedSchools = schoos.map(school => {
            const distance = Math.sqrt(Math.pow(lattitude - school.lattitude, 2) + Math.pow(longitude - school.longitude, 2));
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};
