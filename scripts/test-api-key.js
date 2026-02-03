// Test script to verify API key format
const fs = require('fs');
const path = require('path');

// Read .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

// Extract DOME_API_KEY
const match = envContent.match(/^DOME_API_KEY=(.+)$/m);
if (!match) {
  console.error('DOME_API_KEY not found in .env.local');
  process.exit(1);
}

const apiKey = match[1].replace(/^["']|["']$/g, '').trim();

console.log('API Key from .env.local:');
console.log(`  Length: ${apiKey.length}`);
console.log(`  Value: "${apiKey}"`);
console.log(`  First 20 chars: ${apiKey.substring(0, 20)}...`);
console.log(`  Last 20 chars: ...${apiKey.substring(apiKey.length - 20)}`);
console.log(`  Expected: "1e31480f-cbf4-4267-926f-b5ef36af0392"`);
console.log(`  Match: ${apiKey === '1e31480f-cbf4-4267-926f-b5ef36af0392' ? '✅ YES' : '❌ NO'}`);

// Check for hidden characters
const charCodes = apiKey.split('').map((c, i) => `${i}:${c.charCodeAt(0)}`).slice(0, 10);
console.log(`  First 10 char codes: ${charCodes.join(', ')}`);

// Test fetch
const fetch = require('node-fetch');
const url = 'https://api.domeapi.io/v1/polymarket/markets?limit=1';

console.log('\nTesting API call:');
console.log(`  URL: ${url}`);
console.log(`  Auth header: Bearer ${apiKey.substring(0, 20)}...`);

fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
  },
})
  .then(async (res) => {
    const text = await res.text();
    console.log(`  Status: ${res.status} ${res.statusText}`);
    console.log(`  Response: ${text.substring(0, 200)}`);
    if (res.ok) {
      console.log('  ✅ SUCCESS!');
    } else {
      console.log('  ❌ FAILED');
    }
  })
  .catch((err) => {
    console.error('  Error:', err.message);
  });

