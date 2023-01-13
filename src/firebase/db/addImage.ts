import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../index";

interface addImageParams {
  email: string;
  imageUrl: string;
}

export async function addImage({ email, imageUrl }: addImageParams) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const docSnap = await getDocs(q);

  if (docSnap.empty) {
    // Create a new user with the image
    await addDoc(collection(db, "users"), {
      email,
      images: [imageUrl],
    });
  }

  if (!docSnap.empty) {
    // Update the user with the new image
    const doc = docSnap.docs[0];
    const images = doc.data().images;
    await updateDoc(doc.ref, {
      images: [...images, imageUrl],
    });
  }
}
