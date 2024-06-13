import axios from 'axios';

export const getEmojis: () => Promise<{[key: string]: string}> = async () => {
  try {
    const data = {};
    const url = 'https://api.github.com/emojis';
    const options = {
      method: 'GET',
      headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      data: data,
      url,
    }
    const response = await axios(options)
    return response.data;
  } catch(error) {
    console.error(error);
  }
}