import { config } from "@/config";
import { api } from "@/lib/api";

export type MerchantDetail = {
    id: string;
    name: string;
    description: string | null;
    logo_url: string | null;
    brand_colors: string[] | null;
    whatsapp_number: string | null;
};

export type MerchantListItem = {
    id: string;
    name: string;
    description: string | null;
    logo_url: string | null;
    whatsapp_number: string | null;
};

export type ItemResponse = {
    id: string;
    merchant_id: string;
    name: string;
    description: string | null;
    price_minor: number;
    currency: string;
    image_urls: string[] | null;
    in_stock: boolean;
};

export type CampaignSummary = {
    id: string;
    title: string;
    copy_text: string | null;
    image_urls: string[] | null;
    team_slug: string | null;
    created_at: number;
};

export type CampaignFeaturedItem = {
    id: string;
    name: string;
    price_minor: number;
    currency: string;
    image_url: string | null;
    in_stock: boolean;
};

export type CampaignDetail = {
    id: string;
    merchant: { id: string; name: string; whatsapp_number: string | null } | null;
    title: string;
    copy_text: string | null;
    image_urls: string[] | null;
    featured_items: CampaignFeaturedItem[];
    team_slug: string | null;
    created_at: number;
};

export type BasketItemInput = {
    item_id: string;
    qty: number;
    item_note?: string | null;
};

export type BasketCreateRequest = {
    merchant_id: string;
    items: BasketItemInput[];
    customer_name?: string | null;
    customer_phone?: string | null;
    customer_note?: string | null;
    team_slug?: string | null;
};

export type BasketCreateResponse = {
    id: string;
};

export type BasketDetail = {
    id: string;
    merchant: { id: string; name: string; whatsapp_number: string | null } | null;
    items: Array<{
        item_id: string;
        name: string;
        price_minor: number;
        currency: string;
        image_url: string | null;
        in_stock: boolean;
        qty: number;
        item_note: string | null;
    }>;
    total_minor: number;
    currency: string | null;
    customer_name: string | null;
    customer_phone: string | null;
    customer_note: string | null;
    team_slug: string | null;
    created_at: number;
};

export type HealthResponse = {
    status: string;
    db: string;
    uploads: string;
    assets: string;
};

export type TeamCreateRequest = {
    slug: string;
    name: string;
    merchant_id: string;
    contact?: string | null;
};

export type TeamCreateResponse = {
    slug: string;
};

export type UploadResponse = {
    url: string;
};

export async function getHealth() {
    const { data } = await api.get<HealthResponse>("/health");
    return data;
}

export async function getMerchant(slug: string = config.merchantSlug) {
    const { data } = await api.get<MerchantDetail>(`/merchants/${slug}`);
    return data;
}

export async function listMerchants() {
    const { data } = await api.get<MerchantListItem[]>("/merchants");
    return data;
}

export async function getMerchantItems(slug: string = config.merchantSlug) {
    const { data } = await api.get<ItemResponse[]>(`/merchants/${slug}/items`);
    return data;
}

export async function getMerchantCampaigns(slug: string = config.merchantSlug, teamSlug: string | null = config.teamSlug || null) {
    const { data } = await api.get<CampaignSummary[]>(`/merchants/${slug}/campaigns`, {
        params: teamSlug ? { team_slug: teamSlug } : undefined,
    });

    return data;
}

export async function getMerchantCampaignDetails(slug: string = config.merchantSlug, teamSlug: string | null = config.teamSlug || null) {
    const campaigns = await getMerchantCampaigns(slug, teamSlug);
    const details = await Promise.all(
        campaigns.map(async (campaign) => {
            try {
                return await getCampaign(campaign.id);
            } catch {
                return null;
            }
        }),
    );

    return details.filter((campaign): campaign is CampaignDetail => campaign !== null);
}

export async function getCampaign(campaignId: string) {
    const { data } = await api.get<CampaignDetail>(`/campaigns/${campaignId}`);
    return data;
}

export async function getItem(itemId: string) {
    const { data } = await api.get<ItemResponse>(`/items/${itemId}`);
    return data;
}

export async function createBasket(payload: BasketCreateRequest) {
    const { data } = await api.post<BasketCreateResponse>("/baskets", payload);
    return data;
}

export async function getBasket(basketId: string) {
    const { data } = await api.get<BasketDetail>(`/baskets/${basketId}`);
    return data;
}

export async function createTeam(payload: TeamCreateRequest) {
    const { data } = await api.post<TeamCreateResponse>("/teams", payload);
    return data;
}

export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post<UploadResponse>("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
}

export async function rehostImage(sourceUrl: string) {
    const { data } = await api.post<UploadResponse>("/uploads/rehost", { source_url: sourceUrl });
    return data;
}
