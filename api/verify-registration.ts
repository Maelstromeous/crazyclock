import { VercelRequest, VercelResponse } from '@vercel/node'
import { verifyRegistrationResponse } from '@simplewebauthn/server'
import { kv } from '@vercel/kv'

export default async function (req: VercelRequest, res: VercelResponse) {
  const { username, attestationResponse } = req.body

  // Retrieve stored challenge
  const expectedChallenge = await kv.get(`challenge:${username}`)

  const verification = await verifyRegistrationResponse({
    credential: attestationResponse,
    expectedChallenge,
    expectedOrigin: 'http://localhost:3000',
    expectedRPID: 'localhost',
  })

  if (verification.verified) {
    // Retrieve user
    const user = await kv.get(`user:${username}`)

    // Add the new credential to the user
    user.credentials.push(verification.registrationInfo)

    // Save updated user
    await kv.set(`user:${username}`, user)
  }

  res.json(verification)
}
