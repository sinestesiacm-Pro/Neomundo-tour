import Amadeus from 'amadeus';

let amadeusClient: any = null;

export function getAmadeusClient() {
  if (!amadeusClient) {
    const clientId = process.env.AMADEUS_CLIENT_ID || '';
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET || '';
    const hostname = process.env.AMADEUS_ENV || 'test'; // 'test' | 'production'

    if (!clientId || !clientSecret) {
      console.warn('Amadeus API credentials are not set in environment variables.');
    }

    amadeusClient = new Amadeus({
      clientId,
      clientSecret,
      hostname
    });
  }

  return amadeusClient;
}
