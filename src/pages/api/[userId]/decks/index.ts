import { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/firebase/nodeApp';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  const decksRef = admin
    .firestore()
    .collection('users')
    .doc(query.userId as string)
    .collection('decks');

  const handleFetchDecks = async () => {
    const decksDocs = await decksRef.get();
    const decks = decksDocs.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    res.status(200).json(decks);
  };

  const handleError = (error) => res.status(400).json({ error: error.message });

  switch (method) {
    default:
    case 'GET':
      try {
        await handleFetchDecks();
      } catch (error) {
        handleError(error);
      }
      break;
    case 'POST':
      try {
        await decksRef.doc().set(body);
        await handleFetchDecks();
      } catch (error) {
        handleError(error);
      }
      break;
  }
};
