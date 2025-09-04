import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    //設定port
    server: {
        port: 3000,
        strictPort: true,
    },
    resolve: {
        alias: {
            '@': '/src',
            '@Pages': '/src/Pages',
            '@Components': '/src/Components',
            '@hook': '/src/hook',
        },
    },
});
