import prisma from "@/lib/prisma";
import ProjectEditor from "@/components/ProjectEditor";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch project data directly from database (Server Component)
    const project = await prisma.project.findUnique({
        where: { id }
    });

    if (!project) {
        notFound();
    }

    // Convert data to match component expectations (handle nulls if any)
    const initialData = {
        id: project.id,
        name: project.name,
        description: project.description,
        image: project.image || "",
        url: project.url,
        techs: project.techs,
        order: project.order
    };

    return <ProjectEditor initialData={initialData} isEditing={true} />;
}
