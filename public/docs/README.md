# PIMA - Plataforma Integrada de Monitoramento Ambiental

O **PIMA** é um dashboard interativo que reúne dados de clima, qualidade do ar e incêndios florestais em tempo real.

---

## Funcionalidades
- Consulta unificada de clima, qualidade do ar e incêndios via endpoint `/dados`
- Interface responsiva em React
- Integração com múltiplas APIs (WeatherAPI, AQICN, NASA FIRMS)
- Atualização automática dos dados da cidade selecionada

---

## Estrutura do Projeto

```
pima/
├── backend/        # API Node.js (porta 3000)
├── frontend/       # Dashboard React (porta 5173)
└── docs/           # Documentação (Docsify - porta 3001)
```

---

## Seções da Documentação
- [Instalação e Execução](instalacao.md)
- [Arquitetura](arquitetura.md)
- [APIs Utilizadas](apis.md)
- [Contribuição](contribuicao.md)

