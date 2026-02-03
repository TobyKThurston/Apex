import { domeClient, domeApiKey } from "@/lib/dome";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check if API key is set
    if (!domeApiKey) {
      return NextResponse.json({
        error: "DOME_API_KEY environment variable not set",
        hasApiKey: false,
      }, { status: 500 });
    }

    // Inspect SDK structure
    const sdkStructure = {
      hasClient: !!domeClient,
      clientKeys: domeClient ? Object.keys(domeClient) : [],
      hasPolymarket: !!domeClient?.polymarket,
      polymarketKeys: domeClient?.polymarket ? Object.keys(domeClient.polymarket) : [],
      hasKalshi: !!domeClient?.kalshi,
      kalshiKeys: domeClient?.kalshi ? Object.keys(domeClient.kalshi) : [],
    };

    // Test the SDK with Polymarket
    let sdkTestResult = null;
    let sdkTestError = null;
    let sdkTestStatus = "not_attempted";

    try {
      // Try to call SDK method
      if (domeClient.polymarket?.markets?.getMarkets) {
        sdkTestStatus = "attempting_getMarkets";
        sdkTestResult = await domeClient.polymarket.markets.getMarkets({ limit: 1 });
      } else if (domeClient.polymarket?.markets?.list) {
        sdkTestStatus = "attempting_list";
        sdkTestResult = await domeClient.polymarket.markets.list({ limit: 1 });
      } else if (domeClient.polymarket?.getMarkets) {
        sdkTestStatus = "attempting_getMarkets_direct";
        sdkTestResult = await domeClient.polymarket.getMarkets({ limit: 1 });
      } else {
        sdkTestError = "No recognized SDK method found for polymarket";
        sdkTestStatus = "no_method_found";
      }
    } catch (err: any) {
      sdkTestError = err.message || String(err);
      sdkTestStatus = "error";
    }

    return NextResponse.json({
      hasApiKey: true,
      apiKeyPrefix: domeApiKey.substring(0, Math.min(10, domeApiKey.length)) + "...",
      apiKeyLength: domeApiKey.length,
      sdkStructure,
      sdkTestStatus,
      sdkTestResult: sdkTestResult ? {
        type: typeof sdkTestResult,
        isArray: Array.isArray(sdkTestResult),
        keys: typeof sdkTestResult === 'object' && sdkTestResult !== null ? Object.keys(sdkTestResult) : [],
        sample: Array.isArray(sdkTestResult) 
          ? sdkTestResult.slice(0, 1) 
          : sdkTestResult?.markets?.slice(0, 1) || sdkTestResult?.data?.slice(0, 1) || sdkTestResult,
      } : null,
      sdkTestError,
      note: "Using DOME SDK (@dome-api/sdk)",
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || String(error),
      stack: error.stack,
    }, { status: 500 });
  }
}

