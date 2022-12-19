import bcrypt from 'bcrypt'

const checkPassword = async (userPassword: string, bodyPassword: string): Promise<boolean> => {
  const check = bcrypt.compare(bodyPassword, userPassword)

  if (!check) return false

  return true
}

export default checkPassword
