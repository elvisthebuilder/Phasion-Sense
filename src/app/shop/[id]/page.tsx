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

  const completeTheLook = pickCompleteTheLook(item, catalog);
  const youMayAlsoLike = catalog
    .filter((c) => c.id !== item.id && !completeTheLook.some((r) => r.id === c.id))
    .slice(0, 4);

  return (
    <ProductDetailClient
      item={item}
      completeTheLook={completeTheLook}
      youMayAlsoLike={youMayAlsoLike}
    />
  );
}
