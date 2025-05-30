# Web Project Around Auth 🛡️

Projeto backend com autenticação JWT, desenvolvido em Node.js com Express e MongoDB. Esta API permite cadastro, login, proteção de rotas, e operações básicas de CRUD para usuários.

## 🚀 Funcionalidades

* Cadastro de usuários com senha criptografada
* Autenticação com JWT (login)
* Proteção de rotas com middleware
* Validações com Celebrate/Joi
* Armazenamento de dados em MongoDB
* Middleware de erros personalizado

## 🛠️ Tecnologias

* Node.js
* Express
* MongoDB + Mongoose
* JWT (`jsonwebtoken`)
* BcryptJS
* Celebrate (validação)
* Dotenv
* ESLint (padronização)
* Nodemon (dev server)

## 📦 Instalação

### Pré-requisitos

* Node.js v16+
* MongoDB local ou Atlas
* Git

### Passos

```bash
# Instale as dependências
npm install

# Crie um arquivo .env com o seguinte conteúdo:
```

```env
PORT=3000
JWT_SECRET=sua_chave_secreta
MONGO_URL=mongodb://localhost:27017/around_auth
```

```bash
# Inicie o servidor em modo desenvolvimento
npm run dev
```

> A API será iniciada em: [http://localhost:3000](http://localhost:3000)

---

## 📮 Endpoints principais

| Método | Rota      | Descrição              | Protegida |
| ------ | --------- | ---------------------- | --------- |
| POST   | /signup   | Registro de usuário    | ❌         |
| POST   | /signin   | Login de usuário       | ❌         |
| GET    | /users/me | Info do usuário logado | ✅         |

---

## 📁 Estrutura do Projeto

```
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
├── .env (não versionado)
└── package.json
```

---

## 🧪 Testando com Postman

### Cadastro

```http
POST /signup
Content-Type: application/json

{
  "name": "João",
  "email": "joao@email.com",
  "password": "12345678"
}
```

### Login

```http
POST /signin
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "12345678"
}
```

### Rota protegida

```http
GET /users/me
Authorization: Bearer <token>
```

---

