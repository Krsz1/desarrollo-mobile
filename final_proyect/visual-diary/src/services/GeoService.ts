export const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY as string;
  if (!apiKey) return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=es&limit=1&no_annotations=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.results?.length > 0) {
      return data.results[0].formatted as string;
    }
  } catch {
    // Fall through to coordinate fallback
  }

  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
};
