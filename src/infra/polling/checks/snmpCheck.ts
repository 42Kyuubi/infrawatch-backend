import snmp from 'net-snmp';

export async function snmpCheck(host: string, oid: string) {
  return new Promise((resolve) => {
    const session = snmp.createSession(host, "public", { timeout: 2000 });
    session.get([oid], (error, varbinds) => {
      if (error) {
        resolve({ status: 'ERROR', data: null });
      } else {
        resolve({ status: 'UP', data: varbinds[0]?.value || null });
      }
      session.close();
    });
  });
}
