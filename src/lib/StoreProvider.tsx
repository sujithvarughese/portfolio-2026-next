'use client';
import { useRef } from 'react'
import { makeStore, AppStore } from '@/lib/store'
import {Provider} from 'react-redux';

import {ReactNode} from 'react';


interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({children}: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }
  return <Provider store={storeRef.current!}>{children}</Provider>;
}