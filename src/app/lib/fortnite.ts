// src/app/lib/fortnite.ts
const API_URL = "https://fortnite-api.com/v2";
const API_KEY = process.env.FORTNITE_API_KEY as string;

const fetchFromAPI = async (endpoint: string) => { 
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: API_KEY,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Fortnite API error: ${res.status}`); 
  }

  return res.json();
};

export async function getAllCosmetics() {
  return fetchFromAPI("/cosmetics/br");
}

export async function getNewCosmetics() {
  return fetchFromAPI("/cosmetics/br/new");
}

export async function getShop() {
  return fetchFromAPI("/shop/br");
}