import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@hook': path.resolve(__dirname, 'src/hook'),
            '@tool': path.resolve(__dirname, 'src/tool'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@type': path.resolve(__dirname, 'src/types'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        }
    },
    //設定port
    server: {
        port: 3000,
        strictPort: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5003',
                changeOrigin: true,
                secure: false,
            },
        }
    },
});
