import { Link, useParams } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Seo } from "@/components/Seo";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Seo title="Post not found | Boundary Sign" description="The Field Notes post you're looking for couldn't be found." path={`/blog/${slug ?? ""}`} />
        <SiteHeader />
        <main className="flex-1 container py-14 md:py-24 text-center">
          <h1 className="font-display text-3xl mb-4">Post not found</h1>
          <Link to="/blog" className="text-accent hover:underline">Back to Field Notes</Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title={`${post.title} | Boundary Sign`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { "@type": "Organization", name: "Boundary Sign" },
          publisher: { "@type": "Organization", name: "Boundary Sign" },
          mainEntityOfPage: `https://www.boundarysign.com/blog/${post.slug}`,
        }}
      />
      <SiteHeader />
      <main className="flex-1">
        <article className="container max-w-3xl py-12">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> All Field Notes
          </Link>

          <div className="flex items-center gap-2 text-xs font-display tracking-widest text-accent mb-4">
            <MapPin className="w-3.5 h-3.5" />
            {post.state.toUpperCase()}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl leading-[1.05] mb-4">{post.title}</h1>
          <div className="text-sm text-muted-foreground mb-10 pb-6 border-b border-border">
            {post.date} · {post.readTime}
          </div>

          <div
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:tracking-wide prose-headings:uppercase
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-foreground/85 prose-p:leading-relaxed
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-4 prose-ol:my-4 prose-li:text-foreground/85
              prose-em:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div className="mt-16 p-8 bg-primary text-primary-foreground rounded-sm">
            <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">SHOP THE GEAR</div>
            <h3 className="font-display text-2xl mb-2">Compliant signs, built to last.</h3>
            <p className="text-primary-foreground/80 mb-5 text-sm">Heavy-gauge aluminum, cut-out lettering, and pre-punched T-post mounts.</p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-display tracking-widest">
              <Link to="/#products">Shop Boundary Sign <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
};

export default BlogPost;