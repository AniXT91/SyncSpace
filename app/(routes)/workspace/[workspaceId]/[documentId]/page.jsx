"use client";

import React from "react";
import SideNav from "../../_components/SideNav";

export default function Document({ params: paramsPromise }) {
  // Resolve the entire params object
  const params = React.use(paramsPromise);

  return (
    <div suppressHydrationWarning>
      <div>
        <SideNav 
          workspaceId={params.workspaceId} 
          documentId={params.documentId} 
        />
      </div>
      <div className="md:ml-72">
        {/* Main content */}
      </div>
    </div>
  );
}