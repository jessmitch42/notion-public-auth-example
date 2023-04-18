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
