"use client";

import { ReactNode, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseconfig";

export function Room({ children, params }) {
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth?roomId=" + params?.documentId}
      resolveUsers={async ({ userIds }) => {

        const q = query(collection(db, 'Users'), where('email', 'in', userIds));
        const querySnapShot = await getDocs(q);

        const userlist = []
        querySnapShot.forEach((doc) => {
          console.log(doc.data())
          userlist.push(doc.data())
        })
        return userlist
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        // The text the user is searching for, e.g. "mar"

        const q = query(collection(db, 'Users'), where('email', '!=', null));
        const querySnapShot = await getDocs(q);

        let userlist = [];
        querySnapShot.forEach((doc) => {
          userlist.push(doc.data())
        })
        if (text) {
          userlist = userlist.filter((user) => user.name.includes(text));
        }
        // Return a list of user IDs that match the query
        return userlist.map((user) => user.email);
      }}>
      <RoomProvider id={params?.documentId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}