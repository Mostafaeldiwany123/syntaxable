import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/profiles";

const PricingPage = () => {
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);

  const isPro = profile?.tier === 'pro' || profile?.tier === 'admin';

  const plans = [
    {
      name: "Starter",
      price: "0",
      currency: "EGP",
      description: "Essential features for individuals and small side projects.",
      features: [
        "Up to 3 active projects",
        "20 AI credits (1 credit = 1 response)",
        "Access to basic practice sets",
        "Community support",
        "Rate limiting on compiler usage",
      ],
      cta: "Get Started",
      popular: false,
      tier: "free"
    },
    {
      name: "Professional",
      price: "100",
      currency: "EGP",
      description: "Advanced tools for power users and serious learners.",
      features: [
        "Up to 20 active projects",
        "300 AI credits (1 credit = 1 response)",
        "Upload your own folder to the editor",
        "Unlimited language compiler usage",
        "Create custom practice sets",
        "Professional profile badge",
        "Early access to new features"
      ],
      cta: "Upgrade to Pro",
      popular: true,
      tier: "pro"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Scale your organization with custom limits and controls.",
      features: [
        "Unlimited projects & credits",
        "Team management dashboard",
        "Dedicated account manager",
        "Custom API integrations",
        "SLA & priority 24/7 support",
        "Custom billing & invoicing"
      ],
      cta: "Contact Sales",
      popular: false,
      tier: "enterprise"
    },
  ];

  return (
    <div className="min-h-full bg-background py-12 sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-muted-foreground font-semibold tracking-wider uppercase text-xs mb-3">
            Pricing Plans
          </h2>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            Ready to level up your workflow?
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Choose a plan that scales with your ambition. No hidden fees, no long-term contracts.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const isCurrentPlan = (plan.tier === 'free' && !isPro) || (plan.tier === 'pro' && isPro);

            return (
              <div
                key={plan.name}
                className={`relative group flex flex-col bg-card rounded-xl border transition-all duration-300 ${plan.popular
                  ? 'border-primary shadow-lg ring-1 ring-primary md:scale-[1.02] z-10'
                  : 'border-border shadow-sm hover:border-muted-foreground/30'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-0.5">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                      {isCurrentPlan && (
                        <Badge variant="outline" className="text-xs font-medium">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground min-h-[36px] leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="mt-5 flex items-baseline">
                      {plan.price === "Custom" ? (
                        <span className="text-3xl font-bold text-foreground tracking-tight">
                          Talk to us
                        </span>
                      ) : (
                        <>
                          <span className="text-3xl font-bold text-foreground tracking-tight">
                            {plan.price}
                          </span>
                          <span className="text-muted-foreground ml-1.5 font-medium">
                            {plan.currency}
                          </span>
                          {plan.name !== 'Starter' && (
                            <span className="text-muted-foreground text-sm ml-1">/mo</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 flex-grow">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      What's included
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground leading-snug">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant={plan.popular ? 'default' : 'outline'}
                    className="w-full"
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? 'Active Plan' : plan.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-16 border-t border-border pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-foreground">Need a custom setup?</h4>
              <p className="text-muted-foreground text-sm">We offer special discounts for educational institutions and non-profits.</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="mailto:25-101623@students.eui.edu.eg"
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                25-101623@students.eui.edu.eg
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;