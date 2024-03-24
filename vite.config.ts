import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// 
export default defineConfig({
  plugins: [react()],
  css: {
    modules: false,
  },
  // uncomment this section before making image
  // this is used to create the image for the container "0.0.0.0"
  // server: {
  //   host: "0.0.0.0",
  //   port: 3001, // Change this to the desired port (e.g., 3001)
  // },
})






