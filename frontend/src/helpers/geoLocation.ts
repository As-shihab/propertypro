import { useEffect, useState } from "react";

export const useGeoLocation = () => {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setData({ error: "Geolocation is not supported by your browser" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const locationData = await res.json();

          setData({
            latitude,
            longitude,
            address: locationData.address,
            display_name: locationData.display_name,
            raw: locationData,
          });
        } catch (err) {
          setData({ error: "Failed to reverse geocode location" });
        }
      },
      (error) => {
        setData({ error: error.message });
      }
    );
  }, []);

  return data;
};
