import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { OrgRoutes, UserRoutes } from './routes';
import { HttpCode } from './utils';

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());


app.use('/auth', UserRoutes);
app.use('/api', OrgRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(HttpCode.OK).json({ message: 'Welcome to stage 2 server' })
});

app.all('*', (req: Request, res: Response) => {
  res.status(HttpCode.NOT_FOUND).json({ message: 'Invalid endpoint or method used, please check and try again' })
})

export default app;