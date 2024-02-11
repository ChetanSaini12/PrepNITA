import JWT from 'jsonwebtoken'
const decodeToken = (token) => {
    return JWT.verify(token, process.env.JWT_SECRET).id;
}

export {decodeToken}