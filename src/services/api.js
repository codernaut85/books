
const post = async (baseURL, endpoint, params = {}) => {
  const response = await fetch(`${baseURL}${endpoint}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
  return response.json();
};

const apiServices = {
  post
};

export default apiServices;


