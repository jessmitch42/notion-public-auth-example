import { getOAuthAccessToken } from "@/lib/notion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const { code } = router.query;

  useEffect(() => {
    const getToken = async (code) => {
      const response = await getOAuthAccessToken(code);
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
  return (
    <main>
      <Link href="/">Go home</Link>
      <section>
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
      </section>
    </main>
  );
}
