import { db } from "@/config/firebase.config";

import { doc, setDoc, WithFieldValue, DocumentData } from "firebase/firestore";

export async function updateDataFirestore<
  T extends WithFieldValue<DocumentData>,
>({ data, entity, id }: { entity: string; data: T; id: number }) {
  const ref = doc(db, entity, id.toString());
  await setDoc(ref, data);
}
