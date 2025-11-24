import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../supabaseClient';

export default function ProtectedRoute({ children }){
  // simple sync check; in real app you'd use context/state
  const user = null;
  // we return children for now; add auth check if desired
  return children;
}
