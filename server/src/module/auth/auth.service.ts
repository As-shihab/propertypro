import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Service methods here


  getGeoLocation(latitude: number, longitude: number): Promise<any> {
    return fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    )
      .then((response) => response.json())
      .catch((error) => {
        throw new Error('Failed to reverse geocode location: ' + error.message);
      });
  }
  
}
