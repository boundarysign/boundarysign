import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export const BlogPreview = () => {
  return (
    <section id="journal" className="container py-12 md:py-20">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">FIELD NOTES</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">From the journal</h2>
        </div>
        <Link to="/blog" className="font-display text-sm tracking-widest inline-flex items-center gap-1 hover:text-accent">
          ALL POSTS <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block bg-card border border-border rounded-sm p-7 hover:border-primary/40 hover:shadow-rugged transition-all"
          >
            <div className="flex items-center gap-2 text-xs font-display tracking-widest text-accent mb-3">
              <MapPin className="w-3.5 h-3.5" /> {post.state.toUpperCase()}
            </div>
            <h3 className="font-display text-xl md:text-2xl leading-tight mb-2 group-hover:text-accent transition-colors">{post.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="text-xs text-muted-foreground">{post.date} · {post.readTime}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};