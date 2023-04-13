// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // Add whatever request types you want to handle
  switch (req.method) {
    case "POST":
      const { code } = JSON.parse(req.body);

      // use env variables
      const clientId = process.env.OAUTH_CLIENT_ID;
      const clientSecret = process.env.OAUTH_CLIENT_SECRET;
      const redirectUri = process.env.OAUTH_REDIRECT_URI;

      // encode in base 64
      const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString(
        "base64"
      );

      try {
        const response = await fetch("https://api.notion.com/v1/oauth/token", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${encoded}`,
          },
          body: JSON.stringify({
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
          }),
        });

        res.status(200).json(await response.json());
      } catch (error) {
        res.status(500).json({ error, response });
      }

      break;
    default:
      res.status(200).json({ method: req.method });
      break;
  }
}
