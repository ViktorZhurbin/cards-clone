import { NextApiRequest, NextApiResponse } from 'next';
import firebase from '@/db/firebase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, name } = JSON.parse(req.body);

  const deckRef = firebase
    .collection('users')
    .doc(uid)
    .collection('decks')
    .doc(name);

  try {
    const r = await deckRef.set({ name });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
