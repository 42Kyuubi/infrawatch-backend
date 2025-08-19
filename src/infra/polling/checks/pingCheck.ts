import ping from 'ping';

export async function PingCheck(host: string) {
  try {
    const res = await ping.promise.probe(host);
    return {
      status: res.alive ? 'UP' : 'DOWN',
      time: res.time ? Number(res.time) : null,
    };
  } catch (err) {
    return { status: 'ERROR', time: null };
  }
}
