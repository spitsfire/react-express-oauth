const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("<CLIENT_ID>");

const googleAuth = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: "<CLIENT_ID>",
  });
  if (ticket) {
    const payload = ticket.getPayload();
    const { sub, email, name, given_name } = payload;
    return { sub, email, name, given_name };
  } else {
    console.log(ticket);
  }
};

module.exports = googleAuth;
