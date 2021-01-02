import { NextApiRequest } from 'next';
import firebase from '@/db/firebase';

export default async (req: NextApiRequest) => {
  const { uid, id } = req.query;
  const userId = Array.isArray(uid) ? uid[0] : uid;
  const deckId = Array.isArray(id) ? id[0] : id;

  const deckRef = firebase
    .collection('users')
    .doc(userId)
    .collection('decks')
    .doc(deckId);

  const deck = await deckRef.get();

  if (!deck.exists) {
    return null;
  }

  return deck.data();
};
