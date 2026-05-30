export const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=es`;
    const res = await fetch(url, {
      headers: { "User-Agent": "LunaraApp/1.0" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.display_name) {
      return data.display_name as string;
    }
  } catch {
    // Fall through to coordinate fallback
  }

  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
};
