import { createProxyMiddleware } from 'http-proxy-middleware'
import { fromNodeMiddleware } from 'h3'

const apiProxy = createProxyMiddleware({
  target: process.env.API_URL || 'http://localhost:3000', // Update with your target API server
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Optional: Remove `/api` prefix when forwarding
  },
})

export default fromNodeMiddleware(apiProxy)
