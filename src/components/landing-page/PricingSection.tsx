import { motion } from "framer-motion";
import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { BetaTrialDialog } from "@/components/pricing/BetaTrialDialog";

const plans = [
  {
    name: "Starter",
    price: "0",
    currency: "EGP",
    priceUSD: "$0",
    description: "Essential features for individuals and small side projects.",
    features: [
      "Up to 3 active projects",
      "20 AI credits (1 credit = 1 response)",
      "Access to basic practice sets",
      "Lite & Dark themes included",
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
    priceUSD: "$2",
    description: "Advanced tools for power users and serious learners.",
    features: [
      "Up to 20 active projects",
      "300 AI credits (1 credit = 1 response)",
      "Upload your own folder to the editor",
      "Access to all premium themes",
      "Create custom practice sets",
      "Professional profile badge",
    ],
    cta: "Beta Trial",
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

export const PricingSection = () => {
  const [isBetaDialogOpen, setIsBetaDialogOpen] = useState(false);

  return (
    <>
      <section id="pricing" className="py-24 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-semibold tracking-wider uppercase text-xs mb-3"
            >
              Pricing Plans
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4"
            >
              Ready to level up your workflow?
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Choose a plan that scales with your ambition. No hidden fees, no long-term contracts.
            </motion.p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group flex flex-col bg-card/50 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${plan.popular
                  ? 'border-primary shadow-2xl shadow-primary/10 md:scale-[1.05] z-10'
                  : 'border-border shadow-sm hover:border-muted-foreground/30'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 border-none font-bold">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground min-h-[40px] leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="mt-6 flex items-baseline">
                      {plan.price === "Custom" ? (
                        <span className="text-4xl font-bold text-foreground tracking-tight">
                          Custom
                        </span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-foreground tracking-tight">
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground ml-1.5 font-medium uppercase tracking-wider text-xs">
                          {plan.currency}
                        </span>
                        {plan.priceUSD && (
                          <span className="text-primary mx-2 font-bold focus:shadow-none">/ {plan.priceUSD}</span>
                        )}
                        {plan.name !== 'Starter' && (
                          <span className="text-muted-foreground text-sm border-l border-border pl-1.5 h-6 flex items-center ml-1">/mo</span>
                        )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 flex-grow">
                    <p className="text-sm font-medium text-muted-foreground/80 mb-1">
                      What's included
                    </p>

                    <ul className="space-y-3.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant={plan.popular ? 'default' : 'outline'}
                    className={`w-full h-11 transition-all ${plan.popular ? 'shadow-lg shadow-primary/20' : ''}`}
                    onClick={() => {
                      if (plan.tier === 'pro') {
                        setIsBetaDialogOpen(true);
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-20 border-t border-border/50 pt-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-secondary/30 rounded-2xl p-8 border border-border/50">
              <div className="text-center md:text-left">
                <h4 className="font-semibold text-foreground text-lg mb-1">Need a custom setup?</h4>
                <p className="text-muted-foreground">We offer special discounts for educational institutions and non-profits.</p>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="mailto:25-101623@students.eui.edu.eg"
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:text-primary hover:border-primary/30 transition-all shadow-sm group"
                >
                  <Mail className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  25-101623@students.eui.edu.eg
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <BetaTrialDialog open={isBetaDialogOpen} onOpenChange={setIsBetaDialogOpen} />
    </>
  );
};

export default PricingSection;
