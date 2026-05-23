import { config } from "@/config";

export function resolveApiImageUrl(imagePath: string | null | undefined) {
    if (!imagePath) {
        return null;
    }

    if (/^https?:\/\//i.test(imagePath)) {
        return imagePath;
    }

    const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${config.apiBaseUrl}${normalizedPath}`;
}
