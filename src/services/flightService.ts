export interface SearchFlightParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults?: number;
  children?: number;
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  nonStop?: boolean;
}

export interface TravelerDocument {
  documentType: 'PASSPORT' | 'IDENTITY_CARD';
  number: string;
  expiryDate: string;
  issuanceCountry: string;
  nationality: string;
  holder: boolean;
}

export interface TravelerData {
  id: string;
  dateOfBirth: string;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: 'MALE' | 'FEMALE';
  contact: {
    emailAddress: string;
    phones: Array<{
      deviceType: 'MOBILE' | 'LANDLINE';
      countryCallingCode: string;
      number: string;
    }>;
  };
  documents?: TravelerDocument[];
}

export async function searchAirports(keyword: string) {
  if (!keyword || keyword.trim().length < 2) return [];

  const response = await fetch(`/api/amadeus/airports?keyword=${encodeURIComponent(keyword)}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al buscar aeropuertos');
  }

  const data = await response.json();
  return data || [];
}

export async function searchFlights(params: SearchFlightParams) {
  const response = await fetch('/api/amadeus/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al consultar vuelos');
  }

  return await response.json();
}

export async function priceFlightOffer(selectedFlightOffer: any) {
  const response = await fetch('/api/amadeus/price', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ selectedFlightOffer })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al confirmar precio del vuelo');
  }

  return await response.json();
}

export async function bookFlight(confirmedFlightOffer: any, travelers: TravelerData[]) {
  const response = await fetch('/api/amadeus/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ confirmedFlightOffer, travelers })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al procesar la reserva del vuelo');
  }

  return await response.json();
}
