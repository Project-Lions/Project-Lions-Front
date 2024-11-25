const BASE_URL = 'https://api.example.com';

export const fetchShopsByTag = async (tag, latitude, longitude, accessToken) => {
  try {
    const response = await fetch(
      `${BASE_URL}/shops?tag=${tag}&latitude=${latitude}&longitude=${longitude}`,
      {
        method: 'GET',
        headers: {
          Auth: accessToken, // 적절한 토큰 입력
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error;
  }
};
