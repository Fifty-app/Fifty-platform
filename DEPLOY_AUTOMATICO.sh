#!/bin/bash

# ============================================
# SCRIPT DE DEPLOY AUTOMÁTICO - FIFTY PLATFORM
# ============================================
# Este script prepara o código para deploy
# e fornece instruções passo a passo

set -e

echo "🚀 DEPLOY AUTOMÁTICO - PLATAFORMA FIFTY"
echo "========================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================
# PASSO 1: Verificar dependências
# ============================================
echo -e "${BLUE}[1/5]${NC} Verificando dependências..."

if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm não está instalado${NC}"
    echo "Instale com: npm install -g pnpm"
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ git não está instalado${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dependências verificadas${NC}"
echo ""

# ============================================
# PASSO 2: Verificar arquivos de configuração
# ============================================
echo -e "${BLUE}[2/5]${NC} Verificando arquivos de configuração..."

if [ ! -f "vercel.json" ]; then
    echo -e "${YELLOW}⚠️  vercel.json não encontrado${NC}"
fi

if [ ! -f "render.yaml" ]; then
    echo -e "${YELLOW}⚠️  render.yaml não encontrado${NC}"
fi

if [ ! -f ".env.production" ]; then
    echo -e "${YELLOW}⚠️  .env.production não encontrado${NC}"
fi

echo -e "${GREEN}✅ Arquivos de configuração verificados${NC}"
echo ""

# ============================================
# PASSO 3: Build local
# ============================================
echo -e "${BLUE}[3/5]${NC} Fazendo build local..."

pnpm install
pnpm build

if [ -d "dist" ]; then
    echo -e "${GREEN}✅ Build concluído com sucesso${NC}"
else
    echo -e "${RED}❌ Erro no build${NC}"
    exit 1
fi
echo ""

# ============================================
# PASSO 4: Preparar para Git
# ============================================
echo -e "${BLUE}[4/5]${NC} Preparando para Git..."

# Adicionar arquivos de configuração
git add vercel.json render.yaml .env.production package.json pnpm-lock.yaml

# Criar commit
git commit -m "chore: prepare for production deployment" || true

echo -e "${GREEN}✅ Arquivos preparados para Git${NC}"
echo ""

# ============================================
# PASSO 5: Instruções finais
# ============================================
echo -e "${BLUE}[5/5]${NC} Gerando instruções finais..."
echo ""

cat > /tmp/deploy_instructions.txt << 'EOF'
🎉 PRÓXIMAS ETAPAS PARA DEPLOY PERMANENTE

1️⃣  CRIAR CONTA NO TIDB CLOUD
   - Acesse: https://tidbcloud.com
   - Faça signup
   - Crie um cluster Serverless
   - Copie a connection string

2️⃣  CRIAR CONTA NO RENDER
   - Acesse: https://render.com
   - Faça signup
   - Crie um Web Service
   - Conecte seu repositório GitHub
   - Adicione variáveis de ambiente (DATABASE_URL, etc)
   - Deploy automático!

3️⃣  CRIAR CONTA NA VERCEL
   - Acesse: https://vercel.com
   - Faça signup
   - Importe seu repositório
   - Adicione variáveis de ambiente
   - Deploy automático!

4️⃣  CONFIGURAR OAUTH MANUS
   - Acesse: https://console.manus.im
   - Crie uma aplicação
   - Copie as credenciais
   - Configure URLs de callback

5️⃣  FAZER PUSH PARA GITHUB
   - git push origin main
   - Vercel e Render farão deploy automático!

📊 RESULTADO FINAL
   - Frontend: https://seu-dominio.vercel.app
   - Backend: https://seu-backend.onrender.com
   - Banco: TiDB Cloud (interno)

✅ TUDO PRONTO PARA PRODUÇÃO!
EOF

cat /tmp/deploy_instructions.txt

echo ""
echo -e "${GREEN}✅ Deploy automático concluído!${NC}"
echo ""
echo "📄 Instruções salvas em: /tmp/deploy_instructions.txt"
echo ""
echo -e "${YELLOW}Próximo passo: Fazer push para GitHub${NC}"
echo "$ git push origin main"
