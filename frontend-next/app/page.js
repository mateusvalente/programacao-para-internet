'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';

const initialForm = { id: null, name: '', price: '', description: '' };

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');

  async function loadProducts() {
    const data = await apiRequest('/products');
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function editProduct(product) {
    setForm({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description || ''
    });
  }

  async function saveProduct(event) {
    event.preventDefault();

    const payload = {
      name: form.name,
      price: Number(form.price),
      description: form.description
    };

    if (form.id) {
      await apiRequest(`/products/${form.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      setMessage('Produto atualizado com sucesso.');
    } else {
      await apiRequest('/products', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      setMessage('Produto cadastrado com sucesso.');
    }

    setForm(initialForm);
    await loadProducts();
  }

  async function deleteProduct(id) {
    await apiRequest(`/products/${id}`, { method: 'DELETE' });
    setMessage('Produto removido com sucesso.');
    await loadProducts();
  }

  return (
    <main className="page">
      <h1>CRUD de Produtos - Next.js</h1>

      <form className="card" onSubmit={saveProduct}>
        <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Nome do produto" required />
        <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" placeholder="Preço" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" />
        <div className="actions">
          <button type="submit">{form.id ? 'Atualizar' : 'Cadastrar'}</button>
          {form.id ? <button type="button" className="secondary" onClick={() => setForm(initialForm)}>Cancelar</button> : null}
        </div>
      </form>

      {message ? <p className="message">{message}</p> : null}

      <div className="list">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h3>{product.name}</h3>
            <p><strong>Preço:</strong> R$ {Number(product.price).toFixed(2)}</p>
            <p>{product.description || 'Sem descrição'}</p>
            <div className="actions">
              <button type="button" onClick={() => editProduct(product)}>Editar</button>
              <button type="button" className="danger" onClick={() => deleteProduct(product.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
