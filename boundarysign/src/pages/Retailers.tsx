import { Link } from "react-router-dom";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Seo } from "@/components/Seo";
import { MapPin, Store } from "lucide-react";
import { RetailerMap, type MapLocation } from "@/components/RetailerMap";

interface Retailer {
  name: string;
  description: string;
  locations: string[];
  state: string;
}

const retailers: Retailer[] = [
  {
    name: "Montana Fence",
    description: "Your trusted source for Boundary Signs at four Montana Fence branches across the state.",
    locations: ["Billings", "Belgrade", "Great Falls", "Kalispell"],
    state: "Montana",
  },
  {
    name: "Idaho Lumber (Hunters Ace Hardware)",
    description: "Find Boundary Signs in Hailey at Hunters Ace Hardware.",
    locations: ["Hailey"],
    state: "Idaho",
  },
  {
    name: "Valley Wide",
    description: "Boundary Signs available at multiple Valley Wide locations throughout Idaho.",
    locations: ["Jerome", "Wendell", "Bellevue", "Menan", "Rexburg", "Salmon", "Nampa"],
    state: "Idaho",
  },
  {
    name: "Moscow Building Supply",
    description: "Find Boundary Signs in Moscow at Moscow Building Supply.",
    locations: ["Moscow"],
    state: "Idaho",
  },
  {
    name: "Hayden Ace Hardware",
    description: "Find Boundary Signs in Hayden at Hayden Ace Hardware.",
    locations: ["Hayden"],
    state: "Idaho",
  },
];

const mapLocations: MapLocation[] = [
  // Montana Fence: verified storefronts from montanafence.com/locations
  { retailer: "Montana Fence", city: "Billings", state: "MT", lat: 45.7466, lng: -108.4632, address: "7403 Entryway Dr, Billings, MT 59101" },
  { retailer: "Montana Fence", city: "Belgrade", state: "MT", lat: 45.7547, lng: -111.1492, address: "5400 Thorpe Rd, Belgrade, MT 59714" },
  { retailer: "Montana Fence", city: "Great Falls", state: "MT", lat: 47.4869, lng: -111.3540, address: "705 Vaughn Frontage Rd S, Great Falls, MT 59404" },
  { retailer: "Montana Fence", city: "Kalispell", state: "MT", lat: 48.2546, lng: -114.3265, address: "3465 Highway 93 N, Kalispell, MT 59901" },
  // Idaho Lumber & Hunter's Ace Hardware
  { retailer: "Idaho Lumber (Hunters Ace Hardware)", city: "Hailey", state: "ID", lat: 43.5043, lng: -114.3122, address: "921 Airport Way, Hailey, ID 83333" },
  // Valley Wide Country Stores
  { retailer: "Valley Wide", city: "Jerome", state: "ID", lat: 42.7080, lng: -114.5187, address: "1466 S Lincoln Ave, Jerome, ID 83338" },
  { retailer: "Valley Wide", city: "Wendell", state: "ID", lat: 42.7768, lng: -114.7029, address: "175 W Main St, Wendell, ID 83355" },
  { retailer: "Valley Wide", city: "Bellevue", state: "ID", lat: 43.4625, lng: -114.2603, address: "869 S Main St, Bellevue, ID 83313" },
  { retailer: "Valley Wide", city: "Menan", state: "ID", lat: 43.7220, lng: -111.9883, address: "649 N 3500 E, Menan, ID 83434" },
  { retailer: "Valley Wide", city: "Rexburg", state: "ID", lat: 43.8252, lng: -111.8024, address: "1175 W Main St, Rexburg, ID 83440" },
  { retailer: "Valley Wide", city: "Salmon", state: "ID", lat: 45.1729, lng: -113.8954, address: "500 S Challis St, Salmon, ID 83467" },
  { retailer: "Valley Wide", city: "Nampa", state: "ID", lat: 43.5990, lng: -116.5526, address: "2114 N 20th St, Nampa, ID 83687" },
  { retailer: "Moscow Building Supply", city: "Moscow", state: "ID", lat: 46.7422, lng: -117.0004, address: "760 N Main St, Moscow, ID 83843" },
  { retailer: "Hayden Ace Hardware", city: "Hayden", state: "ID", lat: 47.7576, lng: -116.7889, address: "196 W Hayden Ave, Hayden, ID 83835" },
];

const Retailers = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Where to Buy | Boundary Sign"
        description="Find Boundary Sign products at trusted retailers across Montana and Idaho. Available at Montana Fence, Idaho Lumber, and Valley Wide locations."
        path="/retailers"
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="container py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-xs font-display tracking-[0.3em] text-accent mb-3">FIND US IN STORES</div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.05] mb-5">
              Where to Buy
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Boundary Sign products are available at trusted hardware and fencing retailers across Montana and Idaho. Stop by a location near you.
            </p>
          </div>
        </section>

        {/* Interactive Map */}
        <section className="container pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-xs font-display tracking-[0.3em] text-accent mb-3 text-center">RETAILER MAP</div>
            <h2 className="font-display text-3xl md:text-4xl uppercase text-center mb-6">
              Find a store near you
            </h2>
            <RetailerMap locations={mapLocations} activeKey={activeKey} />
            <p className="text-xs text-muted-foreground text-center mt-3">
              Click a city below to zoom the map. Click a pin to see retailer details.
            </p>
          </div>
        </section>

        {/* Retailer Cards */}
        <section className="container pb-20">
          <div className="max-w-4xl mx-auto grid gap-8">
            {retailers.map((retailer) => (
              <div
                key={retailer.name}
                className="bg-secondary/40 border border-border rounded-sm p-8 md:p-10"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 bg-accent text-accent-foreground flex items-center justify-center rounded-sm">
                        <Store className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl tracking-wide">{retailer.name}</h2>
                        <div className="text-xs text-muted-foreground font-display tracking-widest mt-0.5">
                          {retailer.state}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {retailer.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="text-xs font-display tracking-[0.2em] text-muted-foreground mb-4 uppercase">
                    Locations
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {retailer.locations.map((loc) => (
                      <button
                        type="button"
                        key={loc}
                        onClick={() => {
                          setActiveKey(`${retailer.name}-${loc}`);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex items-center gap-2 text-sm bg-background border border-border rounded-sm px-3 py-2 hover:border-accent hover:bg-accent/5 transition-colors text-left"
                      >
                        <MapPin className="h-4 w-4 text-accent shrink-0" />
                        <span>{loc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container pb-20">
          <div className="bg-primary text-primary-foreground p-10 md:p-14 rounded-sm text-center max-w-4xl mx-auto">
            <div className="text-xs font-display tracking-[0.3em] text-accent mb-2">NOT NEAR A RETAILER?</div>
            <h2 className="font-display text-3xl md:text-4xl mb-4 uppercase">Order online.</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              We ship Boundary Signs nationwide. Free shipping on qualifying orders.
            </p>
            <Link
              to="/#products"
              className="inline-flex items-center justify-center h-11 rounded-md px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-display tracking-widest text-sm transition-colors"
            >
              Shop Online
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Retailers;
