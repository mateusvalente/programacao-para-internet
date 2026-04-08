<template>
  <div class="page">
    <h1>CRUD de Produtos - Vue</h1>

    <form class="card" @submit.prevent="saveProduct">
      <input v-model="form.name" type="text" placeholder="Nome do produto" required />
      <input v-model="form.price" type="number" step="0.01" placeholder="Preço" required />
      <textarea v-model="form.description" placeholder="Descrição"></textarea>
      <div class="actions">
        <button type="submit">{{ form.id ? 'Atualizar' : 'Cadastrar' }}</button>
        <button v-if="form.id" type="button" class="secondary" @click="resetForm">Cancelar</button>
      </div>
    </form>

    <p v-if="message" class="message">{{ message }}</p>

    <div class="list">
      <div v-for="item in products" :key="item.id" class="card product">
        <h3>{{ item.name }}</h3>
        <p><strong>Preço:</strong> R$ {{ Number(item.price).toFixed(2) }}</p>
        <p>{{ item.description || 'Sem descrição' }}</p>
        <div class="actions">
          <button type="button" @click="editProduct(item)">Editar</button>
          <button type="button" class="danger" @click="deleteProduct(item.id)">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { request } from '../services/api';

const products = ref([]);
const message = ref('');

const form = reactive({
  id: null,
  name: '',
  price: '',
  description: ''
});

function resetForm() {
  form.id = null;
  form.name = '';
  form.price = '';
  form.description = '';
}

async function loadProducts() {
  products.value = await request('/products');
}

function editProduct(item) {
  form.id = item.id;
  form.name = item.name;
  form.price = item.price;
  form.description = item.description || '';
}

async function saveProduct() {
  const payload = {
    name: form.name,
    price: Number(form.price),
    description: form.description
  };

  if (form.id) {
    await request(`/products/${form.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    message.value = 'Produto atualizado com sucesso.';
  } else {
    await request('/products', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    message.value = 'Produto cadastrado com sucesso.';
  }

  resetForm();
  await loadProducts();
}

async function deleteProduct(id) {
  await request(`/products/${id}`, { method: 'DELETE' });
  message.value = 'Produto removido com sucesso.';
  await loadProducts();
}

onMounted(loadProducts);
</script>

<style scoped>
* { box-sizing: border-box; }
body { margin: 0; }
.page { max-width: 900px; margin: 0 auto; padding: 24px; font-family: Arial, sans-serif; }
.card { background: #fff; border: 1px solid #ddd; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
input, textarea, button { width: 100%; padding: 12px; margin-top: 10px; border-radius: 8px; border: 1px solid #ccc; }
textarea { min-height: 90px; resize: vertical; }
button { cursor: pointer; border: none; background: #2b6cb0; color: #fff; font-weight: bold; }
button.secondary { background: #718096; }
button.danger { background: #c53030; }
.actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
.list { display: grid; gap: 16px; }
.product h3 { margin: 0 0 8px; }
.message { background: #ebf8ff; border: 1px solid #90cdf4; padding: 12px; border-radius: 8px; }
</style>
