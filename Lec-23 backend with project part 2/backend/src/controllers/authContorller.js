import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export async function register(req, res) {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })
  const exists = await User.findOne({ email })
  if (exists) return res.status(409).json({ message: 'Email already in use' })
  const passwordHash = await bcrypt.hash(password, 10)
  const role = email.includes('admin') ? 'admin' : 'user'
  const user = await User.create({ name, email, passwordHash, role })
  return res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role })
}

export async function login(req, res) {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' })
  return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
}


