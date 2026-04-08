CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO products (name, price, description) VALUES
('Notebook Pro', 4999.90, 'Exemplo inicial de produto.'),
('Mouse Gamer', 149.90, 'Outro produto para testar o CRUD.'),
('Monitor 27', 1299.00, 'Produto de demonstração.');
