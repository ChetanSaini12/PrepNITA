import JWT from 'jsonwebtoken'
const decodeToken = (token) => {
    const userId = JWT.verify(token, process.env.JWT_SECRET).id;
    return userId
}

export {decodeToken}