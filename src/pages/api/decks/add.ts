import { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/firebase/nodeApp';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, name } = JSON.parse(req.body);

  const deckRef = admin.firestore().doc(`users/${uid}/decks/${name}`);

  try {
    await deckRef.set({ name });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
