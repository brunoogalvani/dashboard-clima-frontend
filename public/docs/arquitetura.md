# Arquitetura do Projeto

O sistema é dividido em três camadas principais:

## Frontend (React + TypeScript)
- Consome os dados do backend pelo endpoint `/api/dados`
- Possui componentes independentes para clima, qualidade do ar e incêndios
- Gerencia estado global da cidade pesquisada

## Backend (Node.js + Express)
- Centraliza as requisições às APIs externas
- Endpoint principal: `/api/dados`
- Integração com:
  - **WeatherAPI** (dados meteorológicos)
  - **AQICN** (qualidade do ar)
  - **NASA FIRMS** (focos de incêndio)

## APIs Externas
Todas as APIs são consultadas simultaneamente e retornam um JSON unificado.
