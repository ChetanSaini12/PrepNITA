import JWT from 'jsonwebtoken'
export const generateJwtToken = (id) => {
    const token = JWT.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    })
    return token
}