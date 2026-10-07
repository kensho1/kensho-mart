import re

with open('public/index.html', 'r') as f:
    html = f.read()

# Memperbaiki teks Rp dan nominal agar tidak berpindah baris/keluar kartu
old_pattern = r'(\bTOTAL\s+OMSET\b[\s\S]*?<[^>]+>)\s*Rp\s*<br\s*/?>\s*([\d\.]+)'
new_pattern = r'\1<span style="white-space:nowrap; font-size: 1rem;">Rp \2</span>'

updated_html = re.sub(old_pattern, new_pattern, html, flags=re.IGNORECASE)

if updated_html == html:
    # Alternatif pola jika struktur HTML berbeda
    html = html.replace('Rp <br>', 'Rp ').replace('Rp<br>', 'Rp ')
    updated_html = html

with open('public/index.html', 'w') as f:
    f.write(updated_html)

print("✅ Tampilan Total Omset berhasil diperbaiki!")
