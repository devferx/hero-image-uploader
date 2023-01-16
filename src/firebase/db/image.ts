import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

import { db } from "../index";

interface addImageParams {
  email?: string | null;
  imageUrl: string;
}

export async function addImage({ email, imageUrl }: addImageParams) {
  if (!email) return;

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

interface deleteImageParams {
  email: string;
  imgUrl: string;
}

export async function deleteImage({
  email,
  imgUrl,
}: deleteImageParams): Promise<string[]> {
  const q = query(collection(db, "users"), where("email", "==", email));
  try {
    const docSnap = await getDocs(q);

    if (docSnap.empty) {
      return [];
    }

    const doc = docSnap.docs[0];
    const images: string[] = doc.data().images;
    const newImages = images.filter((image) => image !== imgUrl);
    await updateDoc(doc.ref, {
      images: newImages,
    });

    // Delete the image from storage
    const storage = getStorage();
    const storageRef = ref(storage, imgUrl);
    await deleteObject(storageRef);

    return newImages;
  } catch (error) {
    console.error(error);
    return [];
  }
}
