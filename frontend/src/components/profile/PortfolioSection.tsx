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
    <Card>
      <h2 className="p-4 text-lg font-semibold border-b border-gray-200 dark:border-gray-700">
        Portfolio
      </h2>
      <div className="space-y-4 p-4">
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

        <div className="flex items-center justify-between rounded-lg border border-dashed border-gray-300 p-3 dark:border-gray-600">
          <p className="text-sm text-gray-700 dark:text-gray-200">
            Curriculum Vitae (CV)
          </p>
          <Button variant="outline" size="sm">
            <Upload size={14} className="mr-2" />
            Upload CV
          </Button>
        </div>
      </div>
      <div className="border-t border-gray-200 p-4 dark:border-gray-700 flex justify-end">
        <Button onClick={handleSave}>Save Portfolio</Button>
      </div>
    </Card>
  );
};
