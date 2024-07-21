import { VercelRequest, VercelResponse } from '@vercel/node'
import { verifyAuthenticationResponse } from '@simplewebauthn/server'
import { kv } from '@vercel/kv'
import User, { IUser } from './models/User'

export default async function (req: VercelRequest, res: VercelResponse) {
  const { username, assertionResponse } = req.body

  // Retrieve stored challenge
  const expectedChallenge = await kv.get(`auth-challenge:${username}`)

  // Retrieve user
  const user: IUser = await kv.get(`user:${username}`)

  const verification = await verifyAuthenticationResponse({
    credential: assertionResponse,
    expectedChallenge,
    expectedOrigin: 'http://localhost:3000',
    expectedRPID: 'localhost',
    authenticator: user.credentials.find(
      (cred: any) => cred.id === assertionResponse.rawId
    ),
  })

  if (verification.verified) {
    // Update the counter in the stored credential
    const credential = user.credentials.find(
      (cred: any) => cred.id === assertionResponse.rawId
    )
    if (credential) {
      credential.counter = verification.authenticationInfo.newCounter
      await kv.set(`user:${username}`, user)
    }
  }

  res.json(verification)
}
