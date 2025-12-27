// src/components/company/SupervisorManager.tsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSupervisors, addSupervisor } from "../../services/companyService";
import { Supervisor } from "../../types/company";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";

const SupervisorManager = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data: supervisors, isLoading } = useQuery({
    queryKey: ["supervisors"],
    queryFn: getSupervisors,
  });

  const mutation = useMutation({
    mutationFn: () => addSupervisor(name, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supervisors"] });
      setName("");
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="space-y-6 px-32">
      <h1 className="text-2xl font-semibold">Manage Supervisors</h1>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Supervisor</h2>
        <form onSubmit={handleSubmit} className="flex items-end gap-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-grow"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={mutation.isPending} className="px-6">
            {mutation.isPending ? "Adding..." : "Add Supervisor"}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Current Supervisors</h2>
        {isLoading ? (
          <p>Loading supervisors...</p>
        ) : (
          <ul className="space-y-3">
            {supervisors?.map((sup: Supervisor) => (
              <li
                key={sup.id}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50"
              >
                <div>
                  <p className="font-semibold">{sup.name}</p>
                  <p className="text-sm text-gray-400">{sup.email}</p>
                </div>
                <p className="text-sm">
                  {sup.assignedInterns} interns assigned
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default SupervisorManager;
