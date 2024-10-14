import express, { Request, Response, NextFunction } from 'express'; // Assuming config has an `env` property
import globalErrorHandler from './middlewares/globalErrorHandler';
import userRouter from './user/userRouter';

const app = express();

// routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        

        res.json({message:"getting response"})
    } catch (err) {
        next(err); // Pass the error to the error-handling middleware
    }
});


app.use('/api/users' , userRouter)

// Error-handling middleware
app.use(
    globalErrorHandler
);

export default app;
