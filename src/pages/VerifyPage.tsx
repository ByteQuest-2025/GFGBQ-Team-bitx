import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Link2, 
  BookOpen,
  Loader2,
  X,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_CHARACTERS = 5000;

// Mock recent checks data
const recentChecks = [
  { id: "1", title: "Research Paper Draft", date: "2 hours ago" },
  { id: "2", title: "Blog Post on Climate", date: "Yesterday" },
  { id: "3", title: "Literature Review", date: "3 days ago" },
];

export default function VerifyPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Analysis options
  const [claimVerification, setClaimVerification] = useState(true);
  const [citationValidation, setCitationValidation] = useState(true);
  const [linkChecking, setLinkChecking] = useState(true);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setUploadedFile(file);
      }
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  }, []);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    // Navigate to results with mock data
    navigate("/results", { 
      state: { 
        text: text || "Sample analyzed content",
        options: { claimVerification, citationValidation, linkChecking }
      } 
    });
  };

  const canAnalyze = (text.trim().length > 0 || uploadedFile) && !isAnalyzing;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Verify Content</h1>
            <p className="text-muted-foreground">
              Paste your AI-generated text or upload a document to detect hallucinations and verify citations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Input Area */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="paste" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="paste" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Paste Text
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Upload File
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="paste" className="mt-4">
                  <div className="relative">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value.slice(0, MAX_CHARACTERS))}
                      placeholder="Paste your AI-generated content here..."
                      className="w-full h-64 p-4 rounded-lg border bg-card text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                      {text.length.toLocaleString()} / {MAX_CHARACTERS.toLocaleString()}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="upload" className="mt-4">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                      "h-64 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-colors",
                      isDragging ? "border-primary bg-primary/5" : "border-border",
                      uploadedFile && "border-verified bg-verified-light"
                    )}
                  >
                    {uploadedFile ? (
                      <div className="text-center">
                        <FileText className="w-12 h-12 text-verified mx-auto mb-3" />
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedFile(null)}
                          className="text-muted-foreground"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-muted-foreground" />
                        <div className="text-center">
                          <p className="font-medium">Drop your file here</p>
                          <p className="text-sm text-muted-foreground">
                            or click to browse (PDF, DOCX)
                          </p>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.docx"
                          onChange={handleFileSelect}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Analysis Options */}
              <div className="bg-card rounded-lg border p-6 space-y-4">
                <h3 className="font-semibold">Analysis Options</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <Label htmlFor="claim-verification" className="text-sm cursor-pointer">
                        Claim Verification
                      </Label>
                    </div>
                    <Switch
                      id="claim-verification"
                      checked={claimVerification}
                      onCheckedChange={setClaimVerification}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <Label htmlFor="citation-validation" className="text-sm cursor-pointer">
                        Citation Validation
                      </Label>
                    </div>
                    <Switch
                      id="citation-validation"
                      checked={citationValidation}
                      onCheckedChange={setCitationValidation}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-primary" />
                      <Label htmlFor="link-checking" className="text-sm cursor-pointer">
                        Link Checking
                      </Label>
                    </div>
                    <Switch
                      id="link-checking"
                      checked={linkChecking}
                      onCheckedChange={setLinkChecking}
                    />
                  </div>
                </div>
              </div>

              {/* Analyze Button */}
              <Button 
                size="lg" 
                className="w-full text-base" 
                disabled={!canAnalyze}
                onClick={handleAnalyze}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Content"
                )}
              </Button>
            </div>

            {/* Sidebar - Recent Checks */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Checks
                </h3>
                <div className="space-y-3">
                  {recentChecks.map((check) => (
                    <button
                      key={check.id}
                      className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <p className="font-medium text-sm truncate">{check.title}</p>
                      <p className="text-xs text-muted-foreground">{check.date}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <h3 className="font-semibold mb-3 text-primary">Tips for Best Results</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Include full citations with author names and years</li>
                  <li>• Provide DOI links when available</li>
                  <li>• Check academic content works best</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
