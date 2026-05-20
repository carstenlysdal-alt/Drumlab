const cp = require('child_process');
const http = require('http');
const fs = require('fs');

let logs = '';
function log(msg) {
  const line = `[wrapper] ${new Date().toISOString()} - ${msg}\n`;
  logs += line;
  console.log(line.trim());
}

log('Starting Next.js production server...');

const nextBin = './node_modules/.bin/next';
log(`Executing: ${nextBin} start`);

const nextProc = cp.spawn(nextBin, ['start'], {
  env: {
    ...process.env,
    HOSTNAME: '0.0.0.0',
    PORT: '3000'
  }
});

nextProc.stdout.on('data', (data) => {
  const msg = data.toString();
  logs += msg;
  process.stdout.write(msg);
});

nextProc.stderr.on('data', (data) => {
  const msg = data.toString();
  logs += msg;
  process.stderr.write(msg);
});

nextProc.on('error', (err) => {
  log(`Failed to spawn Next.js: ${err.message}`);
  startFallbackServer(err.message, -1);
});

nextProc.on('exit', (code, signal) => {
  log(`Next.js exited with code ${code} and signal ${signal}`);
  if (code !== 0) {
    startFallbackServer(`Next.js exited with code ${code} (signal: ${signal})`, code);
  }
});

function startFallbackServer(reason, code) {
  log(`Starting fallback server on port 3000 due to: ${reason}`);
  try {
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.write(`CRITICAL: Next.js failed to start on Railway!\n`);
      res.write(`Reason: ${reason}\n`);
      res.write(`Exit Code: ${code}\n\n`);
      res.write(`--- STARTUP LOGS ---\n`);
      res.write(logs);
      res.end();
    });

    server.listen(3000, '0.0.0.0', () => {
      log('Fallback server successfully listening on 0.0.0.0:3000');
    });
  } catch (err) {
    console.error('Failed to start fallback server:', err);
  }
}
