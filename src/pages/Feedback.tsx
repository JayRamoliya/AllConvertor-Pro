
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import ConverterLayout from "@/components/ConverterLayout";

const Feedback = () => {
  const { toast } = useToast();
  const [feedbackType, setFeedbackType] = useState("suggestion");
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback! We'll review it shortly.",
    });
    
    // Reset form
    event.currentTarget.reset();
    setFeedbackType("suggestion");
  };

  return (
    <ConverterLayout
      title="Feedback & Suggestions"
      description="Help us improve AllConvertor Pro by sharing your feedback or suggesting new features"
      backLink="/"
      icon={<Search className="w-5 h-5" />}
    >
      <div className="max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Feedback Type</h3>
            <RadioGroup 
              defaultValue="suggestion" 
              value={feedbackType}
              onValueChange={setFeedbackType}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="suggestion" id="suggestion" />
                <Label htmlFor="suggestion">Feature Suggestion</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bug" id="bug" />
                <Label htmlFor="bug">Report a Bug</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="general" id="general" />
                <Label htmlFor="general">General Feedback</Label>
              </div>
            </RadioGroup>
          </div>

          {feedbackType === "bug" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="page">Which page has the issue?</Label>
                <Input 
                  id="page" 
                  placeholder="e.g. Length Converter"
                  required={feedbackType === "bug"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="steps">Steps to reproduce</Label>
                <Textarea 
                  id="steps" 
                  placeholder="What steps can we take to see the issue?"
                  required={feedbackType === "bug"}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          {feedbackType === "suggestion" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feature">What converter or feature would you like to see?</Label>
                <Input 
                  id="feature" 
                  placeholder="e.g. Add a shoe size converter"
                  required={feedbackType === "suggestion"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feature-details">Feature details</Label>
                <Textarea 
                  id="feature-details" 
                  placeholder="Please describe the feature in more detail"
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">
              {feedbackType === "general" ? "Your feedback" : "Additional comments"}
            </Label>
            <Textarea 
              id="message" 
              placeholder="Share your thoughts with us"
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your@email.com"
            />
            <p className="text-xs text-gray-500">
              We'll only use this to follow up on your feedback if necessary.
            </p>
          </div>

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-converter-primary to-converter-secondary hover:from-converter-primary/90 hover:to-converter-secondary/90"
          >
            Submit Feedback
          </Button>
        </form>
      </div>
    </ConverterLayout>
  );
};

export default Feedback;
