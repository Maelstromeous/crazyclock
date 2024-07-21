import { VercelRequest, VercelResponse } from '@vercel/node'
import { generateRegistrationOptions } from '@simplewebauthn/server'
import { kv } from '@vercel/kv'

export default async function (req: VercelRequest, res: VercelResponse) {
  const { username } = req.body

  console.log('Generating registration options for', username)

  // Check if user already exists
  const user = await kv.get(`user:${username}`)
  if (!user) {
    await kv.set(`user:${username}`, { username, credentials: [] })
  }

  const userVerification = 'preferred'
  const registrationOptions = generateRegistrationOptions({
    rpName: 'Example Corp',
    rpID: 'localhost',
    userID: username,
    userName: username,
    userVerification,
  })

  // Save challenge
  await kv.set(`challenge:${username}`, registrationOptions.challenge, {
    ex: 300,
  }) // Expire in 5 minutes

  res.json(registrationOptions)
}
