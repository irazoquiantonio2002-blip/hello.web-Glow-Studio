# Glow Studio — Landing page

Landing page corporativa para **Glow Studio · Salón & Barbería** (Cuautitlán Izcalli, Estado de México).

Salón y barbería premium en un mismo lugar: cabello y color, barbería (Glow Barber),
uñas y pestañas (Beauty Bar) y maquillaje / paquetes de graduación.

## Estructura

```
index.html            Página única con todas las secciones
css/style.css          Sistema de diseño (oro sobre negro) + responsive
js/main.js             Loader, navegación, reveal on scroll, typewriter,
                       partículas del hero y parallax
assets/img/            Logo, favicon, fachada y promociones reales del negocio
assets/video/          logo-reveal.mp4 (animación de logo en la pantalla de carga)
```

Las imágenes de servicios (cabello, uñas, maquillaje, barbería) usan Unsplash con
`loading="lazy"`; el resto son fotografías propias de Glow Studio.

## Datos del negocio

| Dato | Valor |
|------|-------|
| Dirección | Paseo de las Haciendas 254, Jardines de la Hacienda, C.P. 54720, Cuautitlán Izcalli, Estado de México |
| Teléfono / WhatsApp | +52 55 5194 9067 |
| Horario | Lunes a sábado, 11:00 – 20:00 h · Domingo, 12:00 – 17:00 h |
| Pagos | Efectivo o transferencia |
| Tarjeta digital | https://mitarjeta.mx/glowizcalli |
| Facebook | https://www.facebook.com/share/19QMhgpJza/ |
| Instagram | https://www.instagram.com/glow.studio.izcalli/ |

## Desarrollo

Es un sitio estático. Para previsualizar:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Despliegue

Subir el contenido de la carpeta tal cual a cualquier hosting estático
(Netlify, Vercel, GitHub Pages, hosting compartido). No requiere build.
