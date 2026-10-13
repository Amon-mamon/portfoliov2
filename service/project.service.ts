import { ProjectItem } from "@/types/project"
import { ProjectFormValues } from "@/validation/project.schema";

type UpdateProjectInput = ProjectFormValues & {
  id: number;
  files: File[];
};
export async function getProjects():Promise<ProjectItem[]> {
    const response = await fetch("/api/project")

    if(!response.ok) {
        throw new Error ("Failed to fetch projects.")
    }

    return response.json()
}


export async function updateProject({
    id,
    project_title,
    project_type,
    project_stack,
    project_description,
    files,
}:UpdateProjectInput) {
    const formData = new FormData();

    formData.append("project_title", project_title)
    formData.append("project_type", project_type)
    formData.append("project_stack", project_stack)
    formData.append("project_description",project_description)


    files.forEach((file) => {
        formData.append("project_image", file);
    })

    const response = await fetch(`api/project/${id}`, {
        method:"PUT",
        body:formData,
    });

    if(!response.ok) {
        throw new Error("Failed to update project.")
    }

    return response.json()
}