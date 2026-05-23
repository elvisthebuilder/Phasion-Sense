import { api } from "@/lib/api";

export type Post = {
    id: number;
    title: string;
    body: string;
};

export async function fetchFeaturedPosts(): Promise<Post[]> {
    const response = await api.get<Post[]>("/posts");
    return response.data;
}