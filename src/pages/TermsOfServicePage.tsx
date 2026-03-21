import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsOfServicePage = () => {
  const lastUpdated = "March 18, 2026";

  return (
    <div className="min-h-screen bg-background py-12 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-muted-foreground font-semibold tracking-wider uppercase text-xs mb-3">
            Terms of Service
          </h2>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            Our agreement with you
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            These terms govern your use of our coding practice and collaboration platform.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <section className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">1. Acceptance of Terms</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                By creating an account and using our platform, you agree to these Terms of Service and our Privacy Policy. 
                If you do not agree to these terms, you should not use our services.
              </p>
              <p>
                We may update these terms occasionally. Continued use of our services after changes constitutes acceptance of the updated terms.
              </p>
            </div>
          </section>

          {/* Services Provided */}
          <section className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">2. Services Provided</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Coding Practice:</strong> Access to coding problems, practice sets, and learning materials across multiple programming languages.
              </p>
              <p>
                <strong>Collaboration Tools:</strong> Features for real-time collaboration, code sharing, and team projects.
              </p>
              <p>
                <strong>AI Assistance:</strong> AI-powered code suggestions and learning assistance (subject to usage limits based on your subscription tier).
              </p>
              <p>
                <strong>Custom Sets:</strong> Ability to create and share custom practice sets (Pro feature).
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">3. User Responsibilities</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials.
              </p>
              <p>
                <strong>Appropriate Use:</strong> Use our services for legitimate learning and collaboration purposes only.
              </p>
              <p>
                <strong>Code Ownership:</strong> You retain ownership of code you create, but grant us license to provide and improve our services.
              </p>
              <p>
                <strong>Prohibited Activities:</strong> You may not use our services for malicious activities, plagiarism, or violating intellectual property rights.
              </p>
            </div>
          </section>

          {/* Subscription and Billing */}
          <section className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">4. Subscription and Billing</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Free Tier:</strong> Basic features are available free of charge with reasonable usage limits.
              </p>
              <p>
                <strong>Paid Plans:</strong> Pro and Enterprise plans offer enhanced features and higher usage limits.
              </p>
              <p>
                <strong>Billing:</strong> Subscription fees are charged monthly or annually as selected. Prices may change with 30 days notice.
              </p>
              <p>
                <strong>Refunds:</strong> We offer refunds within 14 days of initial subscription for new users.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">5. Intellectual Property</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Your Content:</strong> You retain all rights to code and content you create on our platform.
              </p>
              <p>
                <strong>Platform Content:</strong> Our practice problems, tutorials, and platform features are protected by intellectual property laws.
              </p>
              <p>
                <strong>License:</strong> You grant us a limited license to use, store, and process your content to provide our services.
              </p>
            </div>
          </section>

          {/* Privacy and Data */}
          <section className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">6. Privacy and Data</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Our collection and use of personal data is governed by our Privacy Policy, which is incorporated into these terms.
              </p>
              <p>
                We implement reasonable security measures to protect your data, but cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">7. Limitation of Liability</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Our services are provided "as is" without warranties of any kind.
              </p>
              <p>
                We shall not be liable for indirect, incidental, or consequential damages arising from your use of our services.
              </p>
              <p>
                Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.
              </p>
            </div>
          </section>

          {/* Service Availability */}
          <section className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">8. Service Availability</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                We strive to maintain high service availability but cannot guarantee 100% uptime.
              </p>
              <p>
                We may temporarily suspend services for maintenance, updates, or technical issues.
              </p>
              <p>
                We reserve the right to discontinue services with reasonable notice to users.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-6">Questions About These Terms?</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              If you have any questions about these Terms of Service, please reach out to us.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <a 
                  href="mailto:25-101623@students.eui.edu.eg" 
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Contact Legal Team
                </a>
              </Button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-border pt-10 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            These terms are designed to be fair and transparent. If you have suggestions for improvement, 
            we'd love to hear from you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
