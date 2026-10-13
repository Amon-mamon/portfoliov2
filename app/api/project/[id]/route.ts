export async function PUT (
    request:Request,
    { params }: { params: Promise<{id:string}>}
) {
    const { id } = await params

    const formData = await request.formData();

    const title = formData.get("project_title");
    const type = formData.get("project_type");
    const stack = formData.get("project_stack")
    const description = formData.get("project_description")

    const files = formData
        .getAll("project_image")
        .filter((value): value is File => value instanceof File);

        console.log({
            id,
            title,
            type,
            stack,
            description,
            files,
        });

        return Response.json({
            message: "Project Recevied"
        })

}