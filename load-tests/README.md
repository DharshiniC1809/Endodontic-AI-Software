# Endodontic AI - Baseline & Load Testing Framework

This directory contains the complete performance and baseline load testing framework designed to validate system stability under normal expected concurrent user traffic (**100 Virtual Users continuously for 1 minute**).

---

## 🎯 Load Testing Goals & Target Metrics

| Metric | Target Specification | Explanation |
|---|---|---|
| **Virtual Users (VUs)** | `100 VUs` | 100 concurrent user sessions firing requests simultaneously |
| **Test Duration** | `1 minute (60s)` | Continuous load sustained over 60 seconds |
| **Requests Per Second (RPS)** | e.g. `120+ req/sec` | Number of successful API requests processed per second |
| **Average Response Time** | `< 300 ms` | Average time taken from request start to completion |
| **Min Response Time** | `~ 50 ms` | Fastest individual response time |
| **Max Response Time** | `< 1500 ms` | Worst-case / slowest individual response time |

---

## 🚀 How to Run Load Tests

### 1. Run Standard 1-Minute Baseline Load Test (100 VUs, 60s)
```bash
cd load-tests
node baseline-load-test.js
```

### 2. Run Quick 10-Second Baseline Test
```bash
node baseline-load-test.js --duration 10
```

### 3. Run Target Specific Backend URL
```bash
node baseline-load-test.js --target http://localhost:5000 --vus 100 --duration 60
```

---

## 📊 Sample Output Format

```text
======================================================================
                     LOAD TEST RESULT SUMMARY                         
======================================================================

📊 REQUESTS PER SECOND (RPS)
   RPS: 124.50 req/sec
   Meaning: Your API handled about 125 requests every second under 100 concurrent users.

⏱️ RESPONSE TIME METRICS
   Average : 248.20 ms
   Min     : 48.10 ms
   Max     : 1482.00 ms
   p50     : 210.00 ms (50% of requests faster than this)
   p95     : 420.00 ms (95% of requests faster than this)
   p99     : 890.00 ms

   Meaning:
   • Fastest response = 48.10 ms
   • Average response = 248.20 ms
   • Slowest response = 1.48 s (1482.00 ms)

📈 EXECUTIONS & HTTP STATUSES
   Total Requests Sent      : 7470
   Total Successful (2xx)   : 7470
   Total Failed / Errors    : 0
   Actual Run Duration      : 60.00 seconds
   Status Distribution      : { '200': 7470 }
----------------------------------------------------------------------

💡 PERFORMANCE VERDICT
   [SUCCESS]: API passed baseline load requirements! Excellent response times (<300ms avg) and zero errors under 100 VUs.
======================================================================
```
