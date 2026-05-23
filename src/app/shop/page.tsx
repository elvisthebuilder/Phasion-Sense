import React from "react";
import { getMerchantItems } from "@/lib/commerce";
import { ShopClient } from "@/components/shop/shop-client";

// Opt-out of static rendering if merchant items can change or if required
export const revalidate = 60;

export default async function ShopPage() {
  const items = await getMerchantItems().catch((err) => {
    console.error("Failed to fetch merchant items in shop page:", err);
    return [];
  });

  return <ShopClient initialItems={items} />;
}
