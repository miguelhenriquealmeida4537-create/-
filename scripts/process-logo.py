#!/usr/bin/env python3
"""
Tratamento geométrico da logo oficial da Casa da Pizza.

O que faz:
  1. Recorta um círculo ao redor da corrente (centro e raio medidos na imagem).
  2. Torna transparente apenas o EXTERIOR do círculo (borda antisserrilhada).
  3. Mantém o interior byte a byte idêntico ao original (verificado).
  4. Exporta versões otimizadas em vários tamanhos.

O que NÃO faz: não redesenha, não recolore, não remove o fundo branco interno.

Uso:  python3 scripts/process-logo.py
Requer: Pillow >= 11 (com suporte a WebP).
"""
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "brand" / "logo-original.png"
ASSETS = ROOT / "src" / "assets" / "brand"
PUBLIC = ROOT / "public"

# Medidos em brand/logo-original.png (1254×1254): caixa do conteúdo x 38–1214, y 39–1211.
CENTER = (626.0, 625.0)
RING_OUTER_RADIUS = 594.3  # último pixel da corrente, incluindo antisserrilhado
MARGIN = 8  # respiro branco além da corrente
RADIUS = RING_OUTER_RADIUS + MARGIN  # 602.3px

SUPERSAMPLE = 4  # máscara desenhada 4× maior e reduzida = borda suave
BADGE_SIZES = [128, 192, 256, 384, 512, 768, 1024]
BRAND_BLACK = (8, 8, 8, 255)


def circular_master() -> Image.Image:
    src = Image.open(SOURCE).convert("RGB")
    cx, cy = CENTER
    left, top = round(cx - RADIUS), round(cy - RADIUS)
    size = round(RADIUS * 2) + 1
    crop = src.crop((left, top, left + size, top + size)).convert("RGBA")

    # máscara circular antisserrilhada
    big = Image.new("L", (size * SUPERSAMPLE, size * SUPERSAMPLE), 0)
    c = (cx - left) * SUPERSAMPLE, (cy - top) * SUPERSAMPLE
    r = RADIUS * SUPERSAMPLE
    ImageDraw.Draw(big).ellipse((c[0] - r, c[1] - r, c[0] + r, c[1] + r), fill=255)
    mask = big.resize((size, size), Image.Resampling.LANCZOS)
    crop.putalpha(mask)

    verify_interior(src, crop, left, top)
    return crop


def verify_interior(src: Image.Image, out: Image.Image, left: int, top: int) -> None:
    """Garante que todo pixel 100% opaco é idêntico ao original."""
    s, o = src.load(), out.load()
    w, h = out.size
    opaque = changed = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = o[x, y]
            if a == 255:
                opaque += 1
                if (r, g, b) != s[x + left, y + top]:
                    changed += 1
    if changed:
        raise SystemExit(f"ERRO: {changed} pixels internos foram alterados")
    print(f"interior verificado: {opaque} pixels opacos idênticos ao original")


def on_black(img: Image.Image, canvas: int, badge: int) -> Image.Image:
    """Selo centralizado sobre o preto da marca (ícones que não aceitam transparência)."""
    bg = Image.new("RGBA", (canvas, canvas), BRAND_BLACK)
    b = img.resize((badge, badge), Image.Resampling.LANCZOS)
    off = (canvas - badge) // 2
    bg.alpha_composite(b, (off, off))
    return bg.convert("RGB")


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)
    (PUBLIC / "brand").mkdir(parents=True, exist_ok=True)
    master = circular_master()

    for s in BADGE_SIZES:
        img = master.resize((s, s), Image.Resampling.LANCZOS)
        img.save(ASSETS / f"logo-selo-{s}.webp", "WEBP", quality=92, method=6)
        img.save(ASSETS / f"logo-selo-{s}.avif", "AVIF", quality=80)

    # mestre transparente (uso geral, Open Graph futuro, materiais)
    master.resize((1024, 1024), Image.Resampling.LANCZOS).save(
        PUBLIC / "brand" / "logo-casa-da-pizza-selo.png", optimize=True
    )

    # ícones do navegador e do celular
    for s in (32, 192, 512):
        master.resize((s, s), Image.Resampling.LANCZOS).save(PUBLIC / f"icon-{s}.png", optimize=True)
    on_black(master, 180, 164).save(PUBLIC / "apple-touch-icon.png", optimize=True)

    print("arquivos gerados:")
    for p in sorted(list(ASSETS.glob("logo-selo-*")) + list(PUBLIC.glob("icon-*.png"))
                    + [PUBLIC / "apple-touch-icon.png", PUBLIC / "brand" / "logo-casa-da-pizza-selo.png"]):
        print(f"  {p.relative_to(ROOT)}  {p.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
