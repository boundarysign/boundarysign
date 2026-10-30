import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { blogPosts } from "@/data/blogPosts";
import { ArrowRight, MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Field Notes | Boundary Sign Blog"
        description="State-by-state property posting laws, sign install how-tos, and dispatches from the working land from Boundary Sign."
        path="/blog"
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-secondary/40 border-b border-border">
          <div className="container py-16">
            <div className="text-xs font-display tracking-[0.3em] text-accent mb-3">FIELD NOTES</div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl mb-3">The Boundary Journal</h1>
            <p className="text-muted-foreground max-w-xl">State-by-state posting laws, install how-tos, and dispatches from the working land.</p>
          </div>
        </section>

        <section className="container py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block bg-card border border-border rounded-sm p-8 hover:border-primary/40 hover:shadow-rugged transition-all"
              >
                <div className="flex items-center gap-2 text-xs font-display tracking-widest text-accent mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  {post.state.toUpperCase()}
                </div>
                <h2 className="font-display text-2xl md:text-3xl leading-tight mb-3 group-hover:text-accent transition-colors">{post.title}</h2>
                <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.date} · {post.readTime}</span>
                  <span className="inline-flex items-center gap-1 font-display tracking-widest text-foreground group-hover:text-accent">
                    READ <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Blog;