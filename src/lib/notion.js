const getOAuthAccessToken = async (code) => {
  try {
    const response = await fetch("/api/notion", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error(err);
  }
}


export {
  getOAuthAccessToken
}