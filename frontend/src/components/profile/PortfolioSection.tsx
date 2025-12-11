import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { type Portfolio } from "@/types/student";
import { Github, Upload } from "lucide-react";

interface PortfolioSectionProps {
  portfolio: Portfolio;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolio: initialPortfolio,
}) => {
  const [portfolio, setPortfolio] = useState(initialPortfolio);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPortfolio({ ...portfolio, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // In a real app, call a mutation to save the portfolio data
    console.log("Saving portfolio:", portfolio);
    alert("Portfolio links saved!");
  };

  return (
    <Card className="rounded-3xl">
      <h2 className="p-6 text-lg font-semibold border-b border-gray-200 dark:border-gray-700">
        Portfolio
      </h2>
      <div className="p-6 space-y-6">
        <Input
          name="githubUrl"
          label="GitHub URL"
          placeholder="https://github.com/your-username"
          value={portfolio.githubUrl}
          onChange={handleChange}
          icon={<Github size={16} />}
        />
        <Input
          name="behanceUrl"
          label="Behance URL"
          placeholder="https://www.behance.net/your-profile"
          value={portfolio.behanceUrl}
          onChange={handleChange}
          // icon={<Behance size={16} />} // Behance icon is not available in lucide-react
        />

        <div className="flex items-center justify-between rounded-xl border border-dashed border-gray-300 p-4 dark:border-gray-600">
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-200">
              Curriculum Vitae (CV)
            </p>
            <p className="text-sm text-gray-500">
              {portfolio.cvUrl ? "cv_document_2024.pdf" : "No CV uploaded"}
            </p>
          </div>
          <Button variant="outline" className="w-32">
            <Upload size={16} className="mr-2 " />
            Upload
          </Button>
        </div>
        <div className="flex justify-end">
          <Button className="w-32" onClick={handleSave}>
            Save Portfolio
          </Button>
        </div>
      </div>
    </Card>
  );
};
