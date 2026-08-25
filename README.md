# CUERO NOBLE - Catalogo CAT Threshold y Founder

Catalogo estatico para GitHub Pages. No usa servidor, base de datos, carrito ni pagos en linea.

## Editar productos

Los productos estan en `data/products.js`. Campos principales:

- `listPrice`: precio regular local en soles. Usa `null` si falta confirmar.
- `discount`: descuento visible. Threshold usa `10`; Founder usa `20`, excepto Founder Miel con oferta limitada de `40`.
- `offerPrice`: precio final manual opcional si se necesita ajustar un precio puntual.
- `stockStatus`: usa `Consultar disponibilidad` o `Disponible mediante pedido`.
- `images`: ruta de la foto dentro de `assets/products/`.

## Reglas comerciales actuales

- Los precios de lista se muestran como precios comerciales terminados en 9: Low S/399, Chukka S/429, Chelsea S/459 y Hiker S/499.
- Los productos Threshold calculan 10% de descuento.
- Founder Miel calcula 40% de descuento por tiempo limitado hasta terminar stock.
- Los demas productos Founder calculan 20% de descuento.
- No se afirma stock por talla/color sin confirmacion.
- Se indica plazo estimado de pedido de 5 a 10 dias habiles previa confirmacion.
- Medios de pago visibles con imagen: Yape, Plin, transferencia Caja Huancayo y debito SIP.

## Fotos y fuentes

Las fuentes consultadas estan documentadas en `data/sources.json`. Las fotos descargadas se guardan en `assets/products/`.

## Publicar en GitHub Pages

1. Sube la carpeta `cuero-noble-catalogo` a un repositorio de GitHub.
2. En GitHub, entra a `Settings > Pages`.
3. Selecciona `Deploy from a branch`.
4. Elige la rama `main` y la carpeta `/root`.
5. Guarda y espera la URL publica.

## Ver localmente

Abre `index.html` en el navegador. Tambien puedes servirlo con:

```bash
python -m http.server 8000
```

Luego visita `http://localhost:8000`.
