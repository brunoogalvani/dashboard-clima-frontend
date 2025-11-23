# Backend – Node.js + Express

O backend funciona como um agregador de APIs externas, convertendo formatos variados em um JSON limpo e padronizado para o frontend.

---

# Estrutura

backend/  
├── server.js # inicialização  
├── routes/ # rotas  
├── controllers/ # lógica da API  
├── services/ # integrações com APIs externas  
└── utils/ # validações, formatadores, etc  

---

# Endpoints Principais

### `GET /api/clima?cidade=Sao Paulo`
Clima atual (WeatherAPI)

### `GET /api/previsao?cidade=Sao Paulo`
Previsão de até 15 dias (Open-Meteo)

### `GET /api/qualidade?cidade=Sao Paulo`
Qualidade do ar (AQICN)

### `GET /api/incendios?cidade=Sao Paulo`
Incêndios próximos (NASA FIRMS)

### `GET /api/dados?cidade=Sao Paulo`
**Endpoint unificado**

Retorna:

```json
{
  "cidade": "Sao Paulo",
  "clima": { ... },
  "previsao": { ... },
  "qualidade": { ... },
  "incendios": { ... }
}
```