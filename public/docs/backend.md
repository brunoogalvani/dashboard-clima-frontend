# Backend (Node.js + Express)

O backend serve como **orquestrador de múltiplas APIs externas**, garantindo que o frontend receba respostas padronizadas.

---

## Estrutura

/backend
├── server.js
├── routes/
│ ├── climaRoutes.js
│ ├── qualidadeRoutes.js
│ ├── incendiosRoutes.js
│ └── mapaRoutes.js
├── services/
│ ├── climaService.js
│ ├── qualidadeService.js
│ ├── incendiosService.js
│ ├── mapaService.js
│ └── dadosService.js ← integra tudo
└── controllers/
└── dadosController.js

---

## Endpoint Unificado

### `GET /api/dados?cidade={nome}`

Retorna todos os dados consolidados:

```json
{
  "cidade": "Sao Paulo",
  "pais": "Brazil",
  "lat": -23.55,
  "lon": -46.63,
  "clima": { ... },
  "qualidade": { ... },
  "incendios": { ... }
}