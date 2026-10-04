export interface FeedbackItem {
  id: string | number;
  created_at?: string;
  rating: number;
  name: string;
  description: string;
  suggestions?: string | null;
}
