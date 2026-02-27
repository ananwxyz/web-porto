import { useState, useEffect } from 'react';

/**
 * ── CONFIGURATION ──
 * After deploying the Cloudflare Worker, paste your worker URL here.
 * Example: 'https://stock-proxy.your-subdomain.workers.dev'
 * Set to null to use fallback proxies instead.
 */
const WORKER_URL = null;

/**
 * Fetches real-time stock data for IDX stocks.
 *
 * Strategy order:
 * 1. Cloudflare Worker (if WORKER_URL is set — best for production)
 * 2. Vite dev proxy (works in local dev)
 * 3. allorigins.win proxy (fallback)
 */
export function useStockPrice(ticker) {
    const [data, setData] = useState({ price: null, prevClose: null, change: null, changePct: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchPrice() {
            setLoading(true);
            setError(null);
            try {
                let result = null;

                // Strategy 1: Cloudflare Worker (production)
                if (WORKER_URL) {
                    try {
                        const res = await fetch(`${WORKER_URL}/quote/${ticker}`);
                        if (res.ok) {
                            result = await res.json();
                        }
                    } catch (_) { /* fall through */ }
                }

                // Strategy 2: Vite dev proxy (local development)
                if (!result) {
                    try {
                        const res = await fetch(`/api/yahoo/v8/finance/chart/${ticker}?interval=1d&range=5d`);
                        if (res.ok) {
                            const json = await res.json();
                            const meta = json.chart?.result?.[0]?.meta;
                            if (meta) {
                                const currentPrice = meta.regularMarketPrice;
                                const previousClose = meta.chartPreviousClose ?? meta.previousClose;
                                result = {
                                    price: currentPrice,
                                    prevClose: previousClose,
                                    change: currentPrice - previousClose,
                                    changePct: ((currentPrice - previousClose) / previousClose) * 100,
                                };
                            }
                        }
                    } catch (_) { /* fall through */ }
                }

                // Strategy 3: allorigins fallback
                if (!result) {
                    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=5d`;
                    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(yahooUrl)}`;
                    const res = await fetch(proxyUrl);
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const json = await res.json();
                    const meta = json.chart?.result?.[0]?.meta;
                    if (!meta) throw new Error('No data');

                    const currentPrice = meta.regularMarketPrice;
                    const previousClose = meta.chartPreviousClose ?? meta.previousClose;
                    result = {
                        price: currentPrice,
                        prevClose: previousClose,
                        change: currentPrice - previousClose,
                        changePct: ((currentPrice - previousClose) / previousClose) * 100,
                    };
                }

                if (!result) throw new Error('All strategies failed');

                if (!cancelled) {
                    setData({
                        price: result.price,
                        prevClose: result.prevClose,
                        change: result.change,
                        changePct: result.changePct,
                    });
                }
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchPrice();

        // Refresh every 5 minutes
        const interval = setInterval(fetchPrice, 5 * 60 * 1000);
        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, [ticker]);

    return { ...data, loading, error };
}
