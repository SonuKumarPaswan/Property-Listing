import Link from "next/link";

const page = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  // Replace this with API/database fetch
  const article = {
    title: "Creating Productive Office Spaces",
    category: "Office Design",
    author: "Admin",
    date: "June 5, 2026",
    content: `
      Modern office spaces play a crucial role in employee productivity and business growth.

      A well-designed office creates an environment that encourages collaboration, innovation, and focus. Companies today are investing in flexible workspaces, ergonomic furniture, and technology-driven solutions to improve workplace efficiency.

      Natural lighting, comfortable meeting areas, and dedicated quiet zones help employees perform at their best while maintaining a healthy work-life balance.

      As hybrid work models continue to evolve, businesses are rethinking how office spaces are designed to support both in-person collaboration and remote work flexibility.
    `,
  };

  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link
          href="/insights"
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          ← Back to Articles
        </Link>

        <span className="text-sm text-blue-600 font-medium">
          {article.category}
        </span>

        <h1 className="text-4xl font-bold text-zinc-900 mt-3 mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-zinc-500 text-sm mb-10">
          <span>By {article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{slug}</span>
        </div>

        <article className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-200">
          <div className="prose prose-zinc max-w-none">
            {article.content.split("\n").map((paragraph, index) =>
              paragraph.trim() ? (
                <p key={index} className="mb-6 text-zinc-700 leading-8">
                  {paragraph}
                </p>
              ) : null
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default page;