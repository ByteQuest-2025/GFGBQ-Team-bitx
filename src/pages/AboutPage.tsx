import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search, 
  Brain, 
  CheckCircle, 
  Database, 
  Globe, 
  BookOpen, 
  Users,
  Shield,
  AlertTriangle,
  Scale,
  Eye,
  ArrowRight
} from "lucide-react";

const pipelineSteps = [
  {
    icon: FileText,
    title: "Content Ingestion",
    description: "Text, URLs, or documents are parsed and preprocessed for analysis"
  },
  {
    icon: Search,
    title: "Claim Extraction",
    description: "AI identifies factual claims, statements, and assertions"
  },
  {
    icon: Database,
    title: "Source Retrieval",
    description: "Claims are matched against verified databases and sources"
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Large language models assess claim validity and context"
  },
  {
    icon: CheckCircle,
    title: "Verification",
    description: "Cross-reference multiple sources for confidence scoring"
  }
];

const dataSources = [
  {
    category: "Academic Databases",
    icon: BookOpen,
    sources: ["PubMed", "Semantic Scholar", "arXiv", "JSTOR", "Google Scholar"]
  },
  {
    category: "Fact-Check Organizations",
    icon: Shield,
    sources: ["Snopes", "PolitiFact", "FactCheck.org", "Full Fact", "AFP Fact Check"]
  },
  {
    category: "Government & Institutional",
    icon: Globe,
    sources: ["WHO", "CDC", "NASA", "NOAA", "Official Statistics Agencies"]
  },
  {
    category: "News & Media",
    icon: Users,
    sources: ["Reuters", "AP News", "BBC", "The Guardian", "NPR"]
  }
];

const ethicsPrinciples = [
  {
    icon: Scale,
    title: "Transparency",
    description: "We clearly explain our methodology, limitations, and confidence levels. Every verification includes traceable sources and reasoning."
  },
  {
    icon: Shield,
    title: "Neutrality",
    description: "Our analysis is politically and ideologically neutral. We verify facts, not opinions, and present evidence without bias."
  },
  {
    icon: Eye,
    title: "Privacy",
    description: "User data is processed securely and not stored beyond the analysis session. We do not track or profile users."
  },
  {
    icon: Users,
    title: "Accountability",
    description: "We welcome feedback and corrections. Our team regularly audits results and updates our models to reduce errors."
  }
];

const limitations = [
  {
    title: "Emerging Information",
    description: "Very recent events may not be fully indexed in our source databases. Breaking news verification may have reduced accuracy."
  },
  {
    title: "Language Coverage",
    description: "Primary support is for English content. Other languages may have reduced source coverage and accuracy."
  },
  {
    title: "Opinion vs Fact",
    description: "We verify factual claims only. Opinions, predictions, and subjective statements cannot be fact-checked."
  },
  {
    title: "Context Sensitivity",
    description: "Satire, sarcasm, and context-dependent statements may be misinterpreted. Always review AI reasoning."
  },
  {
    title: "Source Availability",
    description: "Paywalled, private, or restricted content may not be accessible for verification."
  },
  {
    title: "AI Limitations",
    description: "Like all AI systems, our models can make errors. Human review is recommended for critical decisions."
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 border-b border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4">
              About VeriFact AI
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Our Methodology
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understanding how VeriFact AI analyzes content, verifies claims, 
              and provides transparent, research-grade fact-checking.
            </p>
          </div>
        </section>

        {/* Pipeline Visualization */}
        <section className="py-16 px-4 border-b border-border">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Verification Pipeline</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our multi-stage pipeline ensures thorough analysis of every claim
              </p>
            </div>

            <div className="relative">
              {/* Desktop Pipeline */}
              <div className="hidden md:flex items-center justify-between">
                {pipelineSteps.map((step, index) => (
                  <div key={step.title} className="flex items-center">
                    <div className="flex flex-col items-center text-center max-w-[160px]">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 border-2 border-primary">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                    {index < pipelineSteps.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-muted-foreground mx-4 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Pipeline */}
              <div className="md:hidden space-y-6">
                {pipelineSteps.map((step, index) => (
                  <div key={step.title} className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      {index < pipelineSteps.length - 1 && (
                        <div className="absolute top-12 left-1/2 w-0.5 h-6 bg-border -translate-x-1/2" />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="py-16 px-4 border-b border-border bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Data Sources</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We cross-reference claims against trusted, authoritative sources
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {dataSources.map((category) => (
                <Card key={category.category} className="bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-primary" />
                      </div>
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.sources.map((source) => (
                        <Badge key={source} variant="secondary" className="font-normal">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ethics Section */}
        <section className="py-16 px-4 border-b border-border">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Ethics</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Guiding principles that shape our approach to fact verification
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {ethicsPrinciples.map((principle) => (
                <Card key={principle.title} className="bg-card">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-verified/10 flex items-center justify-center flex-shrink-0">
                        <principle.icon className="w-6 h-6 text-verified" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{principle.title}</h3>
                        <p className="text-sm text-muted-foreground">{principle.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-uncertain mb-4">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Important Considerations</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Known Limitations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We believe in transparency about what our system can and cannot do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {limitations.map((limitation) => (
                <Card key={limitation.title} className="bg-card border-uncertain/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2 text-sm">{limitation.title}</h3>
                    <p className="text-sm text-muted-foreground">{limitation.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-lg bg-muted/50 border border-border text-center">
              <p className="text-muted-foreground">
                Have questions about our methodology?{" "}
                <a href="/contact" className="text-primary hover:underline font-medium">
                  Contact our research team
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
