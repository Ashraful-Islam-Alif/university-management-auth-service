import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
// app.use('/api/v1/users/', UserRouter);
// app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes);
app.use('/api/v1/', router);

//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Unhandled Promise Rejection')
// })

// global error handler
app.use(globalErrorHandler);

export default app;
