import { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/firebase/nodeApp';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  const decksRef = admin
    .firestore()
    .collection('users')
    .doc(query.uid as string)
    .collection('decks');

  const handleFetchDecks = async () => {
    const deckDocs = await decksRef.get();
    const decks = deckDocs.docs.map((doc) => {
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
        const { name } = JSON.parse(body);
        await decksRef.doc().set({ name });
        await handleFetchDecks();
      } catch (error) {
        handleError(error);
      }
      break;
    case 'PUT':
      try {
        const { id, newName } = JSON.parse(body);
        await decksRef.doc(id).update({ name: newName });
        await handleFetchDecks();
      } catch (error) {
        handleError(error);
      }
      break;
    case 'DELETE':
      try {
        await decksRef.doc(query.deckId as string).delete();
        await handleFetchDecks();
      } catch (error) {
        handleError(error);
      }
      break;
  }
};
