import { NextApiRequest, NextApiResponse } from 'next';
import { firestore } from '@/utils/db/initFirestore';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = req.query;
  const userId = Array.isArray(uid) ? uid[0] : uid;

  const decksRef = firestore
    .collection('users')
    .doc(userId)
    .collection('decks');

  try {
    const deckDocs = await decksRef.get();
    const decks = deckDocs.docs.map((doc) => doc.data());
    res.status(200).json({ decks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
