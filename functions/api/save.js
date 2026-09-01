/**
 * Cloudflare Pages Function: POST /api/save
 * Receives edited site content from admin.html and saves to Cloudflare KV.
 */

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    const payload = await context.request.json();
    if (!payload || !payload.content) {
      return new Response(JSON.stringify({ error: 'Missing content payload' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // Save to Cloudflare KV if configured
    if (context.env && context.env.EBWASH_KV) {
      await context.env.EBWASH_KV.put('site_content', JSON.stringify(payload.content));
      return new Response(JSON.stringify({ success: true, message: 'Saved to Cloudflare KV' }), {
        status: 200,
        headers: corsHeaders
      });
    }

    // If KV not yet attached, return success for local handling
    return new Response(JSON.stringify({ success: true, message: 'Content received (Local mode)' }), {
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
