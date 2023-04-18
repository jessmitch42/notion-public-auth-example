// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // Add whatever request types you want to handle
  switch (req.method) {
    case "POST":
      const { token } = JSON.parse(req.body);

      try {
        // This example is a GET request but it's under the POST condition to pass the token.
        // In a production app, you wouldn't pass a token around and would instead store
        // it securely -- for example, in a database.
        // This example is for demo purposes only.
        const response = await fetch("https://api.notion.com/v1/users", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        res.status(200).json({ response });
      } catch (error) {
        res.status(500).json({ error, response });
      }

      break;
    default:
      res.status(200).json({ method: req.method });
      break;
  }
}
