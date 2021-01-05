import { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/firebase/nodeApp';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  const cardsRef = admin
    .firestore()
    .collection('users')
    .doc(query.userId as string)
    .collection('decks')
    .doc(query.deckId as string)
    .collection('cards');

  const handleFetchCards = async () => {
    const cardsDocs = await cardsRef.get();
    const cards = cardsDocs.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    res.status(200).json(cards);
  };

  const handleError = (error) => res.status(400).json({ error: error.message });

  switch (method) {
    default:
    case 'GET':
      try {
        await handleFetchCards();
      } catch (error) {
        handleError(error);
      }
      break;
    case 'POST':
      try {
        await cardsRef.doc().set(body);
        await handleFetchCards();
      } catch (error) {
        handleError(error);
      }
      break;
  }
};
