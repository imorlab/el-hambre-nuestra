export function openInMaps(nombre, location) {
  const query = encodeURIComponent(`${nombre}, ${location}, España`);
  const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
  window.open(url, '_blank');
}