// src/server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import mathRoutes from './routes/mathRoutes';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 
app.use('/api/math', mathRoutes); 

app.get('/', (req: Request, res: Response) => {
    res.send('Function Calculator Backend is running');
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;