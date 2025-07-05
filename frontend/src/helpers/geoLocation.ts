import { useEffect, useState } from "react";

interface GeoLocationInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  org: string;
  isLoaded: boolean;
  error?: string;
  data:object;
}

export const useGeoLocation = (): GeoLocationInfo => {
  const [info, setInfo] = useState<GeoLocationInfo>({
    ip: "",
    city: "",
    region: "",
    country: "",
    latitude: 0,
    longitude: 0,
    timezone: "",
    org: "",
    isLoaded: false,
    data:{}
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        setInfo({
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country_name,
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone,
          org: data.org,
          isLoaded: true,
          data:data
        });
      } catch (err) {
        setInfo((prev) => ({
          ...prev,
          error: "Failed to fetch location",
          isLoaded: true,
        }));
      }
    };

    fetchLocation();
  }, []);

  return info;
};
