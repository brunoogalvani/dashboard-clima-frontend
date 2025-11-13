# APIs Utilizadas

## WeatherAPI
Fornece informações sobre:
- Temperatura atual
- Sensação térmica
- Umidade e vento
- Ícone de condição

Endpoint usado: `https://api.weatherapi.com/v1/current.json`

---

## AQICN (Air Quality Index)
Retorna dados de poluição e qualidade do ar.

Endpoint usado: `https://api.waqi.info/feed`

---

## NASA FIRMS
Retorna os focos de incêndio detectados via satélite.

Endpoint usado: `https://firms.modaps.eosdis.nasa.gov/api`

---

## Endpoint Unificado do Backend
```bash
GET /api/dados?cidade=Sao Paulo
```
Retorna clima, qualidade e incêndios no mesmo JSON.
