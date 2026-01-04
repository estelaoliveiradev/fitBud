
# 🚀 FitBuddy - Deploy Guide

Este projeto está pronto para ser hospedado no GitHub Pages!

## Como configurar:

1. **Repositório**: Crie um novo repositório no GitHub e suba todos os arquivos.
2. **API Key**: 
   - Vá em `Settings` > `Secrets and variables` > `Actions`.
   - Clique em `New repository secret`.
   - Nome: `API_KEY`.
   - Valor: Sua chave da API do Google Gemini (obtenha em [ai.google.dev](https://ai.google.dev/)).
3. **Ativar Pages**:
   - Vá em `Settings` > `Pages`.
   - Em `Build and deployment` > `Source`, selecione **GitHub Actions**.
4. **Deploy**: Faça um pequeno commit ou push na branch `main`. O GitHub Actions iniciará o deploy automaticamente!

O site estará disponível em `https://seu-usuario.github.io/nome-do-repositorio/`.
