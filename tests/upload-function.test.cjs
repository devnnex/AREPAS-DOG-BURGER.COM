const { test, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
let createUploadHandler, png;
const config = { SUPABASE_SERVICE_ROLE_KEY: 'server-private-key',
  SUPABASE_URL: 'https://pnubnimuizpgprtkbcwk.supabase.co' };
let currentPassword = 'current-admin-password';

function createHandler(options) {
  return createUploadHandler({ ...options, fetchImpl: async (url, request) => {
    if (url.includes('script.google.com')) {
      const body = JSON.parse(request.body);
      assert.equal(body.action, 'validateAdmin');
      assert.equal(body.token, body.password);
      return Response.json({ ok: false, error: body.password === currentPassword
        ? 'Accion POST no soportada: validateAdmin' : 'Contrasena de administrador invalida.' });
    }
    return options.fetchImpl(url, request);
  } });
}

before(async () => {
  const code = await fs.readFile(path.join(__dirname, '../supabase/functions/product-images/index.ts'), 'utf8');
  ({ createUploadHandler } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`));
  png = await fs.readFile(path.join(__dirname, '../images/Arepaburger.png'));
});

function request({ password = 'current-admin-password', objectPath = `products/${crypto.randomUUID()}.png`, bytes = png, type = 'image/png' } = {}) {
  const form = new FormData();
  if (password !== null) form.append('password', password);
  form.append('path', objectPath);
  form.append('file', new Blob([bytes], { type }), 'photo.png');
  return new Request('https://example.test/functions/v1/product-images', { method: 'POST', body: form });
}

test('uploads require the existing admin password and keep privileged keys server-side', async () => {
  const uploads = [];
  const handler = createHandler({ getEnv: name => config[name], fetchImpl: async (url, options) => {
    uploads.push({ url, options });
    return Response.json({});
  } });
  assert.equal((await handler(request({ password: null }))).status, 401);
  assert.equal((await handler(request({ password: 'wrong' }))).status, 401);
  assert.equal(uploads.length, 0);
  const response = await handler(request());
  assert.equal(response.status, 200);
  assert.equal(uploads.length, 1);
  assert.equal(uploads[0].options.headers.Authorization, 'Bearer server-private-key');
  const body = await response.text();
  assert.match(body, /\/storage\/v1\/object\/public\/product-images\/products\//);
  assert.ok(!body.includes(config.SUPABASE_SERVICE_ROLE_KEY));
  assert.ok(!body.includes(currentPassword));
});

test('invalid files, oversized bodies and paths cannot reach Storage', async () => {
  const handler = createHandler({ getEnv: name => config[name], fetchImpl: async () => { assert.fail('must not upload invalid input'); } });
  assert.equal((await handler(request({ bytes: Buffer.from('<script>') }))).status, 400);
  assert.equal((await handler(request({ objectPath: '../other/file.png' }))).status, 400);
  assert.equal((await handler(request({ type: 'image/svg+xml' }))).status, 400);
  assert.equal((await handler(request({ bytes: Buffer.alloc(2 * 1024 * 1024 + 1) }))).status, 400);
  const largeForm = request({ bytes: Buffer.alloc(3 * 1024 * 1024) });
  const largeRequest = new Request(largeForm.url, { method: 'POST', headers: largeForm.headers, body: await largeForm.arrayBuffer() });
  assert.equal((await handler(largeRequest)).status, 413);
  assert.equal((await handler(new Request('https://example.test', { method: 'OPTIONS' }))).status, 204);
});

test('missing configuration fails closed and an interrupted-upload retry can reuse its URL', async () => {
  const unavailable = createUploadHandler({ getEnv: () => undefined });
  assert.equal((await unavailable(request())).status, 503);
  const duplicate = createHandler({ getEnv: name => config[name], fetchImpl: async () => Response.json({ error: 'Duplicate' }, { status: 409 }) });
  assert.equal((await duplicate(request())).status, 200);
  const failed = createHandler({ getEnv: name => config[name], fetchImpl: async () => Response.json({ error: 'denied' }, { status: 403 }) });
  assert.equal((await failed(request())).status, 502);
});

test('authentication fails closed for unknown upstream replies and follows password changes', async () => {
  for (const response of [Response.json({ ok: false, error: 'Another error' }), Response.json({}, { status: 503 }),
    new Response('<html>Sign in</html>')]) {
    const handler = createUploadHandler({ getEnv: name => config[name], fetchImpl: async () => response });
    assert.notEqual((await handler(request())).status, 200);
  }
  const handler = createHandler({ getEnv: name => config[name], fetchImpl: async () => Response.json({}) });
  currentPassword = 'new-backend-password';
  try {
    assert.equal((await handler(request())).status, 401);
    assert.equal((await handler(request({ password: currentPassword }))).status, 200);
  } finally { currentPassword = 'current-admin-password'; }
});

test('JSON login validation never writes files and only permits verified administrator access', async () => {
  const handler = createHandler({ getEnv: name => config[name], fetchImpl: async () => assert.fail('login must not write files') });
  const login = password => new Request('https://example.test', { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'validateAdmin', password }) });
  assert.equal((await handler(login('wrong'))).status, 401);
  const valid = await handler(login(currentPassword));
  assert.equal(valid.status, 200);
  assert.deepEqual(await valid.json(), { ok: true });
});
