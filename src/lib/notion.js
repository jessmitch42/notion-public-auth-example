const getOAuthAccessToken = async (code) => {
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error(err);
  }
};

const getUsers = async (token) => {
  // You wouldn't typically pass the token client-side, as it exposes
  // the token, which should be kept secret.
  // This is a demo example to confirm API requests work with the token
  // you've just created. In production apps, store your token more securely.
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error(err);
  }
};

export { getOAuthAccessToken, getUsers };
