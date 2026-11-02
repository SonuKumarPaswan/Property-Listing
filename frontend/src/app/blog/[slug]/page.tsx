import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogSlugRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/insights/${slug}`);
}
