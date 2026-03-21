import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share2, ArrowRight, QrCode, Twitter } from "lucide-react";

import { toast } from "sonner";

const RoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const roomUrl = `${window.location.origin}/editor/${roomId}`;
  
  // Show only last 8 characters for easier sharing
  const shortCode = roomId ? roomId.slice(-8) : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomUrl);
    toast.success("Room link copied to clipboard!");
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join my room",
          text: "Join my collaborative editor room",
          url: roomUrl,
        });
      } catch (_) {}
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-background">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Room Created</CardTitle>
                <CardDescription>Share the code or scan the QR to join</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 md:mb-6 text-center">
            <div className="inline-flex rounded-2xl px-6 py-3 bg-primary/10">
              <span className="font-extrabold tracking-widest font-mono text-primary text-4xl md:text-6xl">{shortCode}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Share this code to invite others</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border p-6">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Scan to join</span>
              </div>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(roomUrl)}`}
                alt="Room QR Code"
                className="rounded-md border bg-white p-2"
                width={160}
                height={160}
              />

            </div>

            <div className="flex flex-col gap-4">
              <div className="flex w-full items-center gap-2">
                <Input type="text" value={roomUrl} readOnly className="font-mono" />
                <Button type="button" size="icon" onClick={copyToClipboard} aria-label="Copy link">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button onClick={shareLink}>
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button asChild className="bg-social-whatsapp hover:bg-social-whatsapp-active">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent("Join my room: " + roomUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </a>
                </Button>
                <Button asChild className="bg-social-twitter hover:bg-social-twitter-active">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Join my room")}&url=${encodeURIComponent(roomUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Twitter className="mr-2 h-4 w-4" /> Twitter
                  </a>
                </Button>
              </div>

              <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                Share this link with others to invite them to your collaborative editor.
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <span>Full ID</span>
            <span className="h-4 w-px bg-border" />
            <span className="tracking-widest text-base font-semibold">{roomId}</span>
          </div>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to={`/editor/${roomId}`}>
              Enter Room <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoomPage;