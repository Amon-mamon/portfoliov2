export interface ProjectItem {
  id: number;
  project_title: string;
  project_description?: string;
  project_type?: string;
  project_stack?: string;
  project_image?: string;
  project_images?: string[];
  project_url?: string | null;
  live_url?: string | null;
  is_active?: boolean;
}