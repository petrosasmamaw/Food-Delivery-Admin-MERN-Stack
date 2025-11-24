// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Environment variables (from .env in the project root)
const supabaseUrl = 'https://kglcjnwsbpetasaiuykd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnbGNqbndzYnBldGFzYWl1eWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0Mzc4ODAsImV4cCI6MjA3NjAxMzg4MH0.K1Ok6Ex_wYwIjcQ5HPIvWQUgcKqwSQxKQRq9an7sM_M';
// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get current user session
export const getCurrentUser = () => supabase.auth.user();
