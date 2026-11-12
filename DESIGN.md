# Business Edition design direction

Audience: business owners and operational teams evaluating a solo AI automation specialist.

Palette: cloud #F5F7F9; white #FFFFFF; graphite #202C3B; steel #5D6B7C; blue #24529A; mist #E8EEF5.
Typography: Manrope for navigation, headings, body and controls; Source Serif 4 reserved for Alex’s personal motto.
Layout: left-aligned outcome-led hero with the existing cube to the right, practical services, interactive workflow proof, training, oversight, process and direct contact.
Principles: make business value concrete, preserve human review, describe a credible solo engagement, avoid invented results or client claims.

Review: a generic corporate dashboard hero would lose Alex’s identity. Retain the recognizable rotating cube as the one expressive element, using a silver-blue finish, and let the working demos supply evidence. Keep the original scene geometry and animation intact.

## Dimensional service illustrations

The service section uses lazy-loaded React Three Fiber 9 and Three.js scenes, with beveled geometry, edge-connected solid channels, directional lighting and shadows. GSAP drives brief entrance and transfer sequences; each scene supports replay and respects reduced motion. Demand rendering stops drawing after the animation completes; intersection observers defer loading and stop offscreen animation. An HTML fallback keeps the service explanation usable if WebGL is unavailable. The Spline hero and Pastel Edition are unchanged.
