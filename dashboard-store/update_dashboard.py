import re

# Tampilan baru untuk bagian bawah
new_section = '''
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
          <span class="text-gray-300 font-medium">YouTube Premium / APK Lain</span>
          <span class="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold rounded-lg">3 Item</span>
        </div>
      </div>
    </div>

  </div>
'''

with open('public/index.html', 'r') as f:
    html = f.read()

# Menghapus section "Ringkasan Total Pendapatan" di bawah dan menggantinya dengan rincian stok
pattern = r'<!--\s*Ringkasan Total Pendapatan\s*-->[\s\S]*?</div>\s*</div>\s*</div>'
if not re.search(pattern, html):
    pattern = r'<div[^>]*>\s*<[^>]*>Ringkasan Total Pendapatan[\s\S]*?</div>\s*</div>\s*</div>'

updated_html = re.sub(pattern, new_section, html, flags=re.IGNORECASE)

with open('public/index.html', 'w') as f:
    f.write(updated_html)

print("✅ Dashboard berhasil diperbarui!")
