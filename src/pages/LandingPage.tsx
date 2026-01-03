import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Shield, 
  CheckCircle2, 
  Search, 
  FileText, 
  ArrowRight,
  Sparkles,
  BookOpen,
  Link2,
  AlertTriangle
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-verified/5" />
          <div className="container relative py-20 lg:py-32">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-verified-light border border-verified/20 text-verified text-sm font-medium animate-fade-in">
                <Shield className="w-4 h-4" />
                Trusted by 10,000+ Researchers
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Detect AI Hallucinations.
                <br />
                <span className="text-primary">Verify Every Citation.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                VeriFact AI identifies fake citations, non-existent references, and broken links in AI-generated content. 
                Build trust in every document.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Link to="/verify">
                  <Button size="lg" className="w-full sm:w-auto gap-2 text-base">
                    Verify AI Content
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                    See How It Works
                  </Button>
                </Link>
              </div>

              {/* Hero Visual */}
              <div className="mt-12 relative animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="bg-card rounded-2xl border shadow-2xl p-6 max-w-2xl mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-hallucinated" />
                    <div className="w-3 h-3 rounded-full bg-uncertain" />
                    <div className="w-3 h-3 rounded-full bg-verified" />
                  </div>
                  <div className="space-y-3 text-left text-sm">
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-verified shrink-0 mt-0.5" />
                      <span>
                        <span className="highlight-verified">"According to Smith et al. (2023), climate change..."</span>
                        <span className="text-muted-foreground ml-2">✓ Verified in CrossRef</span>
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-hallucinated shrink-0 mt-0.5" />
                      <span>
                        <span className="highlight-hallucinated">"The Johnson 2024 study proves..."</span>
                        <span className="text-muted-foreground ml-2">✗ Citation not found</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem-Solution Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                AI Makes Mistakes. We Catch Them.
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Large language models can fabricate citations, invent statistics, and reference non-existent papers. 
                VeriFact AI cross-references every claim against trusted academic databases.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Fake Citations",
                  description: "AI often invents author names, journal titles, and publication dates that don't exist.",
                  color: "text-hallucinated",
                },
                {
                  icon: Link2,
                  title: "Broken DOIs",
                  description: "References with invalid or non-functional DOI links that lead nowhere.",
                  color: "text-uncertain",
                },
                {
                  icon: AlertTriangle,
                  title: "Misattributed Claims",
                  description: "Statistics and findings incorrectly attributed to the wrong source.",
                  color: "text-hallucinated",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-card rounded-xl border p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4 ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3-Step Workflow */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg">
                Three simple steps to verify your AI-generated content
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  icon: FileText,
                  title: "Analyze",
                  description: "Paste your AI-generated text or upload a document. Our system extracts all claims and citations.",
                },
                {
                  step: "02",
                  icon: Search,
                  title: "Verify",
                  description: "We cross-reference against CrossRef, PubMed, arXiv, and Google Scholar to validate each source.",
                },
                {
                  step: "03",
                  icon: Sparkles,
                  title: "Explain",
                  description: "Get a detailed report with confidence scores, source links, and suggested corrections.",
                },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-border -translate-x-1/2 z-0">
                      <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <div className="text-xs font-bold text-primary mb-2">STEP {item.step}</div>
                    <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <p className="text-center text-sm text-muted-foreground mb-8">
              Trusted by researchers at leading institutions
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
              {["Stanford", "MIT", "Harvard", "Oxford", "Berkeley"].map((uni) => (
                <div key={uni} className="text-xl font-bold text-foreground/50">
                  {uni}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20">
          <div className="container">
            <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Verify Your Content?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                Start detecting AI hallucinations and verifying citations in seconds. No signup required.
              </p>
              <Link to="/verify">
                <Button size="lg" variant="secondary" className="text-base gap-2">
                  Get Started for Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
