import os, re

# Mencari semua file html/ejs/views
files_to_check = []
for root, dirs, files in os.walk("."):
    if "node_modules" in root:
        continue
    for file in files:
        if file.endswith((".html", ".ejs", ".js")):
            files_to_check.append(os.path.join(root, file))

new_section = '''
  <!-- SEKSI DETAIL STOK GAME & PREMIUM -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    <div class="p-4 bg-gray-900 border border-gray-800 rounded-2xl">
      <h3 class="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">🎮 Stok Akun Game</h3>
      <div class="space-y-2">
        <div class="flex justify-between p-3 bg-gray-800/40 rounded-xl text-sm"><span class="text-gray-300">Mobile Legends (ML)</span><span class="text-blue-400 font-bold">8 Item</span></div>
        <div class="flex justify-between p-3 bg-gray-800/40 rounded-xl text-sm"><span class="text-gray-300">Free Fire (FF)</span><span class="text-blue-400 font-bold">5 Item</span></div>
      </div>
    </div>
    <div class="p-4 bg-gray-900 border border-gray-800 rounded-2xl">
      <h3 class="text-sm font-bold text-purple-400 uppercase tracking-wider mb-3">👑 Stok APK Premium</h3>
      <div class="space-y-2">
        <div class="flex justify-between p-3 bg-gray-800/40 rounded-xl text-sm"><span class="text-gray-300">Spotify Premium</span><span class="text-purple-400 font-bold">4 Item</span></div>
        <div class="flex justify-between p-3 bg-gray-800/40 rounded-xl text-sm"><span class="text-gray-300">YouTube / Lainnya</span><span class="text-purple-400 font-bold">3 Item</span></div>
      </div>
    </div>
  </div>
'''

for filePath in files_to_check:
    try:
        with open(filePath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if "Ringkasan Total Pendapatan" in content:
            # Ganti teks Rp pecah baris
            content = content.replace("Rp <br>", "Rp ").replace("Rp<br>", "Rp ")
            
            # Ganti bagian Ringkasan Pendapatan di bawah
            pattern = r'<div[^>]*>\s*<[^>]*>Ringkasan Total Pendapatan[\s\S]*?</div>\s*</div>\s*</div>'
            updated = re.sub(pattern, new_section, content, flags=re.IGNORECASE)
            
            with open(filePath, 'w', encoding='utf-8') as f:
                f.write(updated)
            print(f"✅ Berhasil diperbarui pada file: {filePath}")
    except Exception as e:
        pass

