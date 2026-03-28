import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // Expose both VITE_ and NEXT_PUBLIC_ prefixed env vars so the existing
  // .env file (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)
  // continues to work without renaming.
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
});
