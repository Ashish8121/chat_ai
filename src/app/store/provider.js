'use client';

import { Provider } from 'react-redux';
import { store } from './index'; // ✅ correct path

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
