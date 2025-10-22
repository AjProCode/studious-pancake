import express from 'express';
import { json } from 'body-parser';
import { routes } from './routes'; // Assuming you will create a routes file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api', routes); // Assuming you will define your routes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});