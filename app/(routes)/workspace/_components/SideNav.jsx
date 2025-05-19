"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

// Dynamic imports with SSR disabled
const DocList = dynamic(() => import("./DocList"), {
  ssr: false,
  loading: () => <div>Loading documents...</div>,
});

const Logo = dynamic(() => import("@/app/_components/logo"), {
  ssr: false,
  loading: () => (
    <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
  ),
});

export default function SideNav({ workspaceId, documentId }) {
  const [docList, setDocList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (workspaceId) {
      const q = query(
        collection(db, "workspaceDocuments"),
        where("workspaceId", "==", workspaceId)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocList(documents);
        setIsLoading(false);
      });
      return () => unsubscribe();
    }
  }, [workspaceId]);

  return (
    <div
      className="h-screen md:w-72 hidden md:block fixed bg-blue-50"
      suppressHydrationWarning
    >
      <div className="flex justify-between items-center p-5">
        <Logo
          containerClassName="md:h-14 w-14 rounded-4xl"
          imageClassName="p-0.5 scale-200"
        />
        <Bell className="h-5 w-5 text-black-100" />
      </div>
      <hr className="my-3" />
      <div>
        <div className="flex justify-between items-center p-4">
          <h2 className="font-bold">Workspace Name</h2>
          <Button size="sm">+</Button>
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <DocList
          documentList={docList}
          workspaceId={workspaceId}
          documentId={documentId}
        />
      )}
      <div className="absolute bottom-10 p-4 w-[85%]">
        <h2 className="text-sm font-normal my-2">
          <strong>{docList?.length}</strong> Out of <strong>5</strong> files used
        </h2>
        <h2 className="text-sm font-light">
          Upgrade your plan for unlimited access
        </h2>
      </div>
    </div>
  );
}