import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Lock } from "lucide-react";

interface CertificateProps {
  progress: number;
}

export function Certificate({ progress }: CertificateProps) {
  const isUnlocked = progress >= 100;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">Course Certificate</h3>
            <p className="text-sm text-muted-foreground">
              {isUnlocked
                ? "Congratulations! You can now download your certificate."
                : "Complete the course to unlock your certificate."}
            </p>
          </div>
          <Button disabled={!isUnlocked}>
            {isUnlocked ? (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Locked
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
