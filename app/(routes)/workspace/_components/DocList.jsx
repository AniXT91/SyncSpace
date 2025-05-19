"use client";

import React, { useEffect, useState } from "react";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { use } from "react";

export default function FirestoreDocList({ params: paramsPromise }) {
  // Unwrap params
  const params = use(paramsPromise);
  const [docList, setDocList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params) {
      const q = query(
        collection(db, "workspaceDocuments"),
        where("workspaceId", "==", params?.workspaceId)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push(doc.data());
        });
        setDocList(documents);
        setIsLoading(false);
      });
      return () => unsubscribe();
    }
  }, [params]);

  if (isLoading) {
    // This placeholder is rendered on the client after hydration.
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Document List</h1>
     
    </>
  );
}