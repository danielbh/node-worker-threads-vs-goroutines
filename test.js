import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: 10,
   duration: '30s',
};

export default function () {
  var res = http.get('http://host.docker.internal:8080');

  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}