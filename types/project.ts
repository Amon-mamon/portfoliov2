
export interface ProjectItem {
  id: string | number;
  project_title: string;
  project_type: string;
  project_description: string;
  project_stack?: string;
  project_image: string;
  live_url?: string;
  github_url?: string;
}
