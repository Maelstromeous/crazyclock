import mongoose, { Document, Schema } from 'mongoose'

interface ICredential {
  id: string
  publicKey: string
  counter: number
}

interface IUser extends Document {
  username: string
  credentials: ICredential[]
}

const CredentialSchema: Schema = new Schema({
  id: { type: String, required: true },
  publicKey: { type: String, required: true },
  counter: { type: Number, required: true },
})

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  credentials: [CredentialSchema],
})

const User = mongoose.model<IUser>('User', UserSchema)

export default User
export { IUser, ICredential }
