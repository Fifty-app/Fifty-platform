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
