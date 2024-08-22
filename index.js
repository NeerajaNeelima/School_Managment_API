const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const testToken = 'Bearer test-token-123'; // Your test token

//     if (authHeader !== testToken) {
//         return res.status(401).json({ error: 'Authentication required' });
//     }
//     next();
// });


app.use('/api', schoolRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
