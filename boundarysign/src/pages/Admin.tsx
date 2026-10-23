import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Trash2, Check } from "lucide-react";

interface Content { id: string; key: string; title: string | null; body: string | null; image_url: string | null; }
interface Member { id: string; name: string; role: string | null; bio: string | null; photo_url: string | null; display_order: number; }
interface BulkReq { id: string; name: string; email: string; company: string | null; phone: string | null; quantity: string | null; message: string | null; created_at: string; }
interface PhotoSub { id: string; name: string; email: string | null; caption: string | null; photo_url: string; approved: boolean; created_at: string; }

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [contents, setContents] = useState<Content[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [bulks, setBulks] = useState<BulkReq[]>([]);
  const [photos, setPhotos] = useState<PhotoSub[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  const refresh = async () => {
    const [c, m, b, p] = await Promise.all([
      supabase.from("site_content").select("*").order("key"),
      supabase.from("team_members").select("*").order("display_order"),
      supabase.from("bulk_order_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("photo_submissions").select("*").order("created_at", { ascending: false }),
    ]);
    setContents(c.data || []); setMembers(m.data || []); setBulks(b.data || []); setPhotos(p.data || []);
  };

  useEffect(() => { if (isAdmin) refresh(); }, [isAdmin]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;
  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col"><SiteHeader />
      <main className="flex-1 container py-24 text-center">
        <h1 className="font-display text-3xl mb-4">NOT AUTHORIZED</h1>
        <p className="text-muted-foreground">Your account isn't an admin. Contact the site owner.</p>
        <Button onClick={signOut} className="mt-6">Sign out</Button>
      </main><SiteFooter />
    </div>
  );

  const updateContent = async (c: Content) => {
    const { error } = await supabase.from("site_content").update({ title: c.title, body: c.body, image_url: c.image_url }).eq("id", c.id);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else toast({ title: "Saved" });
  };

  const uploadImage = async (bucket: string, file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) { toast({ title: "Upload failed", description: error.message, variant: "destructive" }); return null; }
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  };

  const addMember = async () => {
    const { error } = await supabase.from("team_members").insert({ name: "New Member", display_order: members.length + 1 });
    if (error) toast({ title: error.message, variant: "destructive" }); else refresh();
  };

  const updateMember = async (m: Member) => {
    const { error } = await supabase.from("team_members").update({
      name: m.name, role: m.role, bio: m.bio, photo_url: m.photo_url, display_order: m.display_order,
    }).eq("id", m.id);
    if (error) toast({ title: error.message, variant: "destructive" }); else toast({ title: "Saved" });
  };

  const deleteMember = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await supabase.from("team_members").delete().eq("id", id);
    refresh();
  };

  const approvePhoto = async (id: string, approved: boolean) => {
    await supabase.from("photo_submissions").update({ approved }).eq("id", id);
    refresh();
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    await supabase.from("photo_submissions").delete().eq("id", id);
    refresh();
  };

  const deleteBulk = async (id: string) => {
    if (!confirm("Delete this request?")) return;
    await supabase.from("bulk_order_requests").delete().eq("id", id);
    refresh();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl">ADMIN DASHBOARD</h1>
          <Button variant="outline" onClick={signOut}>Sign out</Button>
        </div>

        <Tabs defaultValue="content">
          <TabsList className="mb-6">
            <TabsTrigger value="content">Site Content</TabsTrigger>
            <TabsTrigger value="team">Team ({members.length})</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Orders ({bulks.length})</TabsTrigger>
            <TabsTrigger value="photos">Photos ({photos.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            {contents.map(c => (
              <Card key={c.id} className="p-6">
                <div className="text-xs font-mono text-muted-foreground mb-2">KEY: {c.key}</div>
                <Label>Title</Label>
                <Input value={c.title || ""} onChange={e => setContents(contents.map(x => x.id === c.id ? { ...x, title: e.target.value } : x))} />
                <Label className="mt-3">Body</Label>
                <Textarea rows={6} value={c.body || ""} onChange={e => setContents(contents.map(x => x.id === c.id ? { ...x, body: e.target.value } : x))} />
                <Label className="mt-3">Image (optional)</Label>
                <div className="flex gap-3 items-center">
                  <Input type="file" accept="image/*" onChange={async e => {
                    const f = e.target.files?.[0]; if (!f) return;
                    const url = await uploadImage("site-images", f);
                    if (url) setContents(contents.map(x => x.id === c.id ? { ...x, image_url: url } : x));
                  }} />
                  {c.image_url && <img src={c.image_url} className="h-16 w-16 object-cover" alt="" />}
                </div>
                <Button className="mt-4" onClick={() => updateContent(c)}>Save</Button>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Button onClick={addMember}>+ Add member</Button>
            {members.map(m => (
              <Card key={m.id} className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={m.name} onChange={e => setMembers(members.map(x => x.id === m.id ? { ...x, name: e.target.value } : x))} />
                    <Label className="mt-3">Role</Label>
                    <Input value={m.role || ""} onChange={e => setMembers(members.map(x => x.id === m.id ? { ...x, role: e.target.value } : x))} />
                    <Label className="mt-3">Display order</Label>
                    <Input type="number" value={m.display_order} onChange={e => setMembers(members.map(x => x.id === m.id ? { ...x, display_order: parseInt(e.target.value) || 0 } : x))} />
                  </div>
                  <div>
                    <Label>Bio</Label>
                    <Textarea rows={4} value={m.bio || ""} onChange={e => setMembers(members.map(x => x.id === m.id ? { ...x, bio: e.target.value } : x))} />
                    <Label className="mt-3">Photo</Label>
                    <div className="flex gap-3 items-center">
                      <Input type="file" accept="image/*" onChange={async e => {
                        const f = e.target.files?.[0]; if (!f) return;
                        const url = await uploadImage("team-photos", f);
                        if (url) setMembers(members.map(x => x.id === m.id ? { ...x, photo_url: url } : x));
                      }} />
                      {m.photo_url && <img src={m.photo_url} className="h-16 w-16 object-cover" alt="" />}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => updateMember(m)}>Save</Button>
                  <Button variant="destructive" onClick={() => deleteMember(m.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="bulk" className="space-y-3">
            {bulks.length === 0 && <p className="text-muted-foreground">No requests yet.</p>}
            {bulks.map(b => (
              <Card key={b.id} className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-display text-lg">{b.name} <span className="text-sm text-muted-foreground">— {b.email}</span></div>
                    <div className="text-xs text-muted-foreground">{new Date(b.created_at).toLocaleString()}</div>
                    {b.company && <div className="text-sm mt-1"><b>Company:</b> {b.company}</div>}
                    {b.phone && <div className="text-sm"><b>Phone:</b> {b.phone}</div>}
                    {b.quantity && <div className="text-sm"><b>Quantity:</b> {b.quantity}</div>}
                    {b.message && <div className="text-sm mt-2 whitespace-pre-wrap">{b.message}</div>}
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => deleteBulk(b.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="photos" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.length === 0 && <p className="text-muted-foreground">No submissions yet.</p>}
            {photos.map(p => (
              <Card key={p.id} className="overflow-hidden">
                <img src={p.photo_url} alt={p.caption || ""} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="font-display">{p.name}</div>
                  {p.email && <div className="text-xs text-muted-foreground">{p.email}</div>}
                  {p.caption && <p className="text-sm mt-2">{p.caption}</p>}
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant={p.approved ? "outline" : "default"} onClick={() => approvePhoto(p.id, !p.approved)}>
                      <Check className="h-4 w-4 mr-1" />{p.approved ? "Approved" : "Approve"}
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => deletePhoto(p.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
      <SiteFooter />
    </div>
  );
}
