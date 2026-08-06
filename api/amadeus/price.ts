import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAmadeusClient } from './client.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { selectedFlightOffer } = req.body || {};

  if (!selectedFlightOffer) {
    return res.status(400).json({ error: 'Se requiere el vuelo seleccionado para confirmar precio' });
  }

  try {
    const amadeus = getAmadeusClient();

    const response = await amadeus.shopping.flightOffersSearch.pricing.post(
      JSON.stringify({
        data: {
          type: 'flight-offers-pricing',
          flightOffers: [selectedFlightOffer]
        }
      })
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Amadeus Flight Pricing Error:', error);
    return res.status(500).json({
      error: error?.description || error?.message || 'Error al reconfirmar el precio del vuelo'
    });
  }
}
