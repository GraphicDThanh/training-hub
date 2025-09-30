import { DOCUMENT_CHANGE_TYPE } from "@/constants";
import {
  getDocs,
  getDoc,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

import * as Firestore from "firebase/firestore";

const MOCK_UNSUBSCRIBE = () => {};

export const mockOnSnapshot = (renderData?: () => any) => {
  jest.spyOn(Firestore, "onSnapshot").mockImplementation((_, onNext) => {
    if (!renderData) {
      (onNext as (snapshot: QuerySnapshot<unknown, DocumentData>) => void)({
        docChanges: () => [],
        docs: [],
      } as unknown as QuerySnapshot<unknown, DocumentData>);
      return MOCK_UNSUBSCRIBE;
    }

    const { ADDED, MODIFIED, REMOVED } = DOCUMENT_CHANGE_TYPE;

    const mapByType = (type: string, len: number) =>
      Array(len).fill({ type, doc: renderData() });

    const docChanges = [
      ...mapByType(MODIFIED, 1),
      ...mapByType(ADDED, 3),
      ...mapByType(REMOVED, 3),
    ];

    const docs = Array(5).fill(renderData());

    const mockQuerySnapshot = {
      docChanges: () => docChanges,
      docs,
    } as any;

    (onNext as (snapshot: QuerySnapshot<unknown, DocumentData>) => void)(
      mockQuerySnapshot,
    );

    return MOCK_UNSUBSCRIBE;
  });
};

export const mockGetDocs = (renderData: () => any) =>
  (getDocs as jest.Mock).mockResolvedValue({
    docs: [
      renderData(),
      renderData(),
      renderData(),
      renderData(),
      renderData(),
    ],
  });

export const mockGetDoc = (renderData: () => any) =>
  (getDoc as jest.Mock).mockResolvedValue(renderData());
