/**
 * Autocannon Programmatic Load Testing Runner
 */

const autocannon = require('autocannon');

async function runAutocannon() {
  console.log('Running Autocannon Load Test (100 Connections, 60s Duration)...');

  const result = await autocannon({
    url: process.env.TARGET_URL || 'http://localhost:5000',
    connections: 100,
    duration: 60,
    pipelining: 1
  });

  console.log('\n======================================================');
  console.log('            AUTOCANNON BENCHMARK REPORT               ');
  console.log('======================================================');
  console.log(` Requests per sec (RPS) : ${result.requests.average}`);
  console.log(` Latency Average        : ${result.latency.average} ms`);
  console.log(` Latency Min            : ${result.latency.min} ms`);
  console.log(` Latency Max            : ${result.latency.max} ms`);
  console.log(` Latency p95            : ${result.latency.p95} ms`);
  console.log(` Total Requests         : ${result.requests.total}`);
  console.log(` Total Bytes            : ${(result.throughput.total / 1024 / 1024).toFixed(2)} MB`);
  console.log('======================================================\n');
}

runAutocannon().catch(err => {
  console.error('Autocannon execution failed:', err);
});
