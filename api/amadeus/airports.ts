import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAmadeusClient } from './client.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const keyword = (req.query.keyword as string) || '';

  if (!keyword || keyword.trim().length < 2) {
    return res.status(400).json({ error: 'Keyword must be at least 2 characters' });
  }

  try {
    const amadeus = getAmadeusClient();
    const response = await amadeus.referenceData.locations.get({
      keyword: keyword.trim(),
      subType: 'AIRPORT,CITY'
    });

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Amadeus Airports Error:', error);
    return res.status(500).json({
      error: error?.description || error?.message || 'Error fetching airports'
    });
  }
}
