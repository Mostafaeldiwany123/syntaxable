import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share2, ArrowRight, QrCode, Globe, EyeOff, Bot } from "lucide-react";
import { useCustomSet, useUpdateCustomSetVisibility, useUpdateCustomSetAIEnabled } from "@/hooks/customSets";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CustomSetSharePage = () => {
  const { setId } = useParams<{ setId: string }>();
  const { data: customSet, isLoading } = useCustomSet(setId);
  const { mutate: updateVisibility, isPending: isUpdatingVisibility } = useUpdateCustomSetVisibility();
  const { mutate: updateAIEnabled, isPending: isUpdatingAI } = useUpdateCustomSetAIEnabled();

  const setUrl = `${window.location.origin}/practice/custom/${setId}`;
  // Show only last 8 characters for easier sharing
  const shortCode = setId ? setId.slice(-8).toUpperCase() : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(setUrl);
    toast.success("Link copied to clipboard!");
  };

  const copyShortCode = () => {
    navigator.clipboard.writeText(shortCode);
    toast.success("Code copied to clipboard!");
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: customSet?.title || "Practice Problem Set",
          text: `Check out this practice problem set: ${customSet?.title}\n\nCode: ${shortCode}`,
          url: setUrl,
        });
      } catch (_) { }
    } else {
      copyToClipboard();
    }
  };

  const handleTogglePublic = (isPublic: boolean) => {
    updateVisibility({ setId: setId!, isPublic });
  };

  const handleToggleAI = (aiEnabled: boolean) => {
    updateAIEnabled({ setId: setId!, aiEnabled });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-full bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">{customSet?.title || "Custom Set"}</CardTitle>
              <CardDescription>Share this practice set with others</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Share Code */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">Share Code</p>
            <div
              className="inline-flex rounded-2xl px-6 py-3 bg-primary/10 cursor-pointer hover:bg-primary/20 transition-colors"
              onClick={copyShortCode}
            >
              <span className="font-extrabold tracking-widest font-mono text-primary text-4xl md:text-5xl">
                {shortCode}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Click to copy</p>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visibility Toggle */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/30">
              <div className="flex items-center gap-3">
                {customSet?.is_public ? (
                  <Globe className="h-5 w-5 text-primary" />
                ) : (
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <Label htmlFor="public-toggle" className="font-medium cursor-pointer">
                    {customSet?.is_public ? 'Public Set' : 'Unlisted Set'}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {customSet?.is_public
                      ? 'Appears in public listings.'
                      : 'By code or link only.'}
                  </p>
                </div>
              </div>
              <Switch
                id="public-toggle"
                checked={customSet?.is_public || false}
                onCheckedChange={handleTogglePublic}
                disabled={isUpdatingVisibility}
              />
            </div>

            {/* AI Assistant Toggle */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/30">
              <div className="flex items-center gap-3">
                <Bot className={`h-5 w-5 ${customSet?.ai_enabled !== false ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <Label htmlFor="ai-toggle" className="font-medium cursor-pointer">
                    AI Assistant {customSet?.ai_enabled !== false ? 'On' : 'Off'}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {customSet?.ai_enabled !== false
                      ? 'Participants have AI help.'
                      : 'AI assistant is disabled.'}
                  </p>
                </div>
              </div>
              <Switch
                id="ai-toggle"
                checked={customSet?.ai_enabled !== false}
                onCheckedChange={handleToggleAI}
                disabled={isUpdatingAI}
              />
            </div>
          </div>

          {/* QR Code and Link */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <QrCode className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Scan to join</span>
              </div>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(setUrl)}`}
                alt="QR Code"
                className="rounded-md border bg-white p-2"
                width={140}
                height={140}
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex w-full items-center gap-2">
                <Input type="text" value={setUrl} readOnly className="font-mono text-xs flex-1" />
                <Button type="button" size="icon" onClick={copyToClipboard} aria-label="Copy link">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={shareLink} className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button asChild variant="outline" className="bg-social-whatsapp text-white hover:bg-social-whatsapp-active border-0">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent("Check out this practice set! Code: " + shortCode + " " + setUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </a>
                </Button>
              </div>

              <div className="rounded-lg border p-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">How to share:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Share the <strong>8-character code</strong> above</li>
                  <li>Others enter it on the Practice page</li>
                  <li>Or share the full link directly</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-mono">Full ID:</span>
            <span className="tracking-wider">{setId}</span>
          </div>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to={`/practice/custom/${setId}`}>
              Start Practicing <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomSetSharePage;