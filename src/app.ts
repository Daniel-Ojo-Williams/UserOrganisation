import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import { OrgRoutes, UserRoutes } from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());


app.use('/auth', UserRoutes);
app.use('/api', OrgRoutes);


const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
});




