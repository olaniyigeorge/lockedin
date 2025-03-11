import http from 'k6/http';
import { sleep, check } from 'k6';

const DOMAIN = "http://localhost.3000"


export const options = {
  vus: 10,
  duration: '30s',
};

export default function() {
  let res = http.get(`${DOMAIN}`); // https://lockedin-seven.vercel.app/
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}
