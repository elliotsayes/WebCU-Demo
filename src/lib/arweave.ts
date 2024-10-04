export async function fetchTxIdData(txId: string) {
  const res = await fetch(`https://arweave.net/${txId}`);
  const data = await res.arrayBuffer();
  return new Uint8Array(data);
}