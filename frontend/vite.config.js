import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import credentials from './backend/src/connection/credentials.js';
const { portf, hostnamef } = credentials;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: portf,
    host: hostnamef,
  }
})