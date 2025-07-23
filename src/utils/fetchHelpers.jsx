import { json } from "react-router-dom";

export async function getFetching(
  urlString,
  messageString,
  responseType = "json"
) {
  const response = await fetch(urlString, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      return null;
    }
    throw json({ status: 500, message: messageString });
  }

  if (responseType === "text") {
    return await response.text();
  }

  return await response.json();
}

export async function postFetching(urlString, bodyData, messageString) {
  const response = await fetch(urlString, {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) {
    throw json({ status: 500, message: messageString });
  }

  return await response.json();
}
