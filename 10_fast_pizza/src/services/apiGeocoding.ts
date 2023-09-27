export async function getAddress({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<
  Partial<{
    latitude: number;
    longitude: number;
    lookupSource: string;
    localityLanguageRequested: string;
    continent: string;
    continentCode: string;
    countryName: string;
    countryCode: string;
    principalSubdivision: string;
    principalSubdivisionCode: string;
    city: string;
    locality: string;
    postcode: string;
    localityInfo: {
      administrative: unknown[];
      informative: unknown[];
    };
  }>
> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}
