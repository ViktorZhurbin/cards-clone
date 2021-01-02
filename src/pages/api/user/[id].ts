import firebase from '@/db/firebase';

export default async (req, res) => {
  const usersCollection = firebase.collection('user');
  const userDoc = await usersCollection.doc(req.query.id).get();

  if (!userDoc.exists) {
    return null;
  }

  return userDoc.data();
};
