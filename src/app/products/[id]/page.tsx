import { ProductScreen } from "@/components/commerce/product-screen";

type ProductPageProps = {
    params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    return <ProductScreen itemId={id} />;
}
