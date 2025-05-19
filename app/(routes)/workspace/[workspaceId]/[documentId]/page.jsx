"use client";

import React from "react";

import dynamic from "next/dynamic";
import SideNav from "../../_components/SideNav";

// Dynamically import the FirestoreDocList component with SSR off.
const FirestoreDocList = dynamic(
  () =>
    import(
      "../../_components/DocList" /* webpackChunkName: "FirestoreDocList" */
    ),
  { ssr: false }
);

export default function Document({ params: paramsPromise }) {
  return (
    <div>
      <div>
        <SideNav />
      </div>
      <div className="md:ml-72">
        <FirestoreDocList params={paramsPromise} />
      </div>
    </div>
  );
}