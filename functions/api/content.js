/**
 * Cloudflare Pages Function: GET /api/content
 * Retrieves the latest saved content from Cloudflare KV or returns defaults.
 */

export async function onRequestGet(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    // If Cloudflare KV is bound (EBWASH_KV)
    if (context.env && context.env.EBWASH_KV) {
      const stored = await context.env.EBWASH_KV.get('site_content', { type: 'json' });
      if (stored) {
        return new Response(JSON.stringify(stored), {
          status: 200,
          headers: corsHeaders
        });
      }
    }

    // Fallback: If KV is not yet bound, return empty JSON with status 204 or 404
    return new Response(JSON.stringify({ message: 'Using local storage content' }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
