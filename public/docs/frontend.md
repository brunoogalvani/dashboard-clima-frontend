# Frontend (React + TypeScript)

O frontend do PIMA é responsável por exibir as informações de clima, qualidade do ar, previsão e incêndios de forma organizada e interativa.

---

## Tecnologias Utilizadas
- **React + TypeScript**
- **Vite**
- **TailwindCSS**
- **Leaflet.js** (mapas interativos)
- **Luxon** (datas e horários)

---

## Estrutura dos Principais Arquivos

frontend/  
├── src/  
│ ├── components/  
│ │ ├── CardClima.tsx  
│ │ ├── CardQualidade.tsx  
│ │ ├── CardPrevisao.tsx  
│ │ ├── CardIncendios.tsx  
│ │ ├── MapaClimaInterativo.tsx  
│ │ └── CardMapaIncendios.tsx  
│ ├── services/  
│ │ ├── climaService.ts  
│ │ ├── previsaoService.ts  
│ │ ├── qualidadeService.ts  
│ │ └── incendiosService.ts  
│ ├── pages/  
│ │ └── Dashboard.tsx  
│ └── App.tsx

---

## Comunicação com o Backend

O frontend consome o endpoint unificado:

```ts
GET http://localhost:3000/api/dados?cidade={nome}
```

E também endpoints individuais como:

- /api/previsao
- /api/clima
- /api/qualidade
- /api/incendios

