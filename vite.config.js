import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// npm run dev에서도 Vercel 서버 함수(api/confirm-payment.js)가 동작하게 연결
function devPaymentApi() {
  return {
    name: 'dev-payment-api',
    configureServer(server) {
      process.env.TOSS_SECRET_KEY = loadEnv(server.config.mode, process.cwd(), '').TOSS_SECRET_KEY

      server.middlewares.use('/api/confirm-payment', async (req, res) => {
        let raw = ''
        for await (const chunk of req) raw += chunk

        res.status = (code) => {
          res.statusCode = code
          return res
        }
        res.json = (body) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        }

        try {
          req.body = raw ? JSON.parse(raw) : undefined
          const { default: handler } = await server.ssrLoadModule('/api/confirm-payment.js')
          await handler(req, res)
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devPaymentApi()],
})
