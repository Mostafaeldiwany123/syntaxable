import { Check, X, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/profiles";
import { useState } from "react";
import { BetaTrialDialog } from "@/components/pricing/BetaTrialDialog";

const PricingPage = () => {
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);

  const isPro = profile?.tier === 'pro' || profile?.tier === 'admin';

  const [isBetaDialogOpen, setIsBetaDialogOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const plans = [
    {
      name: "Starter",
      price: "0",
      currency: "EGP",
      priceUSD: "$0",
      description: "Get started for free. Explore the platform and start coding.",
      features: [
        { text: "Up to 3 active projects", included: true },
        { text: "20 AI credits (1 credit = 1 response)", included: true },
        { text: "Access to basic practice sets", included: true },
        { text: "Lite & Dark themes included", included: true },
        { text: "Rate limiting on compiler usage", included: true },
        { text: "Create custom practice sets", included: false },
        { text: "Premium themes", included: false },
      ],
      cta: "Get Started",
      popular: false,
      tier: "free"
    },
    {
      name: "Students",
      price: "100",
      currency: "EGP",
      priceUSD: "$2",
      description: "Unlock your full potential. Built for serious learners.",
      features: [
        { text: "Up to 20 active projects", included: true },
        { text: "300 AI credits (1 credit = 1 response)", included: true },
        { text: "Upload your own folder to the editor", included: true },
        { text: "Access to all 12 premium themes", included: true },
        { text: "Professional profile badge", included: true },
        { text: "Unlimited compiler usage", included: true },
        { text: "Priority support", included: true },
      ],
      cta: "Beta Trial",
      popular: true,
      tier: "pro"
    },
    {
      name: "Teachers",
      price: "300",
      currency: "EGP",
      priceUSD: "$6",
      description: "Create, assign, and monitor. Everything a teacher needs.",
      features: [
        { text: "Everything in Students plan", included: true },
        { text: "500 AI credits per month", included: true },
        { text: "Create custom practice sets", included: true },
        { text: "AI-powered problem generator", included: true },
        { text: "Create custom quizzes with tab monitoring", included: true },
        { text: "AI auto-checker for submissions", included: true },
        { text: "View all users & their activity", included: true },
        { text: "Teacher profile badge", included: true },
      ],
      cta: "Contact Us",
      popular: false,
      tier: "teacher"
    },
  ];

  const faqs = [
    {
      question: "What is a credit?",
      answer: "A credit equals one AI response. Every time you ask the AI assistant a question and it replies, that uses 1 credit. Credits reset monthly."
    },
    {
      question: "What is the Students plan for?",
      answer: "The Students plan is designed for individual learners who want to level up their coding skills. You get more projects, more AI credits, all premium themes, and the ability to upload your own code folders into the editor."
    },
    {
      question: "What is the Teachers plan for?",
      answer: "The Teachers plan is built for educators. You can create custom practice sets, build quizzes with anti-cheating features like tab monitoring, use an AI problem generator to create new exercises instantly, and view all your students' activity on the platform."
    },
    {
      question: "What does \"tab monitoring\" mean in quizzes?",
      answer: "When a teacher creates a quiz, they can enable tab monitoring. This means the system will detect if a student switches tabs or leaves the quiz page during the exam — helping maintain academic integrity."
    },
    {
      question: "What is the AI problem generator?",
      answer: "Teachers can use AI to automatically generate new practice problems complete with test cases. Just describe the topic and difficulty, and the AI creates a ready-to-use coding challenge for your students."
    },
    {
      question: "What is the AI auto-checker?",
      answer: "The AI auto-checker reviews student submissions and provides automated feedback. It checks code correctness, style, and logic — saving teachers time on grading."
    },
    {
      question: "Can I upgrade or downgrade anytime?",
      answer: "Yes! You can upgrade from Starter to Students or Teachers at any time. If you want to downgrade, your current plan will stay active until the end of your billing period."
    },
    {
      question: "What payment methods do you accept?",
      answer: "During the beta period, we're offering free trials. Once payment is live, we'll support Vodafone Cash, InstaPay, and other local Egyptian payment methods, as well as international cards."
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
                      <span className="text-3xl font-bold text-foreground tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground ml-1.5 font-medium uppercase tracking-wider text-xs">
                        {plan.currency}
                      </span>
                      {plan.priceUSD && (
                        <span className="text-primary mx-1.5 font-bold">/ {plan.priceUSD}</span>
                      )}
                      {plan.name !== 'Starter' && (
                        <span className="text-muted-foreground text-sm border-l border-border pl-1.5 h-6 flex items-center ml-1">/mo</span>
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
                          {feature.included ? (
                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground/40 mt-0.5 flex-shrink-0" />
                          )}
                          <span className={`text-sm leading-snug ${feature.included ? 'text-muted-foreground' : 'text-muted-foreground/40 line-through'}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant={plan.popular ? 'default' : 'outline'}
                    className="w-full"
                    disabled={isCurrentPlan}
                    onClick={() => {
                      if (plan.tier === 'pro') {
                        setIsBetaDialogOpen(true);
                      }
                      if (plan.tier === 'teacher') {
                        window.location.href = 'mailto:25-101623@students.eui.edu.eg?subject=Teachers%20Plan%20Inquiry';
                      }
                    }}
                  >
                    {isCurrentPlan ? 'Active Plan' : plan.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <BetaTrialDialog open={isBetaDialogOpen} onOpenChange={setIsBetaDialogOpen} />

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Everything you need to know about our pricing plans.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden transition-colors hover:border-muted-foreground/30"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-5 pb-4 pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
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