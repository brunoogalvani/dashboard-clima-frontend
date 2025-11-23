# Arquitetura do Projeto

O Dashboard Clima segue uma arquitetura dividida em **frontend** e **backend**, além de integrações com múltiplas APIs.

---

# 1. Backend (Node.js + Express)

Responsável por:
- Buscar dados em diferentes APIs externas
- Padronizar e unificar formatos
- Realizar cálculos e ajustes antes de enviar ao frontend
- Disponibilizar endpoints REST

### Estrutura

backend/  
├── server.js  
├── routes/  
│ ├── climaRoutes.js  
│ ├── previsaoRoutes.js  
│ ├── qualidadeRoutes.js  
│ ├── incendiosRoutes.js  
│ └── dadosRoutes.js  
├── controllers/  
├── services/  
└── utils/  

---

# 2. Frontend (React + TypeScript)

Responsável por:
- Interface visual
- Componentização
- Mapa interativo
- Busca e exibição da cidade selecionada
- Controle de estado
- Cards: clima atual, previsão, qualidade e incêndios

### Principais componentes
- `CardClima`
- `CardPrevisao`
- `CardQualidade`
- `CardMapaIncendios`
- `MapaClimaInterativo`
- `Sidebar`

---

# 3. APIs Externas

| API | Função |
|-----|--------|
| **WeatherAPI** | clima atual |
| **Open-Meteo** | previsão de 15 dias |
| **AQICN** | qualidade do ar |
| **NASA FIRMS** | incêndios florestais |

O backend agrega tudo e retorna um JSON padronizado.
