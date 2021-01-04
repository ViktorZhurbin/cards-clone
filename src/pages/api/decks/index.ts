import { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/firebase/nodeApp';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  const decksRef = admin
    .firestore()
    .collection('users')
    .doc(query.uid as string)
    .collection('decks');

  switch (method) {
    default:
    case 'GET':
      try {
        const deckDocs = await decksRef.get();
        const decks = deckDocs.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        res.status(200).json(decks);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    case 'POST':
      try {
        const { name } = JSON.parse(body);
        await decksRef.doc().set({ name });
        const deckDocs = await decksRef.get();
        const decks = deckDocs.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        res.status(200).json(decks);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    case 'PUT':
      try {
        const { id, newName } = JSON.parse(body);
        await decksRef.doc(id).update({ name: newName });
        const deckDocs = await decksRef.get();
        const decks = deckDocs.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        res.status(200).json(decks);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    case 'DELETE':
      try {
        await decksRef.doc(query.deckId as string).delete();
        const deckDocs = await decksRef.get();
        const decks = deckDocs.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        res.status(200).json(decks);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
  }
};
