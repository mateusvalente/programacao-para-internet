import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
const PORT = Number(process.env.PORT || 3000);

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origin não permitida pelo CORS'));
  }
}));

app.use(express.json());

app.get('/health', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json({ status: 'ok', database: rows[0]?.ok === 1 ? 'connected' : 'unknown' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/products', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar produtos', error: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || price === undefined || price === null || Number.isNaN(Number(price))) {
      return res.status(400).json({ message: 'Campos name e price são obrigatórios' });
    }

    const [result] = await pool.query(
      'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
      [name, Number(price), description || null]
    );

    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
    return res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    if (!name || price === undefined || price === null || Number.isNaN(Number(price))) {
      return res.status(400).json({ message: 'Campos name e price são obrigatórios' });
    }

    const [result] = await pool.query(
      'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
      [name, Number(price), description || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    return res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao remover produto', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
