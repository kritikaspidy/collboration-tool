const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tasksRouter = require('./controllers/task.js');
const projectsRouter = require('./controllers/projectController.js');

require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);
app.use('/api/projects', projectsRouter);

//mongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!'))
.catch((err) => console.log(err));

// Basic route
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


