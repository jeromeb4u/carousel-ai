"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Download,
  LayoutTemplate,
  Palette,
  Type,
  FileImage,
  Zap,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Twitter,
  Linkedin,
  Instagram,
  Check,
  Star,
  ArrowRight,
  Layers,
  Smartphone,
  Hash,
} from "lucide-react";

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-surface shadow-sm border-b border-border"
          : "bg-surface/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-text">CarouselAI</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Templates", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted hover:text-text transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#pricing"
              className="text-sm font-medium text-primary hover:opacity-80 transition-opacity"
            >
              Sign in
            </a>
            <a
              href="#pricing"
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-all hover:shadow-md hover:shadow-primary/20"
            >
              Try Free
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-border px-4 pb-4">
          {["Features", "Templates", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-3 text-sm text-muted hover:text-text transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#pricing"
            className="block mt-3 w-full text-center px-4 py-2.5 rounded-md text-sm font-medium text-white bg-primary"
          >
            Try Free
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const [topic, setTopic] = useState("");

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered LinkedIn Carousel Generator
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-tight tracking-tight mb-6">
          One topic.<br />
          <span className="text-primary">10 slides.</span> Done.
        </h1>

        {/* Sub */}
        <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          LinkedIn carousels get 3× more reach than static posts. CarouselAI turns any topic
          or blog post into a professionally designed 10-slide carousel — captions included
          — in under 60 seconds.
        </p>

        {/* CTA Input */}
        <div className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your topic or paste a blog post URL..."
              className="flex-1 px-4 py-3.5 rounded-lg border border-border bg-surface text-text text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <a
              href="#carousel-preview"
              className="px-6 py-3.5 rounded-lg bg-secondary font-medium text-white hover:bg-secondary/90 transition-all hover:shadow-lg hover:shadow-secondary/20 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Generate Carousel
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-muted mt-3">
            Free to start — no credit card required
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Carousel Preview ─────────────────────────────────────────────────────────
function CarouselPreview() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [topic, setTopic] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const mockSlides = [
    { num: 1, title: "The Problem", sub: "Most creators spend 4+ hours on a single carousel post" },
    { num: 2, title: "The Insight", sub: "LinkedIn rewards visual storytelling with 3× more reach" },
    { num: 3, title: "The Hook", sub: "Capture attention in the first 3 seconds or lose the scroll" },
    { num: 4, title: "Structure", sub: "10 slides is the sweet spot for depth without overwhelm" },
    { num: 5, title: "Design Principle #1", sub: "One idea per slide — complexity kills engagement" },
    { num: 6, title: "Design Principle #2", sub: "Bold typography = scannable at a glance" },
    { num: 7, title: "Design Principle #3", sub: "Color contrast guides the eye through your story" },
    { num: 8, title: "The Call-to-Action", sub: "Always end with a question or prompt — never just a logo" },
    { num: 9, title: "Caption Strategy", sub: "First 150 characters must hook — the rest is context" },
    { num: 10, title: "Your Turn", sub: "Pick one topic. Start today. The algorithm waits for no one." },
  ];

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setState("loading");
    setTimeout(() => setState("done"), 2500);
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="carousel-preview" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            See CarouselAI in action
          </h2>
          <p className="text-muted text-lg">
            Enter a topic below and watch the magic happen
          </p>
        </div>

        {/* Demo area */}
        <div className="bg-background rounded-2xl border border-border p-6 sm:p-10">
          {state === "idle" && (
            <div className="flex flex-col items-center justify-center py-12 gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <p className="text-muted text-center">
                Enter a topic and hit generate to preview your carousel
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  placeholder="e.g. How to cold email or My blog post URL"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-surface text-text text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button
                  onClick={handleGenerate}
                  disabled={!topic.trim()}
                  className="px-5 py-3 rounded-lg bg-primary font-medium text-white hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Generate
                </button>
              </div>
            </div>
          )}

          {state === "loading" && (
            <div className="py-8">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <p className="text-center text-muted text-sm mb-8">
                AI is designing your 10-slide carousel...
              </p>
              <div className="flex gap-4 overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="skeleton flex-shrink-0 w-64 h-80 rounded-xl"
                  />
                ))}
              </div>
            </div>
          )}

          {state === "done" && (
            <div>
              {/* Carousel */}
              <div className="relative mb-6">
                {/* Arrow nav */}
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div
                  ref={scrollRef}
                  className="carousel-scroll flex gap-4 overflow-x-auto pb-4 px-8"
                  onScroll={(e) => {
                    const el = e.currentTarget;
                    setActiveSlide(Math.round(el.scrollLeft / (280 + 16)));
                  }}
                >
                  {mockSlides.map((slide) => (
                    <div
                      key={slide.num}
                      className="flex-shrink-0 w-64 bg-surface border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Slide top */}
                      <div className="h-40 bg-primary/5 flex items-center justify-center border-b border-border">
                        <span className="text-6xl font-bold text-primary/20">
                          {slide.num}
                        </span>
                      </div>
                      {/* Slide content */}
                      <div className="p-4">
                        <p className="text-xs font-bold text-primary mb-1">
                          SLIDE {slide.num}
                        </p>
                        <h4 className="font-semibold text-text text-sm mb-2 leading-snug">
                          {slide.title}
                        </h4>
                        <p className="text-xs text-muted leading-relaxed">
                          {slide.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scroll("right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dots + actions */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {mockSlides.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeSlide
                          ? "w-6 bg-primary"
                          : "w-1.5 bg-border"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs font-medium text-text hover:border-primary hover:text-primary transition-all">
                    <Download className="w-3.5 h-3.5" />
                    PNG
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs font-medium text-text hover:border-primary hover:text-primary transition-all">
                    <Download className="w-3.5 h-3.5" />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Features Grid ────────────────────────────────────────────────────────────
const features = [
  {
    icon: Sparkles,
    title: "AI Slide Generation",
    desc: "Paste any topic, blog post, or article URL. Our AI analyzes your content, structures it into 10 compelling slides, and designs each one beautifully.",
  },
  {
    icon: Smartphone,
    title: "LinkedIn-Optimized Dimensions",
    desc: "Every carousel is generated at 1080×1080px — the exact square format LinkedIn's algorithm rewards in the feed.",
  },
  {
    icon: Palette,
    title: "Brand Color Customization",
    desc: "Upload your logo and pick brand colors. Growth+ plans let your carousels look distinctly yours, not generic.",
  },
  {
    icon: Hash,
    title: "Caption Generator",
    desc: "AI-written captions optimized for LinkedIn reach — complete with trending hashtags, hook-first structure, and call-to-action.",
  },
  {
    icon: FileImage,
    title: "PNG/PDF Export",
    desc: "One-click download as PNG (individual slides) or PDF (shareable deck). Ready to post or send to your team.",
  },
  {
    icon: LayoutTemplate,
    title: "Template Library",
    desc: "Pre-built slide structures for common niches: SaaS, marketing, finance, coaching. Pick a template, fill in your content, done.",
  },
];

function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const els = ref.current?.querySelectorAll(".fade-in");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            Everything you need to go viral
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Built for creators who want results without the design skills
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="fade-in p-6 rounded-xl bg-surface border border-border hover:border-primary/40 hover:shadow-md transition-all"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-text mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    icon: Type,
    title: "Enter Your Topic",
    desc: "Type in any topic or paste a blog post URL. The more context you give, the better your carousel.",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "AI Designs",
    desc: "Our AI reads your content, breaks it into 10 key points, designs each slide with professional layout and typography.",
  },
  {
    num: "03",
    icon: Download,
    title: "Download & Post",
    desc: "Export as PNG or PDF, copy the AI-generated caption, and post directly to LinkedIn or Instagram.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            From topic to viral in 3 steps
          </h2>
          <p className="text-muted text-lg">
            No design skills required — ever
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-border" />

          {steps.map((step, i) => (
            <div key={i} className="text-center relative">
              <div className="inline-flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-5 relative">
                  <step.icon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-semibold text-text text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats Bar ───────────────────────────────────────────────────────────────
const stats = [
  { value: "50,000+", label: "Carousels generated" },
  { value: "4.2M", label: "Impressions driven" },
  { value: "3.5×", label: "Avg. engagement lift" },
  { value: "4.9/5", label: "Creator rating" },
];

function StatsBar() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
              {s.value}
            </p>
            <p className="text-sm text-white/70">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Sarah Chen",
    title: "Marketing Director, TechFlow",
    avatar: "SC",
    quote:
      "CarouselAI cut my content production from 4 hours to 4 minutes. Our LinkedIn engagement has never been higher — my carousels regularly hit 5,000+ impressions within 48 hours of posting.",
    impressions: "12,000+",
    metric: "impressions on launch carousels",
  },
  {
    name: "Marcus Williams",
    title: "SaaS Founder, Relay",
    avatar: "MW",
    quote:
      "The LinkedIn algorithm loves these. I posted 8 carousels in 30 days and hit 45K total impressions. My outbound reply rate tripled because people recognized my content style.",
    impressions: "45K",
    metric: "total impressions in 30 days",
  },
  {
    name: "Priya Nair",
    title: "Freelance Strategy Consultant",
    avatar: "PN",
    quote:
      "I went from posting once a month to twice a week — no designer, no Canva subscriptions. CarouselAI is the single best investment I've made in my personal brand this year.",
    impressions: "28K",
    metric: "reach in 30 days",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            Loved by LinkedIn creators
          </h2>
          <p className="text-muted text-lg">
            Real results from real creators who switched to CarouselAI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-surface border border-border hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-sm text-text leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>

              {/* Metric */}
              <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg bg-success/10">
                <span className="text-sm font-bold text-success">{t.impressions}</span>
                <span className="text-xs text-muted">{t.metric}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{t.name}</p>
                  <p className="text-xs text-muted">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ───────────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Starter",
    price: 0,
    tagline: "For creators just getting started",
    limit: "3 carousels / month",
    features: [
      { text: "AI slide generation", included: true },
      { text: "LinkedIn-optimized sizing (1080×1080)", included: true },
      { text: "PNG export", included: true },
      { text: "Basic templates", included: true },
      { text: "Brand color customization", included: false },
      { text: "Template library", included: false },
      { text: "PDF export", included: false },
      { text: "API access", included: false },
    ],
    cta: "Start for Free",
    highlight: false,
  },
  {
    name: "Growth",
    price: 15,
    tagline: "For creators building a real presence",
    limit: "20 carousels / month",
    features: [
      { text: "Everything in Starter", included: true },
      { text: "Brand color customization", included: true },
      { text: "Template library (50+ templates)", included: true },
      { text: "PDF export", included: true },
      { text: "Priority generation queue", included: true },
      { text: "API access", included: false },
      { text: "Unlimited carousels", included: false },
      { text: "Dedicated support", included: false },
    ],
    cta: "Get Growth",
    highlight: true,
  },
  {
    name: "Pro",
    price: 35,
    tagline: "For power users and teams",
    limit: "Unlimited carousels",
    features: [
      { text: "Everything in Growth", included: true },
      { text: "Unlimited carousels", included: true },
      { text: "API access", included: true },
      { text: "Custom dimensions", included: true },
      { text: "Dedicated support", included: true },
      { text: "Team seats (up to 5)", included: true },
    ],
    cta: "Go Pro",
    highlight: false,
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted text-lg">
            Start free. Scale when you're ready.
          </p>
          {/* Annual toggle hint */}
          <p className="text-sm text-muted mt-3">
            Save 20% with annual billing — no code needed
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.highlight
                  ? "bg-primary text-white border-2 border-primary shadow-xl shadow-primary/20"
                  : "bg-surface border border-border"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold">
                  Most Popular
                </div>
              )}

              <div className="mb-5">
                <h3 className={`text-lg font-bold ${plan.highlight ? "text-white" : "text-text"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlight ? "text-white/70" : "text-muted"} mt-1`}>
                  {plan.tagline}
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-text"}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? "text-white/70" : "text-muted"}`}>
                    /mo
                  </span>
                </div>
                <p className={`text-xs mt-1 ${plan.highlight ? "text-white/60" : "text-muted"}`}>
                  {plan.limit}
                </p>
              </div>

              <a
                href="#"
                className={`w-full text-center py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90 ${
                  plan.highlight
                    ? "bg-white text-primary"
                    : "bg-primary text-white"
                }`}
              >
                {plan.cta}
              </a>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    {f.included ? (
                      <Check className={`w-4 h-4 ${plan.highlight ? "text-white" : "text-primary"} flex-shrink-0`} />
                    ) : (
                      <X className="w-4 h-4 text-muted/40 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${f.included ? (plan.highlight ? "text-white/90" : "text-text") : "text-muted/50"}`}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to dominate your LinkedIn feed?
        </h2>
        <p className="text-lg text-white/80 mb-8">
          Join 10,000+ creators already growing with CarouselAI.
        </p>
        <a
          href="#pricing"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-secondary font-bold text-white hover:bg-secondary/90 transition-all hover:shadow-lg hover:shadow-secondary/30"
        >
          Start for Free — No Credit Card Required
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const footerLinks = {
  Product: ["Features", "Pricing", "Templates", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Documentation", "API Reference", "Community", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

function Footer() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-text">CarouselAI</span>
            </a>
            <p className="text-sm text-muted leading-relaxed">
              AI-powered carousels for LinkedIn creators who want results without the design friction.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col}>
              <h4 className="text-sm font-semibold text-text mb-4">{col}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted hover:text-text transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-sm text-muted">
            © 2025 CarouselAI. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/40 transition-all"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <CarouselPreview />
        <FeaturesSection />
        <HowItWorks />
        <StatsBar />
        <TestimonialsSection />
        <PricingSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
