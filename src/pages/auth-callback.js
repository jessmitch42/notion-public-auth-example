import { getOAuthAccessToken, getUsers } from "@/lib/notion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userResults, setUserResults] = useState(false);
  const { code } = router.query;

  useEffect(() => {
    const getToken = async (code) => {
      // allows us to show loading state in UI
      setLoading(true);

      const response = await getOAuthAccessToken(code);
      setLoading(false);

      if (response.error) {
        setError(response.error);
      } else {
        setResults(response);
      }
    };
    /**
     * If there's a code param, we're in the auth flow.
     * We need to then take that code and make a request
     * to exchange the code for an access token.
     * If this page is viewed, there should always be a
     * code available.
     */
    if (code) {
      getToken(code);
    }
  }, [code]);

  const onClick = async () => {
    if (!results?.access_token) return;
    setLoading(true);
    const users = await getUsers(results?.access_token);
    console.log(users);
    setLoading(false);
    setUserResults(users.results);
  };

  return (
    <main>
      <Link href="/">Go home</Link>
      <section>
        <h2>Authorization results</h2>
        {code && <p>{code}</p>}
        {error && <h3>Error: {error}</h3>}
        {results && (
          <ul>
            <li>{results.access_token}</li>
            <li>{results.bot_id}</li>
            <li>{results.duplicated_template_id}</li>
            <li>{results.owner?.user?.name}</li>
            <li>{results.token_type}</li>
            <li>{results.workspace_icon}</li>
            <li>{results.workspace_id}</li>
            <li>{results.workspace_name}</li>
          </ul>
        )}
        {loading && <h3>Loading...</h3>}
      </section>
      {results?.access_token && (
        <section>
          <h2>Test API requests: Get users</h2>
          <p>
            Click the button below to test using the Notion API with the token
            you just created.
          </p>
          <p>
            <b>Note:</b> Your integration must have user capabilities enabled to
            use this endpoint. Visit your{" "}
            <a href="https://www.notion.so/my-integrations">
              integration settings
            </a>{" "}
            and go to the <b>Capabilities</b> tab to update as needed.
          </p>
          {/* Once we have a token, let's see if the token actually works for API requests */}
          <button onClick={onClick}>Test API</button>
          {userResults && (
            <>
              <h3>GET /users results</h3>
              <ul>
                {userResults.map((u, i) => (
                  <li key={i}>
                    {u.id}: {u.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}
    </main>
  );
}
