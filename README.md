## Notion public integration example
This demo app showcases a basic example of how to set up a Notion integration with public authorization. To learn more about the types of integrations available through the Notion public REST API and how authorization works, read the Notion [Authorization guide](https://developers.notion.com/docs/authorization).

Please refer to Next.js's [documentation](https://nextjs.org/docs/getting-started) for additional information on building with Next.js.

This demo does _not_ use the <a href="https://github.com/makenotion/notion-sdk-js">Notion JavaScript API</a>, but the API requests used can be converted to use the JS SDK. 

## Running locally

1. Clone this repo locally.

```bash
# Clone this repository locally
git clone [repo URL]

# Switch into this project
cd notion-public-auth-example/

# Install dependencies
npm install
```

2. Create a Notion integration at [notion.co/my-integrations](notion.co/my-integrations). Integrations are internal (not public) by default. To make the integration public, follow the instructions found in the [Authorization guide](https://developers.notion.com/docs/authorization#how-to-make-an-integration-public).
3. Public integrations require a redirect URI from a domain that you own. A simple way to create a redirect URI is to deploy this repo on [Vercel](https://vercel.com/), which will provide a private domain. If you are going to test this demo app, the easiest and faster way to do so is to deploy your copy of the repo on Vercel and use `<your-vercel-domain.com>/auth-callback` as the redirect URI. The `/auth-callback` path will map to the `AuthCallback` component found in `/pages/auth-callback.js` in this repo.
4. Create a `.env` file with the following environment variables:

```
NOTION_AUTH_URL=<your-auth-url>
OAUTH_CLIENT_ID=<your-client-id>
OAUTH_CLIENT_SECRET=<your-client-secret>
OAUTH_REDIRECT_URI=<your-redirect-uri>
```

All of these variables are available in [notion.so/my-integrations](https://www.notion.so/my-integrations) under the **Secrets** tab after you have created an integration and set it to be public.
![Secrets](https://files.readme.io/a3fff5d-authorization_url.png)
The redirect URI is the only value not specifically listed in the **Secrets** tab, but is the value you submitted when making the integration public. It can be found under the **Distribution** tab in your integration settings.

**Remember to add these environment variables to your Vercel project, as well.** Go to Settings > Environment Variables, and update accordingly.

5. To start your local server, run `npm run dev` in a terminal. Note: Since the redirect URI will point to the deployed version, running the project locally will also redirect users to the deployed redirect URI.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
