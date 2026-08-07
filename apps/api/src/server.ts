import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Chris Save API Engine' });
});

app.listen(4000, () => console.log('Chris Save API listening on port 4000'));
