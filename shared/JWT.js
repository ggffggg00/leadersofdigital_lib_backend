const jwtBuilder = require('jsonwebtoken');

const JWT_SIGNATURE = "u/M:[rM[Fc&(U*u2NDcwx2(w_BB<";

function generateSignedToken(username, fullName, role){
    let body = {
        username: username,
        name: fullName,
        role: role
    }
    return jwtBuilder.sign(body, JWT_SIGNATURE);
}

function verifyToken(token){
    return  jwtBuilder.verify(token, JWT_SIGNATURE);
}

module.exports = {generateSignedToken, verifyToken}


