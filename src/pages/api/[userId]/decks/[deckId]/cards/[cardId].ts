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

  const cardItemRef = cardsRef.doc(query.cardId as string);

  const handleFetchCards = async () => {
    const cardsDoc = await cardsRef.get();
    const cards = cardsDoc.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    res.status(200).json(cards);
  };

  const handleError = (error) => res.status(400).json({ error: error.message });

  switch (method) {
    default:
    case 'GET':
      try {
        const cardDoc = await cardItemRef.get();
        res.status(200).json(cardDoc.data());
      } catch (error) {
        handleError(error);
      }
      break;
    case 'PUT':
      try {
        await cardItemRef.update({ ...body });
        await handleFetchCards();
      } catch (error) {
        handleError(error);
      }
      break;
    case 'DELETE':
      try {
        await cardItemRef.delete();
        await handleFetchCards();
      } catch (error) {
        handleError(error);
      }
      break;
  }
};
