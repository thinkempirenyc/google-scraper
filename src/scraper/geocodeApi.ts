import request from 'node-fetch';
import { URLSearchParams } from 'url';
import { Payload } from '../types';

export const geosearch = async (q: string): Promise<Payload> => {
  let payload: Payload;
  const params = new URLSearchParams({
    address: q,
    key: 'AIzaSyDHgtpAkcHxMAEPkXmVUUStGPYSvTEADFo'
  });

  const ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`;

  try {
    const response = await request(ENDPOINT, {
      // Follow redirect for non-GET requests
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' }
    });

    payload = await response.json();
  } catch (error) {
    console.log(error);
  }

  return payload;
};
