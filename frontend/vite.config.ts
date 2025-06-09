import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

//aqui implemente svgr y ademas de intalaron dependencias,
//lo implemente porquq queria cambiar el color de los icons pero al final no lo logre.

export default defineConfig({
  plugins: [react(), svgr()],
});
