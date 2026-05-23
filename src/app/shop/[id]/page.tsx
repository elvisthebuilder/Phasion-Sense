import { getItem, getMerchantItems } from "@/lib/commerce";
import { pickCompleteTheLook } from "@/lib/recommendations";
import { ProductDetailClient } from "@/components/shop/product-detail-client";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const [item, catalog] = await Promise.all([
    getItem(id).catch(() => null),
    getMerchantItems().catch(() => []),
  ]);

  if (!item) {
    notFound();
  }

  // Pre-calculate fallback recommendation on server for fast initial loading
  const fallbackCompleteTheLook = pickCompleteTheLook(item, catalog);
  
  // Exclude current item and fallback items from "you may also like"
  const youMayAlsoLike = catalog
    .filter((c) => c.id !== item.id && !fallbackCompleteTheLook.some((r) => r.id === c.id))
    .slice(0, 4);

  return (
    <ProductDetailClient
      item={item}
      fallbackCompleteTheLook={fallbackCompleteTheLook}
      youMayAlsoLike={youMayAlsoLike}
    />
  );
}
