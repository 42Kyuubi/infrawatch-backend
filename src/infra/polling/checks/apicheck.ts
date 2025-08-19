import axios from 'axios';

interface IApiCheck
{
    status: string,
    time: null | number,
    headers: {}
}

export async function Apicheck(url: string): Promise<IApiCheck> {
  const start = Date.now();
  try {
    const res = await axios.get(`https://${url}`, { timeout: 5000 });
    const duration = Date.now() - start;
    return {
      status: res.status >= 200 && res.status < 400 ? 'UP' : 'DOWN',
      time: duration,
      headers: res.headers
    };
  } catch {
    return { status: 'DOWN', time: null, headers: {} };
  }
}
