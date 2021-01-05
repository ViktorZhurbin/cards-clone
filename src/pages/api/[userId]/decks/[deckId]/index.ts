import { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/firebase/nodeApp';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  const decksRef = admin
    .firestore()
    .collection('users')
    .doc(query.userId as string)
    .collection('decks');

  const deckItemRef = decksRef.doc(query.deckId as string);

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
        const deckItemDoc = await deckItemRef.get();
        res.status(200).json(deckItemDoc.data());
      } catch (error) {
        handleError(error);
      }
      break;
    case 'PUT':
      try {
        const { newName } = body;
        await deckItemRef.update({ name: newName });
        await handleFetchDecks();
      } catch (error) {
        handleError(error);
      }
      break;
    case 'DELETE':
      try {
        await deckItemRef.delete();
        await handleFetchDecks();
      } catch (error) {
        handleError(error);
      }
      break;
  }
};
