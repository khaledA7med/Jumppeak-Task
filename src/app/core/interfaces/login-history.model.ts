export interface LoginHistory {
  id?: string; // Optional: backend may generate it
  email: string;
  timestamp: string; // ISO string format (e.g., from new Date().toISOString())
  status?: 'success' | 'fail'; // Optional if not always provided
}
