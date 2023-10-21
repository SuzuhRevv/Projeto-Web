import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/users', routes);

app.listen(7373, () => console.log('Server is running on port 7373'));