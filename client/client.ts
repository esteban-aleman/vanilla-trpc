import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server/server';

const apiUrl = "http://localhost:3008";

const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: apiUrl + '/trpc'
      })
    ]
});

async function fetchData() {
  // const resp = await fetch(apiUrl + "/api");
  // return resp.json();
  return client.page.query();
};

async function main() {
  let header = document.getElementById("main-header");
  const data = await fetchData();

  if (header) {
    header.textContent = data.title;
  }
};

window.onload = () => {
  main();
};
