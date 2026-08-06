import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAmadeusClient } from './client.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults = 1,
    children = 0,
    travelClass = 'ECONOMY',
    nonStop = false
  } = req.body || {};

  if (!originLocationCode || !destinationLocationCode || !departureDate) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos (origen, destino, fecha de salida)' });
  }

  try {
    const amadeus = getAmadeusClient();

    const searchParams: any = {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults: Number(adults),
      travelClass,
      nonStop: Boolean(nonStop),
      max: 20
    };

    if (returnDate) {
      searchParams.returnDate = returnDate;
    }

    if (children && Number(children) > 0) {
      searchParams.children = Number(children);
    }

    const response = await amadeus.shopping.flightOffersSearch.get(searchParams);

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Amadeus Flight Search Error:', error);
    return res.status(500).json({
      error: error?.description || error?.message || 'Error consultando ofertas de vuelos'
    });
  }
}
