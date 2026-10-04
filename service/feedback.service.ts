import { FeedbackItem } from "@/types/feedback"


export async function getFeedbacks():Promise<FeedbackItem[]> {
    const response = await fetch("/api/feedback")

    if(!response.ok) {
        throw new Error("Failed to fetch projects.")
    }

    return response.json()
}