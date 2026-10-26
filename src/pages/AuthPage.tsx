import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const ACCENT = "text-blue-500";

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marwan Ashraf",
    role: "EUI Student",
    quote: "An amazing website, very organized and easy to use. It tackles every programming aspect and helps master it.",
    rating: 10,
  },
  {
    name: "Eyad Tamer",
    role: "EUI Student",
    quote: "Syntaxable is really useful for saving, reusing and memorising your code.",
    rating: 10,
  },
  {
    name: "Karas Ayman",
    role: "EUI Student",
    quote: "Syntaxable is pretty good when it comes to group projects cause all members of the project can code live and save their code on the cloud without having to send the code back and forth between each other.",
    rating: 10,
  },
  {
    name: "Youssef Ehab",
    role: "EUI Student",
    quote: "Such an amazing website where it takes me step by step to improve my programming skills and has nice well structured problems that is organized from easy to difficult. And looks good.",
    rating: 10,
  },
];

const StarRow = ({ rating }: { rating: number }) => (
  <div className="flex shrink-0 items-center gap-0.5" aria-label={`${rating} out of 10`}>
    {Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={cn(
          "h-3.5 w-3.5",
          index < 5 ? "fill-amber-400 text-amber-400" : "fill-transparent text-border"
        )}
      />
    ))}
  </div>
);

const TestimonialSlide = ({ testimonial }: { testimonial: Testimonial }) => (
  <figure className="flex min-h-[19rem] flex-col justify-center">
    <span
      aria-hidden="true"
      className={cn("font-serif text-6xl leading-none opacity-25", ACCENT)}
    >
      "
    </span>

    <blockquote className="mt-3 text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl sm:leading-snug">
      {testimonial.quote}
    </blockquote>

    <figcaption className="mt-8 flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
      </div>
      <StarRow rating={testimonial.rating} />
    </figcaption>
  </figure>
);

const AuthPage = () => {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
  };

  return (
    <div className="grid min-h-dvh bg-background text-foreground lg:grid-cols-2">
      {/* Left: authentication */}
      <div className="flex flex-col px-6 py-8 sm:px-12 lg:px-16">
        <div className="flex items-center gap-2.5">
          <img src="/syntaxable.png" alt="Syntaxable" className="h-8 w-8 object-contain" />
          <span className="text-lg font-bold tracking-tight">Syntaxable</span>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {tab === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {tab === "signin"
                ? "Sign in to continue your practice."
                : "Start learning to code the right way."}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-1 rounded-lg border border-border bg-secondary/40 p-1">
              <button
                type="button"
                onClick={() => setTab("signin")}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  tab === "signin"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab("signup")}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  tab === "signup"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Sign Up
              </button>
            </div>

            <div className="mt-6">
              {tab === "signin" ? <SignInForm /> : <SignUpForm />}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 text-[11px] text-muted-foreground/80 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-1.5">
            <img
              src="/eui-logo.png"
              alt="Egyptian University of Informatics"
              className="h-4 w-4 object-contain"
            />
            <span>Made for Egyptian University of Informatics students</span>
          </div>
          <span>Made by Mostafa Eldiwany</span>
        </div>
      </div>

      {/* Right: testimonial carousel */}
      <div className="hidden border-l border-border bg-secondary/20 lg:flex lg:flex-col lg:justify-center lg:px-12 xl:px-20">
        <div className="mx-auto w-full max-w-lg">
          <div className="min-h-[19rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <TestimonialSlide testimonial={TESTIMONIALS[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === activeIndex ? "w-6 bg-blue-500" : "w-1.5 bg-border hover:bg-muted-foreground/40"
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={goPrev}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={goNext}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
