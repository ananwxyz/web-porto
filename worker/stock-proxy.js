/**
 * Cloudflare Worker — Yahoo Finance API Proxy
 *
 * Deploy this as a Cloudflare Worker to proxy Yahoo Finance requests
 * and avoid CORS issues on your portfolio site.
 *
 * Setup:
 * 1. Go to Cloudflare Dashboard → Workers & Pages → Create Worker
 * 2. Paste this entire code into the editor
 * 3. Deploy the worker
 * 4. Note the worker URL (e.g. https://stock-proxy.<your-subdomain>.workers.dev)
 * 5. Update WORKER_URL in src/hooks/useStockPrice.js
 */

const YAHOO_BASE = 'https://query1.finance.yahoo.com';

// Allowed tickers to prevent abuse (add your tickers here)
const ALLOWED_TICKERS = ['PTRO.JK', 'TIRT.JK', 'BNBR.JK', 'BBCA.JK', 'BBRI.JK', 'TLKM.JK'];

export default {
    async fetch(request) {
        const url = new URL(request.url);

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: corsHeaders(),
            });
        }

        // Route: /quote/TICKER.JK
        const match = url.pathname.match(/^\/quote\/([A-Z0-9]+\.JK)$/);
        if (!match) {
            return jsonResponse({ error: 'Use /quote/TICKER.JK' }, 400);
        }

        const ticker = match[1];

        // Validate ticker
        if (!ALLOWED_TICKERS.includes(ticker)) {
            return jsonResponse({ error: 'Ticker not allowed' }, 403);
        }

        try {
            const yahooUrl = `${YAHOO_BASE}/v8/finance/chart/${ticker}?interval=1d&range=5d`;
            const yahooRes = await fetch(yahooUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                },
            });

            if (!yahooRes.ok) {
                return jsonResponse({ error: `Yahoo returned ${yahooRes.status}` }, yahooRes.status);
            }

            const data = await yahooRes.json();
            const meta = data.chart?.result?.[0]?.meta;

            if (!meta) {
                return jsonResponse({ error: 'No data from Yahoo' }, 502);
            }

            const currentPrice = meta.regularMarketPrice;
            const previousClose = meta.chartPreviousClose ?? meta.previousClose;
            const change = currentPrice - previousClose;
            const changePct = (change / previousClose) * 100;

            return jsonResponse({
                ticker,
                price: currentPrice,
                prevClose: previousClose,
                change: parseFloat(change.toFixed(2)),
                changePct: parseFloat(changePct.toFixed(2)),
                currency: meta.currency,
                updatedAt: new Date().toISOString(),
            }, 200, {
                'Cache-Control': 'public, max-age=300', // cache 5 min
            });

        } catch (err) {
            return jsonResponse({ error: err.message }, 500);
        }
    },
};

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
}

function jsonResponse(body, status = 200, extra = {}) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(),
            ...extra,
        },
    });
}
