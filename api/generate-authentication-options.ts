import { VercelRequest, VercelResponse } from '@vercel/node'
import { generateAuthenticationOptions } from '@simplewebauthn/server'
import { kv } from '@vercel/kv'

export default async function (req: VercelRequest, res: VercelResponse) {
  const { username } = req.body

  // Retrieve user
  const user = await kv.get(`user:${username}`)

  const authenticationOptions = generateAuthenticationOptions({
    rpID: 'localhost',
    userVerification: 'preferred',
    allowCredentials: user.credentials.map((cred: any) => ({
      id: cred.id,
      type: 'public-key',
      transports: ['usb', 'ble', 'nfc'],
    })),
  })

  // Save challenge
  await kv.set(`auth-challenge:${username}`, authenticationOptions.challenge, {
    ex: 300,
  }) // Expire in 5 minutes

  res.json(authenticationOptions)
}
