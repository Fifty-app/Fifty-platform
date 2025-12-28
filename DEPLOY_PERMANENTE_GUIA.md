# 🚀 Guia Completo: Deploy Permanente da Plataforma Fifty

**Data:** 26 de dezembro de 2025  
**Objetivo:** Colocar a plataforma online permanentemente usando serviços gratuitos

---

## 📋 Resumo da Estratégia

| Componente | Serviço | Plano | Custo |
|:-----------|:--------|:------|:------|
| **Frontend** (React/Vite) | Vercel | Hobby (Gratuito) | R$ 0 |
| **Backend** (Node.js/Express) | Render | Free Tier | R$ 0 |
| **Banco de Dados** | TiDB Cloud | Free Tier | R$ 0 |
| **Storage de Imagens** | Cloudinary | Free | R$ 0 |
| **OAuth** | Manus | Integrado | Já configurado |
| **Domínio** | Gratuito (*.vercel.app) | Gratuito | R$ 0 |
| **SSL/HTTPS** | Automático | Automático | R$ 0 |

**Total Mensal: R$ 0** ✅

---

## 🎯 Passo a Passo do Deploy

### **PASSO 1: Preparar o Código para Produção**

#### 1.1 Criar arquivo `.env.production`

```bash
# Banco de Dados (será configurado no Passo 2)
DATABASE_URL=mysql://user:password@host:port/database

# OAuth Manus
VITE_APP_ID=seu-app-id-manus
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://seu-dominio.vercel.app/oauth
OWNER_OPEN_ID=seu-owner-id
OWNER_NAME=Fifty Admin
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=sua-chave-manus

# Frontend
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=sua-chave-manus
VITE_APP_TITLE=Fifty
VITE_APP_LOGO=/logo.svg

# Ambiente
NODE_ENV=production
PORT=3000
```

#### 1.2 Criar arquivo `vercel.json` (para o Frontend)

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist/public",
  "env": {
    "VITE_APP_ID": "@fifty_app_id",
    "VITE_OAUTH_PORTAL_URL": "@fifty_oauth_url",
    "VITE_FRONTEND_FORGE_API_URL": "@fifty_api_url",
    "VITE_FRONTEND_FORGE_API_KEY": "@fifty_api_key",
    "VITE_APP_TITLE": "Fifty",
    "VITE_APP_LOGO": "/logo.svg"
  }
}
```

#### 1.3 Criar arquivo `render.yaml` (para o Backend)

```yaml
services:
  - type: web
    name: fifty-backend
    runtime: node
    plan: free
    buildCommand: pnpm install && pnpm build
    startCommand: pnpm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: fifty_db
          property: connectionString
      - key: VITE_APP_ID
        sync: false
      - key: OAUTH_SERVER_URL
        value: https://api.manus.im
      - key: OWNER_OPEN_ID
        sync: false

databases:
  - name: fifty_db
    databaseName: fifty_production
    user: fifty_user
```

---

### **PASSO 2: Configurar Banco de Dados Gratuito (TiDB Cloud)**

#### 2.1 Criar conta no TiDB Cloud
1. Acesse: https://tidbcloud.com
2. Clique em "Sign Up"
3. Use email e crie uma senha
4. Confirme o email

#### 2.2 Criar cluster gratuito
1. Na dashboard, clique em "Create Cluster"
2. Escolha **"Serverless"** (mais barato)
3. Nome: `fifty-production`
4. Região: Escolha a mais próxima do Brasil (São Paulo se disponível)
5. Clique em "Create"

#### 2.3 Obter connection string
1. Após criar o cluster, clique em "Connect"
2. Copie a **MySQL Connection String**
3. Exemplo: `mysql://user:password@host:4000/database`

#### 2.4 Executar migrações
```bash
# Localmente, com a connection string do TiDB
export DATABASE_URL="mysql://user:password@host:4000/database"
pnpm db:push
```

---

### **PASSO 3: Configurar OAuth Manus**

#### 3.1 Obter credenciais Manus
1. Acesse: https://console.manus.im
2. Crie uma aplicação nova
3. Copie:
   - `VITE_APP_ID`
   - `OWNER_OPEN_ID`
   - `BUILT_IN_FORGE_API_KEY`

#### 3.2 Configurar URLs de callback
1. Na console Manus, adicione URLs de callback:
   - `https://seu-dominio.vercel.app/oauth/callback`
   - `https://seu-backend.onrender.com/api/oauth/callback`

---

### **PASSO 4: Deploy do Backend (Render)**

#### 4.1 Conectar repositório ao Render
1. Acesse: https://render.com
2. Clique em "New +" → "Web Service"
3. Selecione "Connect a repository"
4. Conecte sua conta GitHub/GitLab
5. Selecione o repositório `fifty-platform`

#### 4.2 Configurar o serviço
- **Name:** fifty-backend
- **Environment:** Node
- **Build Command:** `pnpm install && pnpm build`
- **Start Command:** `pnpm start`
- **Plan:** Free

#### 4.3 Adicionar variáveis de ambiente
Na seção "Environment", adicione:
```
DATABASE_URL = (copiar do TiDB)
NODE_ENV = production
VITE_APP_ID = (do Manus)
OAUTH_SERVER_URL = https://api.manus.im
OWNER_OPEN_ID = (do Manus)
OWNER_NAME = Fifty Admin
BUILT_IN_FORGE_API_URL = https://api.manus.im
BUILT_IN_FORGE_API_KEY = (do Manus)
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY = (do Manus)
PORT = 3000
```

#### 4.4 Deploy
1. Clique em "Create Web Service"
2. Render fará o deploy automaticamente
3. Aguarde 3-5 minutos
4. Você receberá uma URL: `https://fifty-backend.onrender.com`

---

### **PASSO 5: Deploy do Frontend (Vercel)**

#### 5.1 Conectar ao Vercel
1. Acesse: https://vercel.com
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Conecte sua conta GitHub
5. Selecione o repositório `fifty-platform`

#### 5.2 Configurar o projeto
- **Framework Preset:** Vite
- **Root Directory:** ./
- **Build Command:** `pnpm build`
- **Output Directory:** `dist/public`

#### 5.3 Adicionar variáveis de ambiente
Na seção "Environment Variables", adicione:
```
VITE_APP_ID = (do Manus)
VITE_OAUTH_PORTAL_URL = https://seu-dominio.vercel.app/oauth
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY = (do Manus)
VITE_APP_TITLE = Fifty
VITE_APP_LOGO = /logo.svg
```

#### 5.4 Deploy
1. Clique em "Deploy"
2. Aguarde 2-3 minutos
3. Você receberá uma URL: `https://fifty-platform.vercel.app`

---

### **PASSO 6: Conectar Frontend ao Backend**

#### 6.1 Atualizar arquivo `client/src/const.ts`
```typescript
export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://fifty-backend.onrender.com'
  : 'http://localhost:3000';

export const getLoginUrl = () => {
  const redirectUrl = `${window.location.origin}/oauth`;
  return `${API_URL}/api/oauth/authorize?redirect_uri=${encodeURIComponent(redirectUrl)}`;
};
```

#### 6.2 Fazer novo deploy
```bash
# Fazer push para GitHub
git add .
git commit -m "Update API URL for production"
git push origin main

# Vercel fará o deploy automaticamente
```

---

## ✅ Checklist de Verificação

- [ ] Conta TiDB Cloud criada e cluster configurado
- [ ] Connection string do banco de dados obtida
- [ ] Migrações executadas com sucesso
- [ ] Credenciais Manus obtidas
- [ ] URLs de callback configuradas no Manus
- [ ] Backend deployado no Render
- [ ] Frontend deployado na Vercel
- [ ] Variáveis de ambiente configuradas em ambos
- [ ] Testes de login funcionando
- [ ] Banco de dados recebendo dados
- [ ] HTTPS/SSL funcionando

---

## 🔗 URLs Finais

Após completar todos os passos:

| Serviço | URL |
|:--------|:----|
| **Frontend** | https://fifty-platform.vercel.app |
| **Backend** | https://fifty-backend.onrender.com |
| **Banco de Dados** | TiDB Cloud (interno) |

---

## 🛠️ Troubleshooting

### Erro: "DATABASE_URL is required"
**Solução:** Verificar se a variável de ambiente foi adicionada corretamente no Render

### Erro: "OAuth callback failed"
**Solução:** Verificar se as URLs de callback estão corretas no console Manus

### Erro: "Connection timeout"
**Solução:** Verificar se o TiDB Cloud está acessível (pode precisar de whitelist de IPs)

### Frontend não conecta ao backend
**Solução:** Verificar CORS no backend (`server/_core/index.ts`)

---

## 📊 Monitoramento

### Render Dashboard
- Acesse: https://dashboard.render.com
- Monitore logs em tempo real
- Veja uso de CPU/memória

### Vercel Dashboard
- Acesse: https://vercel.com/dashboard
- Veja analytics de acesso
- Monitore performance

### TiDB Cloud Console
- Acesse: https://tidbcloud.com
- Monitore queries
- Veja uso de storage

---

## 🔐 Segurança

### Recomendações
1. **Nunca** commitar `.env` no Git
2. Usar variáveis de ambiente para dados sensíveis
3. Ativar 2FA no Manus, TiDB e Vercel
4. Fazer backup regular do banco de dados
5. Monitorar logs de erro

### Backup do Banco de Dados
```bash
# Exportar dados do TiDB
mysqldump -h host -u user -p database > backup.sql

# Importar em novo banco
mysql -h host -u user -p database < backup.sql
```

---

## 💰 Custos Reais

### Plano Gratuito
- Vercel: Até 100GB/mês de bandwidth
- Render: Até 750h/mês de uptime
- TiDB: Até 5GB de storage

### Se precisar escalar
- Vercel Pro: $20/mês
- Render Pro: $7/mês
- TiDB Paid: Conforme uso

---

## 📞 Suporte

Se encontrar problemas:

1. **Vercel Support:** https://vercel.com/support
2. **Render Support:** https://render.com/support
3. **TiDB Support:** https://tidbcloud.com/support
4. **Manus Support:** https://help.manus.im

---

## 🎉 Próximos Passos

Após o deploy permanente estar online:

1. **Testar todas as funcionalidades** em produção
2. **Monitorar performance** nos primeiros dias
3. **Coletar feedback** de usuários beta
4. **Implementar melhorias** baseado em uso real
5. **Preparar lançamento público**

---

**Status:** ✅ Pronto para Deploy Permanente

**Última Atualização:** 26 de dezembro de 2025
