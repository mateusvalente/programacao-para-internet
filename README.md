# CRUD completo com Docker + MySQL + phpMyAdmin + Node/Express + Vue + Angular + Next.js

Este projeto contém:

- **MySQL 8**
- **phpMyAdmin** ligado ao MySQL
- **Backend** em **Node.js + Express**
- **3 frontends de exemplo** consumindo a mesma API:
  - Vue
  - Angular
  - Next.js

## Estrutura

- `mysql/` → script inicial do banco
- `backend/` → API CRUD
- `frontend-vue/` → exemplo em Vue
- `frontend-angular/` → exemplo em Angular
- `frontend-next/` → exemplo em Next.js
- `docker-compose.yml` → orquestra tudo

## Recurso do CRUD

O CRUD foi feito sobre a tabela **products** com os campos:

- `id`
- `name`
- `price`
- `description`

## Como subir

```bash
docker compose up --build
```

## Acessos

- **Backend API:** `http://localhost:3000`
- **phpMyAdmin:** `http://localhost:8080`
- **Vue:** `http://localhost:5173`
- **Angular:** `http://localhost:4200`
- **Next.js:** `http://localhost:3001` 

## Credenciais do banco

### MySQL

- Host: `mysql`
- Porta: `3306`
- Banco: `crud_db`
- Usuário: `crud_user`
- Senha: `crud_pass`

### phpMyAdmin

- Servidor: `mysql`
- Usuário: `root`
- Senha: `root`

## Endpoints da API

- `GET /health`
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

## Exemplo de payload

```json
{
  "name": "Teclado Mecânico",
  "price": 299.90,
  "description": "Switch blue"
}
```

## Observações

Os três frontends usam a mesma API do backend.
