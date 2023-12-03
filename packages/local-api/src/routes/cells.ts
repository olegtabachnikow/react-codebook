import express from 'express';
import fs from 'fs';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

interface LocalApiError {
  code: string;
}

function isLocalApiError(err: any): err is LocalApiError {
  return typeof err.code === 'string';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    let data;
    try {
      const result = fs.readFileSync(fullPath, { encoding: 'utf-8' });
      data = JSON.parse(result);
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === 'ENOENT') {
          fs.writeFileSync(fullPath, '[]', 'utf-8');
          data = [];
        }
      } else {
        if (err instanceof Error) res.status(500).send({ error: err.message });
        throw err;
      }
    }
    res.send(data);
  });

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    try {
      await fs.writeFileSync(fullPath, JSON.stringify(cells), 'utf-8');
      res.send({ status: 'ok' });
    } catch (err) {
      console.log(err);
    }
  });

  return router;
};
