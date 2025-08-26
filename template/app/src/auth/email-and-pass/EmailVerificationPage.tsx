import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";

export function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setError("Invalid verification link — missing token.");
        setIsLoading(false);
        return;
      }

      try {
        // Adjust this path to match your backend route
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.message || "Email verification failed.");
        }

        setSuccess(true);
      } catch (e: any) {
        setError(e?.message || "Email verification failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [searchParams]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <CardTitle>Verifying Email</CardTitle>
                <CardDescription>
                  Please wait while we verify your email address...
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Card className="border-success">
            <CardHeader>
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success/10 mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <CardTitle className="text-success">Email Verified!</CardTitle>
                <CardDescription className="mt-2">
                  Your email has been successfully verified.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-success text-success">
                <AlertDescription>
                  🎉 You can now sign in and start using your account.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/">Go to Homepage</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="border-destructive">
          <CardHeader>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-destructive/10 mb-4">
                <span className="text-2xl">❌</span>
              </div>
              <CardTitle className="text-destructive">Verification Failed</CardTitle>
              <CardDescription className="mt-2">
                We couldn't verify your email address.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold mb-2">Possible reasons:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• The verification link has expired</li>
                <li>• The link has already been used</li>
                <li>• The link is malformed or incomplete</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Button className="w-full" asChild>
                <Link to="/signup">Request New Verification</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login">Try Logging In</Link>
              </Button>
            </div>

            <div className="text-center">
              <Link to="/" className="text-sm text-primary hover:text-primary/80">
                ← Back to homepage
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
