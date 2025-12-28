# ⚡ Deploy em 5 Minutos - Plataforma Fifty

**Tempo total:** ~5 minutos de cliques + 10 minutos de deploy automático

---

## 🎯 O Que Você Vai Fazer

1. Criar conta no TiDB Cloud (banco de dados gratuito)
2. Criar conta no Render (backend gratuito)
3. Criar conta na Vercel (frontend gratuito)
4. Clicar em "Deploy" em cada um
5. Pronto! Site online permanentemente

---

## ⚡ PASSO 1: Banco de Dados (2 min)

### 1.1 Acesse TiDB Cloud
```
https://tidbcloud.com
```

### 1.2 Clique em "Sign Up"
- Use seu email
- Confirme o email

### 1.3 Crie um Cluster
1. Clique em "Create Cluster"
2. Escolha "Serverless"
3. Nome: `fifty-production`
4. Região: São Paulo (ou mais próxima)
5. Clique em "Create"

### 1.4 Copie a Connection String
1. Após criar, clique em "Connect"
2. Copie a string MySQL
3. Exemplo: `mysql://user:password@host:4000/database`
4. **Guarde isso!** Você vai precisar

---

## ⚡ PASSO 2: Backend (2 min)

### 2.1 Acesse Render
```
https://render.com
```

### 2.2 Clique em "New +" → "Web Service"

### 2.3 Conecte seu GitHub
1. Clique em "Connect a repository"
2. Autorize o Render a acessar seu GitHub
3. Selecione o repositório `fifty-platform`

### 2.4 Configure o Serviço
- **Name:** fifty-backend
- **Environment:** Node
- **Build Command:** `pnpm install && pnpm build`
- **Start Command:** `pnpm start`
- **Plan:** Free

### 2.5 Adicione Variáveis de Ambiente
Clique em "Add Environment Variable" para cada uma:

```
DATABASE_URL = (cole a string do TiDB)
NODE_ENV = production
VITE_APP_ID = (você vai preencher depois)
OAUTH_SERVER_URL = https://api.manus.im
OWNER_OPEN_ID = (você vai preencher depois)
OWNER_NAME = Fifty Admin
BUILT_IN_FORGE_API_URL = https://api.manus.im
BUILT_IN_FORGE_API_KEY = (você vai preencher depois)
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY = (você vai preencher depois)
VITE_APP_TITLE = Fifty
VITE_APP_LOGO = /logo.svg
PORT = 3000
```

### 2.6 Clique em "Create Web Service"
- Render fará o deploy automaticamente
- Aguarde 3-5 minutos
- Você receberá uma URL como: `https://fifty-backend.onrender.com`
- **Copie essa URL!**

---

## ⚡ PASSO 3: Frontend (1 min)

### 3.1 Acesse Vercel
```
https://vercel.com
```

### 3.2 Clique em "New Project"

### 3.3 Clique em "Import Git Repository"
1. Autorize o Vercel
2. Selecione `fifty-platform`

### 3.4 Configure o Projeto
- **Framework:** Vite
- **Build Command:** `pnpm build`
- **Output Directory:** `dist/public`

### 3.5 Adicione Variáveis de Ambiente
```
VITE_APP_ID = (você vai preencher depois)
VITE_OAUTH_PORTAL_URL = https://seu-dominio.vercel.app/oauth
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY = (você vai preencher depois)
VITE_APP_TITLE = Fifty
VITE_APP_LOGO = /logo.svg
```

### 3.6 Clique em "Deploy"
- Aguarde 2-3 minutos
- Você receberá uma URL como: `https://fifty-platform.vercel.app`
- **Copie essa URL!**

---

## ⚡ PASSO 4: Configurar OAuth Manus

### 4.1 Acesse Console Manus
```
https://console.manus.im
```

### 4.2 Crie uma Aplicação
1. Clique em "New Application"
2. Nome: "Fifty Platform"
3. Tipo: "Web"

### 4.3 Copie as Credenciais
- `VITE_APP_ID`
- `OWNER_OPEN_ID`
- `BUILT_IN_FORGE_API_KEY`
- `VITE_FRONTEND_FORGE_API_KEY`

### 4.4 Configure URLs de Callback
Adicione essas URLs:
- `https://seu-dominio.vercel.app/oauth/callback`
- `https://fifty-backend.onrender.com/api/oauth/callback`

---

## ⚡ PASSO 5: Conectar Tudo

### 5.1 Atualizar Variáveis no Render
1. Volte ao Render
2. Vá para seu serviço `fifty-backend`
3. Clique em "Environment"
4. Atualize as variáveis com as credenciais do Manus:
   - `VITE_APP_ID`
   - `OWNER_OPEN_ID`
   - `BUILT_IN_FORGE_API_KEY`
   - `VITE_FRONTEND_FORGE_API_KEY`

### 5.2 Atualizar Variáveis na Vercel
1. Volte à Vercel
2. Vá para seu projeto `fifty-platform`
3. Clique em "Settings" → "Environment Variables"
4. Atualize as variáveis com as credenciais do Manus:
   - `VITE_APP_ID`
   - `VITE_FRONTEND_FORGE_API_KEY`

### 5.3 Fazer Deploy Novamente
- No Render: Clique em "Manual Deploy" → "Deploy latest commit"
- Na Vercel: Clique em "Deployments" → "Redeploy"

---

## ✅ Pronto!

Após 5-10 minutos, seu site estará online permanentemente em:

```
🌐 https://fifty-platform.vercel.app
```

---

## 🔗 URLs Importantes

| Serviço | URL |
|:--------|:----|
| **Site** | https://fifty-platform.vercel.app |
| **Backend** | https://fifty-backend.onrender.com |
| **TiDB Cloud** | https://tidbcloud.com |
| **Render** | https://render.com |
| **Vercel** | https://vercel.com |
| **Manus** | https://console.manus.im |

---

## 💡 Dicas

1. **Bookmark essas URLs!** Você vai precisar delas depois
2. **Guarde as credenciais Manus** em um lugar seguro
3. **Ative 2FA** em todas as contas
4. **Monitore os logs** nos primeiros dias

---

## 🆘 Se Algo Der Errado

### Erro: "Build failed"
- Verifique se o `pnpm-lock.yaml` está no repositório
- Verifique se todas as dependências estão no `package.json`

### Erro: "Connection timeout"
- Verifique se o TiDB está acessível
- Pode precisar de whitelist de IPs

### Erro: "OAuth callback failed"
- Verifique se as URLs de callback estão corretas
- Verifique se as credenciais estão certas

---

## 🎉 Próximos Passos

1. Testar o site em produção
2. Convidar usuários beta
3. Monitorar performance
4. Coletar feedback
5. Implementar melhorias

---

**Tempo total:** ~15 minutos (5 min cliques + 10 min deploy automático)

**Custo:** R$ 0 (totalmente gratuito!)

**Resultado:** Site online 24/7 permanentemente! 🚀
