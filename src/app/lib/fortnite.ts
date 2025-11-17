// src/app/lib/fortnite.ts
const API_URL = "https://fortnite-api.com/v2";
const API_KEY = process.env.FORTNITE_API_KEY as string;

const fetchFromAPI = async (endpoint: string) => { 
  if (!API_KEY || API_KEY === 'your_fortnite_api_key_here') {
    throw new Error('FORTNITE_API_KEY não configurada. Configure no arquivo .env');
  }

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
  try {
    return await fetchFromAPI("/cosmetics/br");
  } catch (error) {
    console.error('Erro ao buscar cosméticos:', error);
    throw error;
  }
}

export async function getNewCosmetics() {
  try {
    return await fetchFromAPI("/cosmetics/br/new");
  } catch (error) {
    console.error('Erro ao buscar cosméticos novos:', error);
    throw error;
  }
}

export async function getShop() {
  try {
    return await fetchFromAPI("/shop/br");
  } catch (error) {
    console.error('Erro ao buscar loja:', error);
    throw error;
  }
}

// Função auxiliar para transformar dados da API em formato do nosso tipo Cosmetic
export function transformCosmeticData(item: any) {
  // Priorizar imagens de maior qualidade
  const image = item.images?.featured ?? 
                item.images?.icon ?? 
                item.images?.smallIcon ?? 
                item.images?.background ?? 
                null;
  
  return {
    id: item.id || Math.random().toString(36).substr(2, 9),
    externalId: item.id,
    name: item.name || 'Sem nome',
    description: item.description || null,
    image: image,
    rarity: item.rarity?.value || null,
    type: item.type?.value || null,
    price: item.price || 0,
    isNew: false,
    available: false,
  };
}

