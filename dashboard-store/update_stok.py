import re

html_code = '''
  <!-- SEKSI STOK TERPISAH -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
    <div class="p-4 bg-gray-900 border border-gray-800 rounded-xl">
      <h3 class="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">🎮 Stok Akun Game</h3>
      <div class="space-y-2">
        <div class="flex justify-between p-2 bg-gray-800/50 rounded text-sm"><span class="text-gray-300">Mobile Legends</span><span class="font-bold text-blue-400">8 Item</span></div>
        <div class="flex justify-between p-2 bg-gray-800/50 rounded text-sm"><span class="text-gray-300">Free Fire</span><span class="font-bold text-blue-400">5 Item</span></div>
      </div>
    </div>
    <div class="p-4 bg-gray-900 border border-gray-800 rounded-xl">
      <h3 class="text-sm font-bold text-purple-400 uppercase tracking-wider mb-3">👑 Stok App Premium</h3>
      <div class="space-y-2">
        <div class="flex justify-between p-2 bg-gray-800/50 rounded text-sm"><span class="text-gray-300">Spotify Premium</span><span class="font-bold text-purple-400">3 Item</span></div>
        <div class="flex justify-between p-2 bg-gray-800/50 rounded text-sm"><span class="text-gray-300">Netflix</span><span class="font-bold text-purple-400">2 Item</span></div>
      </div>
    </div>
  </div>
'''

print("✅ Komponen stok terpisah siap dipasang!")
