export PS1="[CMD_BEGIN]\n\u@\h:\w\n[CMD_END]"; export PS2=""
export TERM=xterm-256color
export OPENAI_API_KEY="sk-6C6hv8QtpcVH3axWq4HRUT"
export OPENAI_API_BASE="https://api.manus.im/api/llm-proxy/v1"
export OPENAI_BASE_URL="https://api.manus.im/api/llm-proxy/v1"
ps() { /bin/ps "$@" | grep -v -E '(start_server\.py|upgrade\.py|supervisor)' || true; }
pgrep() { /usr/bin/pgrep "$@" | while read pid; do [ -n "$pid" ] && cmdline=$(/bin/ps -p $pid -o command= 2>/dev/null) && ! echo "$cmdline" | grep -q -E '(start_server\.py|upgrade\.py|supervisor)' && echo "$pid"; done; }
source /home/ubuntu/.user_env && cd . && cd /home/ubuntu && pnpm dev > dev-server.log 2>&1 &
export PS1="[CMD_BEGIN]\n\u@\h:\w\n[CMD_END]"; export PS2=""
export TERM=xterm-256color
export OPENAI_API_KEY="sk-6C6hv8QtpcVH3axWq4HRUT"
export OPENAI_API_BASE="https://api.manus.im/api/llm-proxy/v1"
export OPENAI_BASE_URL="https://api.manus.im/api/llm-proxy/v1"
ps() { /bin/ps "$@" | grep -v -E '(start_server\.py|upgrade\.py|supervisor)' || true; }
pgrep() { /usr/bin/pgrep "$@" | while read pid; do [ -n "$pid" ] && cmdline=$(/bin/ps -p $pid -o command= 2>/dev/null) && ! echo "$cmdline" | grep -q -E '(start_server\.py|upgrade\.py|supervisor)' && echo "$pid"; done; }
source /home/ubuntu/.user_env && cd . && cd /home/ubuntu && unzip -q upload/fifty-platform-v3.2.0_1.zip && ls -la
source /home/ubuntu/.user_env && cd . && cd /home/ubuntu && pnpm install
source /home/ubuntu/.user_env && cd . && cd /home/ubuntu && cat > .env.local << 'EOF'
# Configuração temporária para desenvolvimento
DATABASE_URL=mysql://root:password@localhost:3306/fifty_db
VITE_APP_ID=temp-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=http://localhost:3000/oauth
OWNER_OPEN_ID=temp-owner-id
OWNER_NAME=Admin
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=temp-key
VITE_FRONTEND_FORGE_API_KEY=temp-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_APP_TITLE=Fifty
VITE_APP_LOGO=/logo.svg
NODE_ENV=development
EOF

cat .env.local
source /home/ubuntu/.user_env && cd . && cd /home/ubuntu && pnpm build
source /home/ubuntu/.user_env && cd . && cd /home/ubuntu && NODE_ENV=development PORT=3000 node dist/index.js > server.log 2>&1 &
source /home/ubuntu/.user_env && cd . && sleep 3 && cat /home/ubuntu/server.log && curl -s http://localhost:3000 | head -20
source /home/ubuntu/.user_env && cd . && ls -la /home/ubuntu/dist/
source /home/ubuntu/.user_env && cd . && ls -la /home/ubuntu/dist/public/
source /home/ubuntu/.user_env && cd . && sleep 5 && tail -30 /home/ubuntu/dev-server.log
source /home/ubuntu/.user_env && cd . && curl -s http://localhost:3001 | head -50
source /home/ubuntu/.user_env && cd . && cat > /home/ubuntu/remove_auth_protection.sh << 'EOF'
#!/bin/bash

# Lista de arquivos para atualizar
files=(
  "client/src/pages/MeusNegocios.tsx"
  "client/src/pages/MeusProdutos.tsx"
  "client/src/pages/Gamificacao.tsx"
  "client/src/pages/CadastrarDemanda.tsx"
  "client/src/pages/CadastrarProduto.tsx"
  "client/src/pages/MeuPlano.tsx"
  "client/src/pages/IndiqueGanhe.tsx"
  "client/src/pages/Mensagens.tsx"
)

for file in "${files[@]}"; do
  if [ -f "/home/ubuntu/$file" ]; then
    echo "Atualizando $file..."
    # Comentar a verificação de autenticação
    sed -i 's/if (!isAuthenticated) {/\/\/ Modo demo: permite acesso\n  if (false \&\& !isAuthenticated) {/g' "/home/ubuntu/$file"
  fi
done

echo "Concluído!"
EOF

chmod +x /home/ubuntu/remove_auth_protection.sh
source /home/ubuntu/.user_env && cd . && cd /home/ubuntu && ./remove_auth_protection.sh
source /home/ubuntu/.user_env && cd . && cat > /home/ubuntu/fix_creci_redirect.sh << 'EOF'
#!/bin/bash

# Arquivos que redirecionam para validar-creci
files=(
  "client/src/pages/MeusNegocios.tsx"
  "client/src/pages/MeusProdutos.tsx"
  "client/src/pages/CadastrarDemanda.tsx"
  "client/src/pages/CadastrarProduto.tsx"
  "client/src/pages/MeuPlano.tsx"
  "client/src/pages/IndiqueGanhe.tsx"
  "client/src/pages/Mensagens.tsx"
  "client/src/pages/AdminCRECI.tsx"
)

for file in "${files[@]}"; do
  if [ -f "/home/ubuntu/$file" ]; then
    echo "Atualizando $file..."
    # Comentar o redirecionamento de CRECI
    sed -i 's/if (!user?.creci) {/\/\/ Modo demo\n  if (false \&\& !user?.creci) {/g' "/home/ubuntu/$file"
  fi
done

echo "Concluído!"
EOF

chmod +x /home/ubuntu/fix_creci_redirect.sh && /home/ubuntu/fix_creci_redirect.sh
export PS1="[CMD_BEGIN]\n\u@\h:\w\n[CMD_END]"; export PS2=""
export TERM=xterm-256color
export OPENAI_API_KEY="sk-6C6hv8QtpcVH3axWq4HRUT"
export OPENAI_API_BASE="https://api.manus.im/api/llm-proxy/v1"
export OPENAI_BASE_URL="https://api.manus.im/api/llm-proxy/v1"
ps() { /bin/ps "$@" | grep -v -E '(start_server\.py|upgrade\.py|supervisor)' || true; }
pgrep() { /usr/bin/pgrep "$@" | while read pid; do [ -n "$pid" ] && cmdline=$(/bin/ps -p $pid -o command= 2>/dev/null) && ! echo "$cmdline" | grep -q -E '(start_server\.py|upgrade\.py|supervisor)' && echo "$pid"; done; }
source /home/ubuntu/.user_env && cd . && ls -R /home/ubuntu/server
source /home/ubuntu/.user_env && cd . && cd /home/ubuntu && find . -name "drizzle.config.*" -o -name "*.config.ts" | head -20
source /home/ubuntu/.user_env && cd . && chmod +x /home/ubuntu/DEPLOY_AUTOMATICO.sh
