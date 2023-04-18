import { Client } from "@notionhq/client";
let notion;

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

const setToken = (token) => {
  notion = new Client({ auth: token });
}

const getUsers = async (token) => {
  // set token before making api request
  if (!notion) {
    setToken(token)
  }

  try {
    const response = await notion.users.list();
    return response.results;
  } catch (error) {
    console.error(error);
  }
};

export {
  getOAuthAccessToken,
  getUsers
}