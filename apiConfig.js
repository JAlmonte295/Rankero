// The backend server URL is retrieved from environment variables.
// VITE_BACK_END_SERVER_URL will be defined in your Netlify settings for production
// and can be defined in a .env.local file for development.
console.log('VITE_BACK_END_SERVER_URL:', import.meta.env.VITE_BACK_END_SERVER_URL);
export const API_URL = import.meta.env.VITE_BACK_END_SERVER_URL;
