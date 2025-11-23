# APIs Utilizadas

## WeatherAPI (Clima Atual)
- Temperatura
- Sensação térmica
- Umidade
- Condição e ícone

Endpoint:

https://api.weatherapi.com/v1/current.json

---

## Open-Meteo (Previsão de 15 dias)
Usada para previsão estendida com:
- Máxima / mínima
- Probabilidade de chuva
- Nascer e pôr do sol

Endpoint:

https://api.open-meteo.com/v1/forecast

---

## AQICN (Qualidade do Ar)
Retorna:
- AQI
- Poluentes
- Situação da qualidade

Endpoint:

https://api.waqi.info/feed

---

## NASA FIRMS (Incêndios)
Dados de satélite em tempo real.

NASA FIRMS (MODIS/VIIRS) - CSV

---

## Endpoint Unificado (Backend)

GET /api/dados?cidade=Sao Paulo

Retorna:

```json
{
  "clima": { ... },
  "previsao": { ... },
  "qualidade": { ... },
  "incendios": { ... }
}
```
