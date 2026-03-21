import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicyPage = () => {
  const lastUpdated = "March 18, 2026";

  return (
    <div className="min-h-screen bg-background py-12 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-muted-foreground font-semibold tracking-wider uppercase text-xs mb-3">
            Privacy Policy
          </h2>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            Your privacy matters
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            We're committed to protecting your personal data and being transparent about how we use it.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Information We Collect */}
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-6">Information We Collect</h3>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong>Account Information:</strong> When you create an account, we collect your email address, name, and any profile information you choose to provide.
              </p>
              <p>
                <strong>Usage Data:</strong> We collect information about how you use our services, including features accessed, time spent, and interaction patterns.
              </p>
              <p>
                <strong>Code and Projects:</strong> Your code, projects, and practice sets are stored securely and are only accessible to you and those you choose to share with.
              </p>
              <p>
                <strong>Technical Data:</strong> We collect device information, IP address, and browser type to improve service performance and security.
              </p>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-6">How We Use Your Information</h3>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong>Service Provision:</strong> To provide and maintain our coding practice and collaboration platform.
              </p>
              <p>
                <strong>Personalization:</strong> To customize your experience and recommend relevant content based on your activity.
              </p>
              <p>
                <strong>Communication:</strong> To send you important updates about your account and our services.
              </p>
              <p>
                <strong>Improvement:</strong> To analyze usage patterns and improve our features and performance.
              </p>
              <p>
                <strong>Security:</strong> To protect against fraud, abuse, and ensure platform security.
              </p>
            </div>
          </section>

          {/* Data Sharing and Protection */}
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-6">Data Sharing and Protection</h3>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong>We Never Sell Your Data:</strong> We do not sell, rent, or trade your personal information to third parties.
              </p>
              <p>
                <strong>Sharing:</strong> We only share your data when required by law, with your explicit consent, or with service providers who help us operate our platform under strict confidentiality agreements.
              </p>
              <p>
                <strong>Security:</strong> We use industry-standard encryption and security measures to protect your data both in transit and at rest.
              </p>
              <p>
                <strong>Code Privacy:</strong> Your code is private by default and only visible to collaborators you explicitly invite.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-6">Your Rights</h3>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong>Access:</strong> You can request a copy of your personal data at any time.
              </p>
              <p>
                <strong>Correction:</strong> You can update or correct your personal information.
              </p>
              <p>
                <strong>Deletion:</strong> You can delete your account and all associated data.
              </p>
              <p>
                <strong>Portability:</strong> You can export your data in a usable format.
              </p>
              <p>
                <strong>Opt-out:</strong> You can opt out of non-essential communications and data collection.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-6">Questions or Concerns?</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              If you have any questions about this privacy policy or how we handle your data, please don't hesitate to contact us.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <a 
                  href="mailto:25-101623@students.eui.edu.eg" 
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Contact Privacy Team
                </a>
              </Button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-border pt-10 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This privacy policy is part of our commitment to transparency and user trust. 
            We may update this policy occasionally to reflect changes in our practices or legal requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
