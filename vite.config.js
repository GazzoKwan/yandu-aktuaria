import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Vite bawaannya hanya listen di 127.0.0.1, jadi container ngrok
    // (yang masuk lewat gateway bridge) ditolak. `true` = 0.0.0.0.
    host: true,
    // Sejak Vite 5.4.12, permintaan dengan Host yang tak dikenal diblokir.
    // Tanpa baris ini tunnel-nya tersambung tapi halaman balas
    // "Blocked request. This host is not allowed."
    allowedHosts: ['.ngrok-free.app', 'kandace-unbeaded-kaya.ngrok-free.dev'],
  },
})
