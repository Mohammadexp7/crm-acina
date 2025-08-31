
// vite.config.js
// This configuration file is necessary to run a Vite project on Replit.

export default {
  server: {
    host: '0.0.0.0', // This makes the server accessible from the Replit container
    hmr: {
      // This configures the Hot Module Replacement (HMR) client to work
      // correctly over HTTPS, which Replit uses for the preview window.
      clientPort: 443,
    },
  },
};
