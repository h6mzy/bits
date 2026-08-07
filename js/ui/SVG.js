/**
 * SVG
 * Lightweight SVG loader/cache.
 *
 * Usage:
 *
 * import Svg from "./svg.js";
 *
 * Svg.base = "https://cdn.jsdelivr.net/gh/h6mzy/foob@0.2.1/demo/svg/";
 *
 * await Svg.preload([
 *   "ACL.svg",
 *   "PL.svg",
 *   "LIV.svg"
 * ]);
 *
 * const html = `
 *   <div class="logo">
 *     ${Svg.get("ACL.svg")}
 *   </div>
 * `;
 */

const cache = new Map();

const EMPTY_SVG = "<svg></svg>";

let base = "";

const resolve = url =>
  /^https?:\/\//.test(url)
    ? url
    : base + url;

async function load(url) {
  url = resolve(url);

  if (cache.has(url))
    return cache.get(url);

  try {
    const res = await fetch(url);

    if (!res.ok)
      throw new Error(`${res.status} ${res.statusText}`);

    const svg = await res.text();

    cache.set(url, svg);

    return svg;

  } catch (err) {
    console.warn(`SVG not found: ${url}`);

    cache.set(url, EMPTY_SVG);

    return EMPTY_SVG;
  }
}

async function preload(urls = []) {
  await Promise.all(
    [...new Set(urls)].map(load)
  );
}

function get(url) {
  return cache.get(resolve(url)) ?? EMPTY_SVG;
}

function has(url) {
  return cache.has(resolve(url));
}

function remove(url) {
  cache.delete(resolve(url));
}

function clear() {
  cache.clear();
}

export default {
  get base() {
    return base;
  },

  set base(value) {
    base = value.endsWith("/") ? value : value + "/";
  },

  load,
  preload,
  get,
  has,
  remove,
  clear
};
