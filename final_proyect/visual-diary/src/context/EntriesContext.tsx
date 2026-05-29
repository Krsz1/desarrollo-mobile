import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../services/FirebaseService";
import {
  addEntry as addEntryService,
  updateEntry as updateEntryService,
  deleteEntry as deleteEntryService,
  realtimeFeed,
} from "../services/EntryService";
import { Entry, NewEntryData } from "../types/Entry";
import { useAuth } from "./AuthContext";

interface EntriesContextType {
  entries: Entry[];
  feedEntries: Entry[];
  loading: boolean;
  addEntry: (data: NewEntryData) => Promise<string>;
  updateEntry: (id: string, data: Partial<Omit<Entry, "id" | "userId" | "createdAt">>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
}

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export const EntriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [feedEntries, setFeedEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener for user's own entries
  useEffect(() => {
    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const q = query(
      collection(db, "entries"),
      where("userId", "==", user.uid)
    );
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Entry, "id">),
        }));
        // Sort client-side to avoid composite index requirement
        docs.sort((a, b) => {
          const ta = a.createdAt && typeof (a.createdAt as any).toMillis === "function"
            ? (a.createdAt as any).toMillis()
            : new Date(a.createdAt as string).getTime();
          const tb = b.createdAt && typeof (b.createdAt as any).toMillis === "function"
            ? (b.createdAt as any).toMillis()
            : new Date(b.createdAt as string).getTime();
          return tb - ta;
        });
        setEntries(docs);
        setLoading(false);
      },
      (error) => {
        console.error("EntriesContext onSnapshot error:", error);
        setLoading(false);
      }
    );
    return unsub;
  }, [user]);

  // Real-time listener for global feed
  useEffect(() => {
    if (!user) {
      setFeedEntries([]);
      return;
    }
    return realtimeFeed(setFeedEntries);
  }, [user]);

  return (
    <EntriesContext.Provider
      value={{
        entries,
        feedEntries,
        loading,
        addEntry: addEntryService,
        updateEntry: updateEntryService,
        deleteEntry: deleteEntryService,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntries = (): EntriesContextType => {
  const ctx = useContext(EntriesContext);
  if (!ctx) throw new Error("useEntries must be used within EntriesProvider");
  return ctx;
};

export default EntriesContext;
