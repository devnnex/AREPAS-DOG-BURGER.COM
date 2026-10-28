const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');

const root = path.resolve(__dirname, '..');
let browser, server, base;
let createUploadHandler;
const fixture = {
  products: Array.from({ length: 20 }, (_, i) => ({
    producto_id: `test-${i}`, categoria_id: 'hamburguesas', nombre: `Producto ${i}`,
    precio: 20000, descripcion: 'Producto de prueba', imagen: '', opciones: [], activo: true, orden: i
  })), extras: [{ extra_id: 'queso', nombre: 'Queso', precio: 2000, activo: true }]
};
fixture.products[1].imagen = 'Arepaburger.png';
fixture.products[2] = { ...fixture.products[2], producto_id: 'b1', nombre: 'Hamburguesa 3 Carnes' };

before(async () => {
  const edgeCode = await fs.readFile(path.join(root, 'supabase/functions/product-images/index.ts'), 'utf8');
  ({ createUploadHandler } = await import(`data:text/javascript;base64,${Buffer.from(edgeCode).toString('base64')}`));
  server = http.createServer(async (req, res) => {
    const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://local').pathname === '/' ? '/index.html' : new URL(req.url, 'http://local').pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try {
      const body = await fs.readFile(file);
      res.setHeader('Content-Type', { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png' }[path.extname(file)] || 'application/octet-stream');
      res.end(body);
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_PATH || undefined });
});
after(async () => { await browser?.close(); await new Promise(resolve => server?.close(resolve)); });

async function open(width = 1440) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const log = { gets: 0, writes: [], uploads: 0, failSave: false, failUpload: false, failRead: false };
  const menu = structuredClone(fixture);
  const uploadHandler = createUploadHandler({
    getEnv: name => ({ PRODUCT_IMAGE_ADMIN_PASSWORD: 'existing-admin-password', SUPABASE_SERVICE_ROLE_KEY: 'server-only-test-key',
      SUPABASE_URL: 'https://pnubnimuizpgprtkbcwk.supabase.co' })[name],
    fetchImpl: async (_url, options) => {
      log.uploads++;
      assert.equal(options.headers.Authorization, 'Bearer server-only-test-key');
      assert.ok(options.body.byteLength < 2 * 1024 * 1024);
      return Response.json({}, { status: log.failUpload ? 403 : 200 });
    }
  });
  await page.route('**/*', async route => {
    const request = route.request(), url = request.url();
    if (url.startsWith(base)) return route.continue();
    const json = data => route.fulfill({ contentType: 'application/json', body: JSON.stringify(data) });
    if (url.includes('script.google.com')) {
      if (request.method() === 'GET') {
        log.gets++;
        if (log.failRead) return route.abort();
        return json({ ok: true, data: menu });
      }
      log.writes.push(request.postDataJSON());
      if (!log.failSave) {
        const data = request.postDataJSON();
        if (data.action === 'upsertProduct') {
          const index = menu.products.findIndex(item => item.producto_id === data.product.producto_id);
          if (index < 0) menu.products.push(data.product);
          else menu.products[index] = data.product;
        }
        if (data.action === 'deleteProduct') menu.products = menu.products.filter(item => item.producto_id !== data.producto_id);
        if (data.action === 'upsertExtra') {
          const index = menu.extras.findIndex(item => item.extra_id === data.extra.extra_id);
          if (index < 0) menu.extras.push(data.extra);
          else menu.extras[index] = data.extra;
        }
      }
      return json(log.failSave ? { ok: false, error: 'Error de prueba' } : { ok: true });
    }
    if (url.includes('/functions/v1/product-images')) {
      const response = await uploadHandler(new Request(url, { method: request.method(), headers: request.headers(),
        ...(request.method() === 'POST' ? { body: request.postDataBuffer() } : {}) }));
      return route.fulfill({ status: response.status, headers: Object.fromEntries(response.headers), body: await response.text() });
    }
    return route.abort();
  });
  await page.goto(base);
  await page.waitForFunction(() => document.querySelectorAll('.product-card').length === 20);
  async function admin() {
    if (width < 621) { await page.locator('#menu-btn').dispatchEvent('click'); await page.click('#admin-open-menu'); }
    else await page.locator('#admin-open').dispatchEvent('click');
    await page.fill('#admin-token', 'existing-admin-password');
    await page.click('#admin-unlock');
    await page.click('[data-edit-product="test-0"]');
  }
  return { context, page, log, errors, admin };
}

async function chooseImage(page) {
  await page.setInputFiles('#product-image-file', path.join(root, 'images/Arepaburger.png'));
  await page.waitForFunction(() => document.querySelector('#product-image-status').textContent.includes('Lista para guardar'));
}
async function save(page) { await page.click('#product-form button[type=submit]'); }

test('existing CRUD, cart and image-free saves keep the current API contract', async () => {
  const { page, context, log, errors, admin } = await open();
  try {
    await page.click('[data-add-product="test-0"]');
    await page.waitForSelector('#product-modal:not(.hidden)');
    await page.click('#modal-close');
    await admin();
    await page.fill('#product-form input[name=nombre]', 'Producto editado');
    await save(page);
    await page.waitForFunction(() => document.querySelector('#product-form input[name=producto_id]').value === '');
    assert.equal(log.writes.length, 1);
    assert.equal(log.writes[0].action, 'upsertProduct');
    assert.equal(log.writes[0].product.nombre, 'Producto editado');
    assert.equal(log.writes[0].product.imagen, '');
    assert.equal(log.uploads, 0);
    assert.equal(log.gets, 1, 'saving does not download the entire menu');
    assert.ok(await page.locator('#catalog').textContent().then(x => x.includes('Producto editado')));
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
});

test('selection previews locally, uploads once, and retries failed product save without duplicating the photo', async () => {
  const { page, context, log, errors, admin } = await open();
  try {
    await admin();
    await chooseImage(page);
    assert.equal(log.uploads, 0);
    assert.match(await page.locator('#product-image-preview').getAttribute('src'), /^blob:/);
    log.failSave = true;
    await save(page);
    await page.waitForFunction(() => !document.querySelector('#product-form').inert);
    assert.equal(log.uploads, 1);
    assert.equal(await page.locator('#image-auth-dialog').count(), 0);
    assert.equal(log.writes.length, 1);
    const url = log.writes[0].product.imagen;
    assert.match(url, /\/storage\/v1\/object\/public\/product-images\/products\/.+\.webp$/);
    assert.equal(await page.inputValue('#product-form input[name=producto_id]'), 'test-0');
    log.failSave = false;
    await save(page);
    await page.waitForFunction(() => document.querySelector('#product-form input[name=producto_id]').value === '');
    assert.equal(log.uploads, 1);
    assert.equal(log.writes[1].product.imagen, url);
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
});

test('upload permission errors do not save a product or discard the selected photo', async () => {
  const { page, context, log, admin } = await open();
  try {
    await admin(); await chooseImage(page);
    log.failUpload = true;
    await save(page);
    await page.waitForFunction(() => !document.querySelector('#product-form').inert);
    assert.equal(log.writes.length, 0);
    assert.equal(await page.inputValue('#product-form input[name=producto_id]'), 'test-0');
    log.failUpload = false;
    await save(page);
    await page.waitForFunction(() => document.querySelector('#product-form input[name=producto_id]').value === '');
    assert.equal(log.uploads, 2);
    assert.equal(log.writes.length, 1);
  } finally { await context.close(); }
});

test('invalid images and cancelled selection leave products untouched', async () => {
  const { page, context, log, admin } = await open();
  try {
    await admin();
    await page.setInputFiles('#product-image-file', { name: 'bad.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg/>') });
    assert.match(await page.locator('#product-image-status').textContent(), /JPG, PNG o WebP/);
    await chooseImage(page);
    assert.equal(log.uploads, 0); assert.equal(log.writes.length, 0);
    await page.click('#product-cancel');
    assert.equal(await page.inputValue('#product-form input[name=imagen]'), '');
    assert.equal(await page.locator('#product-image-preview').getAttribute('src'), null);
  } finally { await context.close(); }
});

test('desktop and mobile have a single scroll surface and restore the page position', async () => {
  for (const width of [1440, 768, 390, 320]) {
    const { page, context, errors, admin } = await open(width);
    try {
      if (process.env.QA_SCREENSHOT_DIR) await page.screenshot({ path: path.join(process.env.QA_SCREENSHOT_DIR, `storefront-${width}.png`) });
      await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 400); });
      const before = await page.evaluate(() => window.scrollY);
      await admin();
      assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).overflowY), 'hidden');
      assert.equal(await page.evaluate(() => getComputedStyle(document.body).position), 'fixed');
      await page.locator('#product-image-picker').scrollIntoViewIfNeeded();
      await page.mouse.wheel(0, 600);
      assert.equal(await page.evaluate(() => window.scrollY), 0);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      assert.ok(await page.evaluate(() => document.querySelector('#admin-panel').scrollHeight > innerHeight));
      if (process.env.QA_SCREENSHOT_DIR) {
        await page.locator('#product-image-picker').screenshot({ path: path.join(process.env.QA_SCREENSHOT_DIR, `image-picker-${width}.png`) });
      }
      await page.click('#admin-close');
      assert.equal(await page.evaluate(() => getComputedStyle(document.body).position), 'static');
      assert.equal(await page.evaluate(() => window.scrollY), before);
      assert.deepEqual(errors, []);
    } finally { await context.close(); }
  }
});

test('cached menu stays visible while refreshing and survives a network failure', async () => {
  const { page, context, log } = await open();
  try {
    assert.ok(await page.evaluate(() => localStorage.getItem('adb_menu_v1')));
    log.failRead = true;
    await page.reload();
    await page.waitForFunction(() => document.querySelector('#sync-status').textContent === 'Sin conexión');
    assert.equal(await page.locator('.product-card').count(), 20);
    assert.ok(await page.locator('#app-loader').getAttribute('class').then(x => x.includes('hidden')));
  } finally { await context.close(); }
});

test('new products, permanent deletion and extra editing still work', async () => {
  const { page, context, log, errors, admin } = await open();
  try {
    await admin(); await page.click('#product-reset');
    await page.fill('#product-form input[name=categoria_id]', 'hamburguesas');
    await page.fill('#product-form input[name=nombre]', 'Producto nuevo');
    await page.fill('#product-form input[name=precio]', '25000');
    await save(page);
    await page.waitForFunction(() => document.querySelectorAll('#admin-product-list .admin-row').length === 21);
    assert.ok(log.writes[0].product.producto_id);
    assert.equal(log.writes[0].product.precio, 25000);
    page.once('dialog', dialog => dialog.accept());
    await page.click('[data-delete-product="test-0"]');
    await page.waitForFunction(() => document.querySelectorAll('#admin-product-list .admin-row').length === 20);
    assert.equal(log.writes[1].action, 'deleteProduct');
    assert.equal(log.writes[1].hardDelete, true);
    await page.click('[data-admin-tab=extras]');
    await page.click('[data-edit-extra=queso]');
    await page.fill('#extra-form input[name=precio]', '3500');
    await page.click('#extra-form button[type=submit]');
    await page.waitForFunction(() => document.querySelector('#extra-form input[name=extra_id]').value === '');
    assert.equal(log.writes[2].action, 'upsertExtra');
    assert.equal(log.writes[2].extra.precio, 3500);
    assert.equal(log.uploads, 0);
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
});

test('existing uploaded images survive ordinary edits and can be deleted and replaced', async () => {
  const { page, context, log, admin } = await open();
  try {
    await admin(); await chooseImage(page); await save(page);
    await page.waitForFunction(() => document.querySelector('#product-form input[name=producto_id]').value === '');
    const url = log.writes[0].product.imagen;
    await page.click('[data-edit-product="test-0"]');
    assert.equal(await page.inputValue('#product-form input[name=imagen]'), url);
    await page.fill('#product-form input[name=nombre]', 'Misma foto');
    await save(page);
    await page.waitForFunction(() => document.querySelector('#product-form input[name=producto_id]').value === '');
    assert.equal(log.writes[1].product.imagen, url);
    assert.equal(log.uploads, 1);
    await page.click('[data-edit-product="test-0"]');
    assert.equal(await page.locator('#product-image-browse').textContent(), 'Reemplazar foto');
    await page.click('#product-image-remove');
    await save(page);
    await page.waitForFunction(() => document.querySelector('#product-form input[name=producto_id]').value === '');
    assert.equal(log.writes[2].product.imagen, '__no_image__');
    assert.equal(log.uploads, 1);
    await page.click('[data-edit-product="test-0"]');
    assert.equal(await page.locator('#product-image-preview').getAttribute('src'), null);
    await chooseImage(page); await save(page);
    await page.waitForFunction(() => document.querySelector('#product-form input[name=producto_id]').value === '');
    assert.match(log.writes[3].product.imagen, /\/storage\/v1\/object\/public\//);
    assert.equal(log.uploads, 2);
  } finally { await context.close(); }
});

test('local and implicit default photos can be removed without returning on reload', async () => {
  const { page, context, log, errors, admin } = await open();
  try {
    await admin();
    assert.equal(await page.locator('#image-storage-connect').count(), 0);
    for (const id of ['test-1', 'b1']) {
      await page.click(`[data-edit-product="${id}"]`);
      assert.match(await page.locator('#product-image-preview').getAttribute('src'), /images\/.+\.png/);
      await page.click('#product-image-remove');
      assert.equal(await page.locator('#product-image-preview').getAttribute('src'), null);
      // Cancelling leaves the saved product photo in place.
      await page.click('#product-cancel');
      await page.click(`[data-edit-product="${id}"]`);
      assert.match(await page.locator('#product-image-preview').getAttribute('src'), /images\/.+\.png/);
      await page.click('#product-image-remove'); await save(page);
      await page.waitForFunction(() => document.querySelector('#product-form input[name=producto_id]').value === '');
      assert.equal(log.writes.at(-1).product.imagen, '__no_image__');
      const gets = log.gets;
      await page.click('#admin-reload');
      await page.waitForFunction(() => document.querySelector('#sync-status').textContent === 'Carta actualizada');
      assert.ok(log.gets > gets);
      await page.click(`[data-edit-product="${id}"]`);
      assert.equal(await page.locator('#product-image-preview').getAttribute('src'), null);
      assert.equal(await page.locator('#product-image-browse').textContent(), 'Elegir foto');
      assert.equal(await page.evaluate(productId => document.querySelector(`[data-add-product="${productId}"]`).closest('article').querySelector('img') === null, id), true);
    }
    assert.equal(log.uploads, 0);
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
});

test('the bottom bar only has the cart action and remains usable when empty or filled', async () => {
  for (const width of [1440, 390]) {
    const { page, context, errors } = await open(width);
    try {
      assert.equal(await page.locator('.bottom-dock button').count(), 1);
      assert.equal(await page.locator('.bottom-dock a').count(), 0);
      assert.equal(await page.locator('#floating-count').textContent(), '0');
      await page.click('#floating-cart');
      await page.waitForSelector('#cart-drawer:not(.hidden)');
      await page.click('#close-cart');
      await page.click('[data-add-product="test-0"]');
      await page.click('#add-configured-product');
      assert.equal(await page.locator('#floating-count').textContent(), '1');
      assert.equal(await page.locator('#cart-count').textContent(), '1');
      await page.click('#close-cart');
      await page.click('#floating-cart');
      assert.match(await page.locator('#cart-items').textContent(), /Producto 0/);
      assert.deepEqual(errors, []);
    } finally { await context.close(); }
  }
});
