import { getAddress } from "../../services/apiGeocoding";

// coords: {
// accuracy : 1
// altitude : null
// altitudeAccuracy : null
// heading : null
// latitude : 48.8582
// longitude : 2.3387
// speed : null
// }
// timestamp : 1695796155286
function getPosition() {
  return new Promise<{
    coords: { latitude: number; longitude: number };
    timestamp: number;
  }>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export async function fetchAddress() {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
}
