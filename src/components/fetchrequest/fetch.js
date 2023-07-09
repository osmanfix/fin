
import store from "../../store/store";
import { setResult } from "../../store/types";

export async function docFetch(array) {
  const token = store.getState().authenticated.accessToken;
  try {
    const response = await fetch("https://gateway.scan-interfax.ru/api/v1/documents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: array,
      }),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log(data);
    store.dispatch(setResult(data));
  } catch (error) {
    console.error(error);
  }
}