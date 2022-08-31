const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '12h';

module.exports = {
  authMiddleware({ req }) {
    // Allows token to be sent via req.body, req.query, or headers
    // there are lots of different ways to send token to backend
    let token = req.headers?.authorization || req.body?.token || req.query?.token;

    // if came from header, then it would have the word bearer with a space and then the actual token.
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // if no token anywhere in the req, return the req with no user (which would have auth info)
    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration }); // verify the token and ge thte data from it if is verified
      req.user = data; // put data as user in the req
    } catch (err) {
      console.error(err);
      console.log('Invalid token');
    }

    return req; // return the req with the new user attached
  },
  signToken({ first_name, last_name, username, email, _id }) {
    const payload = { first_name, last_name, username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};