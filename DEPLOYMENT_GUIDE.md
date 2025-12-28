# Guia de Deploy - Plataforma Fifty

## 📦 Arquivos Necessários para Deploy

### 1. Variáveis de Ambiente (.env)
Crie um arquivo `.env` na raiz do projeto com:

```
DATABASE_URL=mysql://usuario:senha@seu-servidor.com:3306/fifty_db
JWT_SECRET=sua-chave-secreta-aqui
VITE_APP_ID=seu-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://seu-dominio.com/oauth
OWNER_OPEN_ID=seu-open-id
OWNER_NAME=Seu Nome
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=sua-chave-api
VITE_FRONTEND_FORGE_API_KEY=sua-chave-frontend
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_APP_TITLE=Fifty
VITE_APP_LOGO=/logo.svg
VITE_ANALYTICS_ENDPOINT=seu-endpoint-analytics
VITE_ANALYTICS_WEBSITE_ID=seu-website-id
```

### 2. Build para Produção

```bash
# Instalar dependências
pnpm install

# Gerar migrações do banco de dados
pnpm db:push

# Build do projeto
pnpm build

# Iniciar servidor
pnpm start
```

### 3. Estrutura de Arquivos Gerada

Após o build, você terá:
- `dist/` - Arquivos compilados do frontend
- `dist/index.js` - Servidor Node.js compilado

### 4. Deploy em Servidor

**Opção A: Node.js Direto**
```bash
node dist/index.js
```

**Opção B: PM2 (Recomendado)**
```bash
npm install -g pm2
pm2 start dist/index.js --name "fifty"
pm2 save
pm2 startup
```

**Opção C: Docker**
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY dist ./dist
COPY package.json ./
RUN npm install --production
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### 5. Configurar Domínio

1. Apontar DNS para seu servidor
2. Configurar SSL/HTTPS (recomendado: Let's Encrypt)
3. Configurar proxy reverso (nginx/Apache)

### 6. Banco de Dados

Certifique-se de que:
- MySQL/TiDB está rodando
- Banco de dados `fifty_db` foi criado
- Migrações foram aplicadas com `pnpm db:push`

---

**Suporte:** Para dúvidas, consulte a documentação do template em `README.md`
