# CUERO NOBLE - Catalogo CAT Threshold

Catalogo estatico para GitHub Pages. No usa servidor, base de datos, carrito ni pagos en linea.

## Editar productos

Los productos estan en `data/products.js`. Campos principales:

- `listPrice`: precio regular local en soles. Usa `null` si falta confirmar.
- `discount`: descuento visible. Solo `threshold-low-gray` usa `30`; los demas usan `10`.
- `offerPrice`: precio final manual. El Low gris esta fijado en `279`.
- `stockStatus`: usa `Consultar disponibilidad` o `Disponible mediante pedido`.
- `images`: ruta de la foto dentro de `assets/products/`.

## Reglas comerciales actuales

- CAT Threshold Low gris: S/399 regular, S/279 oferta, etiqueta `Oferta limitada · 30%`.
- La oferta gris es por tiempo limitado hasta terminar stock y aplica a tallas 40.5 y 42.
- Los precios de lista se muestran como precios comerciales terminados en 9: Low S/399, Chukka S/429, Chelsea S/459 y Hiker S/499.
- Los demas productos calculan 10% de descuento.
- No se afirma stock por talla/color sin confirmacion.
- En Cusco se indica pedido listo en 24 horas previa confirmacion.
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
