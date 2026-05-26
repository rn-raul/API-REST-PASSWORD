# 🔐 API REST Password

Uma API REST moderna desenvolvida em **TypeScript** com **Fastify**, que fornece um sistema seguro de gerenciamento de usuários e senhas. Este projeto implementa autenticação com JWT, hashing de senhas com Argon2 e utiliza SQLite como banco de dados.

## ✨ Características

- ✅ **Autenticação JWT** - Tokens seguros para autenticação de usuários
- 🔒 **Hashing de Senhas** - Implementação com Argon2 para máxima segurança
- 📊 **Banco de Dados** - SQLite com migrations via Knex.js
- ⚡ **Performance** - Framework Fastify para requisições rápidas
- 📝 **TypeScript** - Tipagem estática para maior confiabilidade
- 🍪 **Cookies** - Gerenciamento de cookies com Fastify
- ✔️ **Validação** - Validação de dados com Zod
- 🚀 **Desenvolvimento** - Hot reload com tsx

## 🛠️ Tecnologias

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Fastify** | ^5.8.5 | Framework web rápido e eficiente |
| **TypeScript** | ^6.0.3 | Linguagem com tipagem estática |
| **SQLite3** | ^6.0.1 | Banco de dados relacional leve |
| **Knex.js** | ^3.2.10 | Query builder e migrations |
| **JWT** | ^9.0.3 | Autenticação com tokens |
| **Argon2** | ^0.44.0 | Hashing seguro de senhas |
| **Zod** | ^4.4.3 | Validação de schemas |
| **Dotenv** | ^17.4.2 | Carregamento de variáveis de ambiente |

## 📦 Instalação

### Pré-requisitos
- Node.js (versão 18+)
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/rn-raul/API-REST-PASSWORD.git
cd API-REST-PASSWORD
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL=./db/app.db
NODE_ENV=development
PORT=3000
SECRET_KEY=sua_chave_secreta_super_segura
```

4. **Execute as migrations do banco de dados**
```bash
npm run knex migrate:latest
```

## 🚀 Como Usar

### Desenvolvimento

Inicie o servidor em modo de desenvolvimento com hot reload:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

### Build para Produção

```bash
npm run build
```

### Executar em Produção

```bash
npm start
```

## 📚 Estrutura do Projeto

```
API-REST-PASSWORD/
├── src/
│   ├── app.ts              # Configuração do Fastify
│   ├── server.ts           # Inicialização do servidor
│   ├── database.ts         # Configuração do banco de dados
│   ├── env/                # Validação de variáveis de ambiente
│   ├── routes/
│   │   ├── usuarios.ts     # Endpoints de usuários
│   │   └── passwords.ts    # Endpoints de senhas
│   ├── middlewares/        # Middlewares customizados
│   ├── services/           # Lógica de negócio
│   ├── types/              # Definições de tipos TypeScript
│   └── utils/              # Funções utilitárias
├── db/                     # Banco de dados e migrations
├── knexfile.ts             # Configuração do Knex
├── package.json
├── tsconfig.json
└── .env.example
```

## 🔌 Endpoints da API

### Usuários

#### Registrar novo usuário
```bash
POST /api/usuarios/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "senha": "senha123"
}
```

#### Login
```bash
POST /api/usuarios/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "senha": "senha123"
}
```

### Senhas

#### Listar senhas do usuário
```bash
GET /api/passwords
Authorization: Bearer {token}
```

#### Criar nova senha
```bash
POST /api/passwords
Authorization: Bearer {token}
Content-Type: application/json

{
  "site": "github.com",
  "usuario": "meu_usuario",
  "senha": "senha_do_site"
}
```

#### Atualizar senha
```bash
PUT /api/passwords/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "site": "github.com",
  "usuario": "novo_usuario",
  "senha": "nova_senha"
}
```

#### Deletar senha
```bash
DELETE /api/passwords/:id
Authorization: Bearer {token}
```

## 🔒 Segurança

- **Senhas**: Armazenadas com hash Argon2, nunca em texto plano
- **Autenticação**: Implementada com JWT para todas as rotas protegidas
- **Cookies**: Suportados e seguros via Fastify
- **Validação**: Todos os inputs são validados com Zod
- **Variáveis de Ambiente**: Sensíveis carregadas via dotenv

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Iniciar servidor em produção
npm start

# Executar comandos Knex
npm run knex
```

## 🎯 Próximas Melhorias

- [ ] Testes automatizados (Jest/Vitest)
- [ ] Documentação com Swagger/OpenAPI
- [ ] Rate limiting
- [ ] Sistema de refresh tokens
- [ ] Auditoria de logs
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 📄 Licença

ISC

## 👤 Autor

**Raul**

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para abrir issues e pull requests.

---

**Desenvolvido com ❤️ em TypeScript**
