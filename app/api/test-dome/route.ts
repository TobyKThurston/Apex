import { domeApiKey, DOME_API_BASE_URL } from "@/lib/dome";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = `${DOME_API_BASE_URL}/polymarket/markets?limit=1`;
    
    console.log(`[Test] Testing Dome API call:`);
    console.log(`[Test] URL: ${url}`);
    console.log(`[Test] API Key length: ${domeApiKey.length}`);
    console.log(`[Test] API Key (first 20 chars): ${domeApiKey.substring(0, 20)}...`);
    console.log(`[Test] Authorization header will be: Bearer ${domeApiKey.substring(0, 20)}...`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${domeApiKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    const responseText = await response.text();
    
    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText.substring(0, 500), // First 500 chars
      url,
      apiKeyLength: domeApiKey.length,
      apiKeyPrefix: domeApiKey.substring(0, 20),
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || String(error),
      stack: error.stack,
    }, { status: 500 });
  }
}

