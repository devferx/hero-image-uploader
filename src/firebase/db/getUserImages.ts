import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../index";

export async function getUserImages(email: string): Promise<string[]> {
  const q = query(collection(db, "users"), where("email", "==", email));
  const docSnap = await getDocs(q);

  if (docSnap.empty) return [];

  return docSnap.docs[0].data().images;
}
