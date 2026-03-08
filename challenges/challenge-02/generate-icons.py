#!/usr/bin/env python3
"""
Script para generar iconos PNG para PWA desde SVG base
Requiere: pip install pillow cairosvg
"""

import os
from pathlib import Path

def generate_icons():
    """Genera iconos PNG en diferentes tamaños"""
    try:
        from PIL import Image, ImageDraw
        
        # Crear directorio de iconos si no existe
        icons_dir = Path(__file__).parent / 'public' / 'icons'
        icons_dir.mkdir(exist_ok=True)
        
        sizes = [72, 96, 128, 144, 152, 192, 384, 512]
        
        print("Generando iconos personalizados...")
        
        for size in sizes:
            # Crear imagen con fondo azul
            img = Image.new('RGB', (size, size), color='#2196F3')
            draw = ImageDraw.Draw(img)
            
            # Calcular proporciones
            margin = size // 8
            circle_radius = (size - 2 * margin) // 4
            rect_width = (size - 2 * margin) // 2
            rect_height = (size - 2 * margin) // 2
            
            # Dibujar cabeza (círculo blanco)
            head_x = size // 2 - circle_radius
            head_y = margin + circle_radius // 2
            draw.ellipse(
                [head_x, head_y, head_x + circle_radius * 2, head_y + circle_radius * 2],
                fill='white'
            )
            
            # Dibujar cuerpo (rectángulo blanco)
            body_x = (size - rect_width) // 2
            body_y = head_y + circle_radius + size // 16
            draw.rectangle(
                [body_x, body_y, body_x + rect_width, body_y + rect_height],
                fill='white'
            )
            
            # Dibujar teléfono (rectángulo verde)
            phone_x = body_x + rect_width + size // 16
            phone_y = body_y
            phone_width = size // 8
            phone_height = size // 4
            draw.rectangle(
                [phone_x, phone_y, phone_x + phone_width, phone_y + phone_height],
                fill='#4CAF50'
            )
            
            # Guardar archivo
            icon_path = icons_dir / f'icon-{size}x{size}.png'
            img.save(icon_path, 'PNG')
            print(f"✓ {icon_path.name}")
        
        # Generar iconos maskable
        print("\nGenerando iconos maskable...")
        for size in [192, 512]:
            img = Image.new('RGBA', (size, size), color=(0, 0, 0, 0))
            draw = ImageDraw.Draw(img)
            
            # Círculo azul como fondo (maskable safe area)
            radius = (size * 0.4)
            center = size // 2
            draw.ellipse(
                [center - radius, center - radius, center + radius, center + radius],
                fill='#2196F3'
            )
            
            # Iconografía blanca al centro
            circle_radius = size // 12
            head_x = center - circle_radius
            head_y = center - radius * 0.5
            draw.ellipse(
                [head_x, head_y, head_x + circle_radius * 2, head_y + circle_radius * 2],
                fill='white'
            )
            
            body_width = size // 6
            body_height = size // 6
            body_x = center - body_width // 2
            body_y = head_y + circle_radius + size // 20
            draw.rectangle(
                [body_x, body_y, body_x + body_width, body_y + body_height],
                fill='white'
            )
            
            icon_path = icons_dir / f'icon-maskable-{size}x{size}.png'
            img.save(icon_path, 'PNG')
            print(f"✓ {icon_path.name}")
        
        print("\n✅ Iconos generados exitosamente en public/icons/")
        
    except ImportError:
        print("❌ Error: Requiere PIL (pillow)")
        print("Instala con: pip install pillow")
        print("\nAlternativa: Usa un servicio en línea para convertir icon-base.svg a PNG")
        print("Recomendado: https://www.favicon-generator.org/")

if __name__ == '__main__':
    generate_icons()
