export interface LoginHistory {
  id?: string;
  email: string;
  timestamp: string;
  status?: 'success' | 'fail';
}
