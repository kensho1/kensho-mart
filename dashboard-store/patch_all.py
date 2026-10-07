import re

# Komponen Stok Terpisah
stok_html = '''
  <!-- SEKSI DETAIL STOK GAME & PREMIUM -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    <!-- STOK GAME -->
    <div class="p-4 bg-gray-900/80 border border-gray-800 rounded-2xl shadow-lg">
      <div class="flex items-center gap-2 mb-4">
        <span class="text-xl">🎮</span>
        <h3 class="text-sm font-bold text-blue-400 uppercase tracking-wider">Stok Akun Game</h3>
      </div>
      <div class="space-y-2">
        <div class="flex justify-between items-center p-3 bg-gray-800/40 border border-gray-800 rounded-xl text-sm">
          <span class="text-gray-300 font-medium">Mobile Legends (ML)</span>
          <span class="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold rounded-lg">8 Item</span>
        </div>
        <div class="flex justify-between items-center p-3 bg-gray-800/40 border border-gray-800 rounded-xl text-sm">
          <span class="text-gray-300 font-medium">Free Fire (FF)</span>
          <span class="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold rounded-lg">5 Item</span>
        </div>
      </div>
    </div>

    <!-- STOK APK PREMIUM -->
    <div class="p-4 bg-gray-900/80 border border-gray-800 rounded-2xl shadow-lg">
      <div class="flex items-center gap-2 mb-4">
        <span class="text-xl">👑</span>
        <h3 class="text-sm font-bold text-purple-400 uppercase tracking-wider">Stok APK Premium</h3>
      </div>
      <div class="space-y-2">
        <div class="flex justify-between items-center p-3 bg-gray-800/40 border border-gray-800 rounded-xl text-sm">
          <span class="text-gray-300 font-medium">Spotify Premium</span>
          <span class="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold rounded-lg">4 Item</span>
        </div>
        <div class="flex justify-between items-center p-3 bg-gray-800/40 border border-gray-800 rounded-xl text-sm">
          <span class="text-gray-300 font-medium">YouTube / APK Lain</span>
          <span class="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold rounded-lg">3 Item</span>
        </div>
      </div>
    </div>
  </div>
'''

def fix_content(content):
    # Fix Teks Rp Omset Pecah Baris
    content = re.sub(r'Rp\s*<br\s*/?>', 'Rp ', content)
    
    # Hapus Ringkasan Total Pendapatan bawah dan ganti dengan Stok Game/Premium
    pattern = r'<div[^>]*>\s*<[^>]*>Ringkasan Total Pendapatan[\s\S]*?</div>\s*</div>\s*</div>'
    if re.search(pattern, content, re.IGNORECASE):
        content = re.sub(pattern, stok_html, content, flags=re.IGNORECASE)
    return content

# Update public/index.html
try:
    with open('public/index.html', 'r', encoding='utf-8') as f:
        html_data = f.read()
    with open('public/index.html', 'w', encoding='utf-8') as f:
        f.write(fix_content(html_data))
    print("✅ File public/index.html berhasil di-patch!")
except Exception as e:
    print(" Gagal update public/index.html:", e)

# Update app.js
try:
    with open('app.js', 'r', encoding='utf-8') as f:
        app_data = f.read()
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(fix_content(app_data))
    print("✅ File app.js berhasil di-patch!")
except Exception as e:
    print(" Gagal update app.js:", e)

