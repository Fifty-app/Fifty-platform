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
