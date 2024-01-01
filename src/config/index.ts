import type { CONFIG } from '@interfaces/global'

const config: CONFIG = {
  ENVIRONMENT: String(import.meta.env.VITE_APP_NODE_ENV),
  PORT: parseInt(import.meta.env.VITE_APP_PORT || '8080'),
  API_URL: String(import.meta.env.VITE_APP_API_URL),
  ACCESS_TOKEN_SECRET: String(import.meta.env.VITE_APP_ACCESS_TOKEN_SECRET)
}

export default config
