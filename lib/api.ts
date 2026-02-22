export const BASE_URL = 'https://esim.sm/api/v2/evaluate';

export const getCountries = async (query: string) => {
  return fetch(BASE_URL + '/countries?' + query).then((res) => res.json());
};

export const getParams = async () => {
  return fetch(BASE_URL + '/params').then((res) => res.json());
};
