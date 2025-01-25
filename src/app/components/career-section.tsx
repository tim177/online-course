"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building2, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { generateJobTips } from "../actions/ai-generate";

const JOB_LISTINGS = [
  {
    title: "Senior React Developer",
    company: "Tech Corp",
    location: "Remote",
    salary: "$120k - $180k",
    requirements: ["Next.js", "React", "TypeScript", "Node.js"],
  },
  {
    title: "Frontend Tech Lead",
    company: "StartupX",
    location: "New York, NY",
    salary: "$140k - $200k",
    requirements: ["React", "System Design", "Team Leadership", "Next.js"],
  },
];

interface CareerSectionProps {
  courseTitle: string;
}

interface JobTip {
  title: string;
  content: string;
}

export function CareerSection({ courseTitle }: CareerSectionProps) {
  const [jobTips, setJobTips] = useState<JobTip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchJobTips() {
      setLoading(true);
      setError("");
      try {
        const result = await generateJobTips(courseTitle);
        if (result.success) {
          setJobTips(result.tips);
        } else {
          setError(result.error || "Failed to generate job tips");
        }
      } catch (err) {
        setError("An error occurred while generating job tips");
      } finally {
        setLoading(false);
      }
    }

    fetchJobTips();
  }, [courseTitle]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Career Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="space-y-4">
              {jobTips.map((tip, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <h3 className="font-medium">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.content}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Related Job Listings</h3>
              {JOB_LISTINGS.map((job, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{job.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4 mr-1" />
                        {job.company} • {job.location}
                      </div>
                    </div>
                    <div className="text-sm font-medium">{job.salary}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, reqIndex) => (
                      <Badge key={reqIndex} variant="secondary">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
