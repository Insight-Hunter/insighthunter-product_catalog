
export async function onRequest() {
  return new Response(JSON.stringify({
    full: "Available",
    fAFP: "Available",
    lite: "Available",
    forms: "Available",
    standard: "Available"
  }, null, 2), {
    headers: { "content-type": "application/json" }
  });
}
