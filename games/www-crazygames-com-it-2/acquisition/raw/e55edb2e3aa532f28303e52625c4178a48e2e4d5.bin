const finite = value => Number.isFinite(value);
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));

// CSS-pixel camera only: battle coordinates and the simulation never change.
export class BoardCamera {
 constructor(worldWidth, worldHeight, {defaultZoom = 1, maxZoom = 2.2} = {}) {
  this.worldWidth = worldWidth; this.worldHeight = worldHeight;
  this.defaultZoom = defaultZoom; this.maxZoom = maxZoom;
  this.enabled = false; this.zoom = 1; this.scale = 1; this.fitScale = 1;
  this.width = 0; this.height = 0; this.offsetX = 0; this.offsetY = 0;
  this.desktopState = null;
 }
 center() { return {x: (this.width / 2 - this.offsetX) / this.scale, y: (this.height / 2 - this.offsetY) / this.scale}; }
 remember() { if (this.enabled) this.desktopState = {zoom: this.zoom, ...this.center()}; }
 clampOffsets() {
  const w = this.worldWidth * this.scale, h = this.worldHeight * this.scale;
  this.offsetX = w <= this.width ? (this.width - w) / 2 : clamp(this.offsetX, this.width - w, 0);
  this.offsetY = h <= this.height ? (this.height - h) / 2 : clamp(this.offsetY, this.height - h, 0);
 }
 placeCenter(x, y) {
  this.scale = this.fitScale * this.zoom;
  this.offsetX = this.width / 2 - x * this.scale;
  this.offsetY = this.height / 2 - y * this.scale;
  this.clampOffsets(); this.remember();
 }
 resize(width, height, enabled = false) {
  if (!finite(width) || !finite(height) || width <= 0 || height <= 0) return false;
  this.remember();
  const previous = this.desktopState;
  this.width = width; this.height = height; this.enabled = !!enabled;
  this.fitScale = Math.min(width / this.worldWidth, height / this.worldHeight);
  this.zoom = this.enabled ? clamp(previous?.zoom ?? this.defaultZoom, 1, this.maxZoom) : 1;
  this.placeCenter(this.enabled ? previous?.x ?? this.worldWidth / 2 : this.worldWidth / 2,
   this.enabled ? previous?.y ?? this.worldHeight / 2 : this.worldHeight / 2);
  return true;
 }
 screenToWorld(x, y) {
  if (!finite(x) || !finite(y) || x < 0 || y < 0 || x > this.width || y > this.height) return null;
  const wx = (x - this.offsetX) / this.scale, wy = (y - this.offsetY) / this.scale;
  if (wx < -1e-7 || wy < -1e-7 || wx > this.worldWidth + 1e-7 || wy > this.worldHeight + 1e-7) return null;
  return {x: clamp(wx, 0, this.worldWidth), y: clamp(wy, 0, this.worldHeight)};
 }
 worldToScreen(x, y) {
  return finite(x) && finite(y) ? {x: x * this.scale + this.offsetX, y: y * this.scale + this.offsetY} : null;
 }
 zoomBy(delta, x = this.width / 2, y = this.height / 2) {
  if (!this.enabled || !finite(delta)) return false;
  const zoom = clamp(this.zoom + delta, 1, this.maxZoom);
  if (zoom === this.zoom) return false;
  x = finite(x) ? clamp(x, 0, this.width) : this.width / 2;
  y = finite(y) ? clamp(y, 0, this.height) : this.height / 2;
  const wx = (x - this.offsetX) / this.scale, wy = (y - this.offsetY) / this.scale;
  this.zoom = zoom; this.scale = this.fitScale * zoom;
  this.offsetX = x - wx * this.scale; this.offsetY = y - wy * this.scale;
  this.clampOffsets(); this.remember(); return true;
 }
 fitBoard() {
  const changed = this.zoom !== 1;
  this.zoom = 1; this.placeCenter(this.worldWidth / 2, this.worldHeight / 2);
  return changed;
 }
 focusPlayer() {
  if (!this.enabled) return false;
  this.zoom = this.defaultZoom; this.placeCenter(this.worldWidth / 2, this.worldHeight * .72); return true;
 }
 panBy(dx, dy) {
  if (!this.enabled || !finite(dx) || !finite(dy)) return false;
  const x = this.offsetX, y = this.offsetY;
  this.offsetX += dx; this.offsetY += dy; this.clampOffsets(); this.remember();
  return this.offsetX !== x || this.offsetY !== y;
 }
 ensureVisible(x, y, inset = 30) {
  if (!this.enabled || !finite(x) || !finite(y) || x < 0 || y < 0 || x > this.worldWidth || y > this.worldHeight) return false;
  const p = this.worldToScreen(x, y), marginX = Math.min(inset, this.width / 4), marginY = Math.min(inset, this.height / 4);
  const dx = p.x < marginX ? marginX - p.x : p.x > this.width - marginX ? this.width - marginX - p.x : 0;
  const dy = p.y < marginY ? marginY - p.y : p.y > this.height - marginY ? this.height - marginY - p.y : 0;
  return this.panBy(dx, dy);
 }
}
