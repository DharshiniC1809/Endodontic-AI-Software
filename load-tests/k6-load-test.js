import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * Grafana k6 Baseline Load Testing Script
 * Specification:
 *  - 100 Virtual Users (VUs)
 *  - 1 Minute Duration
 */
export const options = {
  stages: [
    { duration: '10s', target: 100 }, // Ramp-up to 100 VUs in 10s
    { duration: '50s', target: 100 }, // Stay at 100 VUs for 50s
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],    // Error rate must be below 1%
  },
};

export default function () {
  const BASE_URL = __ENV.TARGET_URL || 'http://localhost:5000';

  // 1. GET Health Check Endpoint
  const resHealth = http.get(`${BASE_URL}/`);
  check(resHealth, {
    'status is 200': (r) => r.status === 200,
    'response time < 300ms': (r) => r.timings.duration < 300,
  });

  // 2. GET API Cases Endpoint
  const resAnalysis = http.get(`${BASE_URL}/api/analysis`);
  check(resAnalysis, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(0.5); // 500ms think time between requests
}
