import express from 'express';
import simulationRoutes from './routes/survivalRoutes';
import dotenv from 'dotenv'

dotenv.config()
const {PORT} = process.env 
const app = express();
app.use(express.json());
app.use('/api', simulationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('You can use postman');
});
