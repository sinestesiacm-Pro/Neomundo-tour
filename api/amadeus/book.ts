import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAmadeusClient } from './client.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { confirmedFlightOffer, travelers } = req.body || {};

  if (!confirmedFlightOffer || !travelers || !Array.isArray(travelers) || travelers.length === 0) {
    return res.status(400).json({ error: 'Se requieren el vuelo confirmado y los datos de los pasajeros' });
  }

  try {
    const amadeus = getAmadeusClient();

    const response = await amadeus.booking.flightOrders.post(
      JSON.stringify({
        data: {
          type: 'flight-order',
          flightOffers: [confirmedFlightOffer],
          travelers: travelers
        }
      })
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Amadeus Booking Error:', error);
    return res.status(500).json({
      error: error?.description || error?.message || 'Error al emitir la reserva de vuelo'
    });
  }
}
