import React from 'react';
import { useLoadingContext } from '../contexts/LoadingContext';
import LoadingSpinner from './LoadingSpinner';

export default function GlobalLoadingOverlay() {
  const { visible } = useLoadingContext();

  if (!visible) return null;

  return <LoadingSpinner overlay message="Loading…" />;
}
