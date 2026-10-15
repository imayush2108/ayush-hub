/**
 * Helper to ensure assets from public/ resolve properly across both
 * local development and GitHub Pages subpaths (e.g. /ayush-hub/)
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  let cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Automatically serve lightweight WebP version if requesting images/
  if (cleanPath.startsWith('images/') && (cleanPath.endsWith('.jpg') || cleanPath.endsWith('.jpeg'))) {
    cleanPath = cleanPath.replace(/\.(jpg|jpeg)$/i, '.webp');
  }
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}
