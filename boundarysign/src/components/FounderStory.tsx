import { Trophy, GraduationCap, User } from "lucide-react";
import idahoEntrepreneurshipChallenge from "@/assets/idaho-entrepreneurship-challenge.png.asset.json";
import springIdahoPitch from "@/assets/spring-idaho-pitch.jpg.asset.json";

const pitchWins = [
  {
    title: "FALL IDAHO PITCH: 11/12/2025",
    description: "Won 1st place in the quick pitch — the moment that connected me with the right people to manufacture the signs and turn an idea into a real business.",
    image: "",
  },
  {
    title: "IDAHO ENTREPRENEURSHIP CHALLENGE: 03/03/2026",
    description: "This was a competition held for teams from all over the state. Boundary Sign won 1st in product innovation and was awarded a golden ticket to the Boise Entrepreneurship Week semi-finals.",
    image: idahoEntrepreneurshipChallenge.url,
  },
  {
    title: "SPRING IDAHO PITCH: 04/30/2026",
    description: "Boundary Sign won all three top prizes at this competition: 1st place for the Idaho Pitch, 1st place for the pitch deck, and 1st place for the crowd favorite.",
    image: springIdahoPitch.url,
  },
];

export const FounderStory = () => {
  return (
    <section id="story" className="bg-secondary/40 border-y border-border">
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="text-xs font-display tracking-[0.3em] text-accent mb-3">THE STORY</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 uppercase leading-[1.05]">
              Built by a ranch hand and land user
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="flex gap-3">
                <User className="h-5 w-5 text-accent shrink-0 mt-1" />
                <span>
                  Boundary Sign is run by a young entrepreneur — every order, every email, and every design decision goes through one person who cares about getting it right.
                </span>
              </p>
              <p className="flex gap-3">
                <GraduationCap className="h-5 w-5 text-accent shrink-0 mt-1" />
                <span>
                  Founded while studying at the <strong className="text-foreground">University of Idaho</strong> around a simple idea: landowners deserve property markers that actually last and actually comply with the law.
                </span>
              </p>
              <p className="flex gap-3">
                <Trophy className="h-5 w-5 text-accent shrink-0 mt-1" />
                <span>
                  Three-time winner of <strong className="text-foreground">collegiate pitch competitions</strong> — recognition that helped turn a workshop prototype into a real, growing brand.
                </span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="text-xs font-display tracking-[0.3em] text-accent mb-4">PITCH COMPETITION WINS</div>
            <div className="grid sm:grid-cols-3 gap-4">
              {pitchWins.map((win) => (
                <article key={win.title} className="bg-background border border-border rounded-sm overflow-hidden flex flex-col">
                  <div className="aspect-[4/3] bg-secondary/60 flex items-center justify-center text-muted-foreground text-xs tracking-widest font-display border-b border-border">
                    {win.image ? (
                      <img src={win.image} alt={win.title} className="w-full h-full object-cover" />
                    ) : (
                      <span>PHOTO COMING SOON</span>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-4 w-4 text-accent" />
                      <h3 className="font-display text-sm tracking-wide">{win.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{win.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};