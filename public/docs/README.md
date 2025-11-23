# PIMA – Documentação Oficial

O **PIMA** é uma plataforma interativa que exibe:

- Clima atual
- Previsão de até 15 dias
- Qualidade do ar
- Focos de incêndio detectados por satélite
- Mapas interativos de clima e incêndios

O projeto é composto por dois repositórios:

- **Frontend (React + TypeScript)**  
  https://github.com/brunoogalvani/dashboard-clima-frontend  
- **Backend (Node.js + Express)**  
  https://github.com/brunoogalvani/dashboard-clima-backend  

---

## Funcionalidades Principais
✔ Prévia do clima atual  
✔ Previsão de até 15 dias (Open-Meteo)  
✔ Qualidade do ar (AQICN)  
✔ Incêndios florestais (NASA FIRMS)  
✔ Mapa interativo com camadas  
✔ Busca por cidade  
✔ UI responsiva, com modo cards e mapa

---

## Estrutura Geral

pima/  
├── backend/ # API Node.js (porta 3000)  
├── frontend/ # Aplicação React (porta 5173)  
└── docs/ # Documentação Docsify

---

## Seções da Documentação

- [Instalação / Execução](instalacao.md)
- [Arquitetura](arquitetura.md)
- [APIs Utilizadas](apis.md)
- [Backend](backend.md)
- [Frontend](frontend.md)
