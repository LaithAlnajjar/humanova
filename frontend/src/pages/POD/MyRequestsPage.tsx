import React from "react";
import { Link } from "react-router-dom";
import { MyRequestsList } from "@/components/pod/MyRequestsList";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

const MyRequestsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Support Requests
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track the status of your assistance applications.
          </p>
        </div>
        <Link to="/dashboard/pod/request">
          <Button className="shadow-md bg-humanova-olive hover:bg-humanova-oliveDark text-white">
            <Plus size={18} className="mr-2" /> New Request
          </Button>
        </Link>
      </div>

      {/* The list component we built earlier */}
      <MyRequestsList />
    </div>
  );
};

export default MyRequestsPage;
