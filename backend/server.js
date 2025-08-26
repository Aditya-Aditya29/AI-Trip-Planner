const express = require('express');
const cors = require('cors');

// Importing the trip router
const tripRouter = require('./routes/tripRoutes');



const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/trips',tripRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));
