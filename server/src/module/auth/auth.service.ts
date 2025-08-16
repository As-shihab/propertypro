import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  // Service methods here


  async getGeoLocation(latitude: number, longitude: number): Promise<any> {
  return  await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching geolocation:', error);
        throw new Error('Failed to fetch geolocation');
      });
  }

}
