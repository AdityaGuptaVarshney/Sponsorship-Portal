"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
// Assuming `DataTable` is a custom component you created, not part of shadcn:
import { DataTable } from "@/components/ui/DataTable"; // or wherever your file is located

import {
    Plus,
    FileText,
    Edit,
    Trash,
    Maximize,
    Minimize,
    X,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { sponsors, deliverables } from "@/app/utils/mockData";
import EditSponsorForm from "@/components/sponsors/EditSponsorForm";
import {AddTaskForm} from "@/components/sponsors/AddtaskForm";

export default function SponsorDetailsView({
                                               sponsorId,
                                               onToggleFullScreen,
                                               isFullScreen = false,
                                               onClose
                                           }: {
    sponsorId: number;
    onToggleFullScreen?: () => void;
    isFullScreen?: boolean;
    onClose?: () => void;
}) {
    const [showEditSponsor, setShowEditSponsor] = useState(false);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

    const sponsor = sponsors.find((s) => s.id === sponsorId);
    const sponsorDeliverables = deliverables.filter((d) => d.sponsorId === sponsorId);

    if (!sponsor) return <div>Sponsor not found</div>;

    const deliverableColumns = [
        {
            header: "Task",
            accessorKey: "title",
        },
        {
            header: "Type",
            accessorKey: "taskType",
            cell: (row: any) => (
                <Badge
                    variant="outline"
                    className={
                        row.taskType === "standard"
                            ? "border-blue-500 text-blue-500"
                            : "border-green-500 text-green-500"
                    }
                >
                    {row.taskType === "standard" ? "Standard" : "Cost-Based"}
                </Badge>
            ),
        },
        {
            header: "Department",
            accessorKey: "departmentId",
            cell: (row: any) => {
                const deptNames: { [key: number]: string } = {
                    1: "Marketing",
                    2: "Finance",
                    3: "Events",
                    4: "PR & Communications",
                    5: "Digital",
                    6: "Production",
                };
                return deptNames[row.departmentId] || "Unknown";
            },
        },
        {
            header: "Due Date",
            accessorKey: "dueDate",
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: any) => (
                <Badge
                    className={
                        row.status === "completed"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : row.status === "in_progress"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : row.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                >
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1).replace("_", " ")}
                </Badge>
            ),
        },
        {
            header: "Priority",
            accessorKey: "priority",
            cell: (row: any) => (
                <Badge
                    variant="outline"
                    className={
                        row.priority === "high"
                            ? "border-red-500 text-red-500"
                            : row.priority === "medium"
                                ? "border-yellow-500 text-yellow-500"
                                : "border-green-500 text-green-500"
                    }
                >
                    {row.priority}
                </Badge>
            ),
        },
        {
            header: "Actions",
            accessorKey: "id",
            cell: (row: any) => (
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    const totalValue = sponsor.totalValue;
    const cashValue = sponsor.cashValue;
    const inKindValue = sponsor.inKindValue;
    const estimatedCost = sponsor.estimatedCost;
    const actualCost = sponsor.actualCost || "Pending";
    const profitMargin = sponsor.actualCost
        ? ((totalValue - sponsor.actualCost) / totalValue) * 100
        : ((totalValue - estimatedCost) / totalValue) * 100;

    return (
        <div className={`space-y-6 ${isFullScreen ? "p-6" : ""}`}>
            {isFullScreen && (
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Sponsor Details</h1>
                    <div className="flex space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onToggleFullScreen}
                            className="h-8 w-8 p-0"
                        >
                            <Minimize className="h-4 w-4" />
                        </Button>
                        {onClose && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="h-8 w-8 p-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">{sponsor.name}</h2>
                    <p className="text-muted-foreground capitalize">{sponsor.status} Sponsor</p>
                </div>
                <div className="flex space-x-2">
                    {!isFullScreen && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onToggleFullScreen}
                            className="h-8 w-8 p-0"
                        >
                            <Maximize className="h-4 w-4" />
                        </Button>
                    )}
                    <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" /> View MOU
                    </Button>
                    <Button variant="outline" onClick={() => setShowEditSponsor(true)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Sponsor
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks & Deliverables</TabsTrigger>
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Sponsorship Value</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {cashValue > 0 && inKindValue > 0
                                        ? `Cash: $${cashValue.toLocaleString()} / In-Kind: $${inKindValue.toLocaleString()}`
                                        : cashValue > 0
                                            ? 'Cash Sponsorship'
                                            : 'In-Kind Sponsorship'
                                    }
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Deliverable Completion</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{((sponsor.completedDeliverables / sponsor.totalDeliverables) * 100).toFixed(0)}%</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {sponsor.completedDeliverables} of {sponsor.totalDeliverables} tasks completed
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <div
                                        className="bg-primary h-2.5 rounded-full"
                                        style={{ width: `${(sponsor.completedDeliverables / sponsor.totalDeliverables) * 100}%` }}
                                    ></div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{profitMargin}%</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    Est. Cost: ${estimatedCost.toLocaleString()} / Actual: {typeof actualCost === 'number' ? `$${actualCost.toLocaleString()}` : actualCost}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Sponsor Information</CardTitle>
                            <CardDescription>Key details about the sponsor</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground">Legal Name</h4>
                                        <p>{sponsor.name} LLC</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground">Level</h4>
                                        <p>Platinum</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground">Priority</h4>
                                        <p>High</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground">Associated Events</h4>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            <Badge variant="outline">Main Event (Presents)</Badge>
                                            <Badge variant="outline">Workshop (Powered)</Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
                                        <p>John Smith, Partnerships Director</p>
                                        <p className="text-sm text-muted-foreground">john.smith@example.com | (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tasks" className="space-y-4 py-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Tasks & Deliverables</h3>
                    </div>


                    <Card>
                        <CardContent className="p-0">
                            <DataTable
                                data={sponsorDeliverables}
                                columns={deliverableColumns}
                                searchable={true}
                                searchPlaceholder="Search tasks..."
                            />
                            <Collapsible
                                open={isTaskFormOpen}
                                onOpenChange={setIsTaskFormOpen}
                                className="w-full"
                            >
                                <CollapsibleTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full py-3 bg-muted/40 hover:bg-muted mt-2 border-dashed"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        {isTaskFormOpen ? 'Cancel Adding Task' : 'Add New Task'}
                                        {isTaskFormOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                                    </Button>
                                </CollapsibleTrigger>
                            </Collapsible>

                            <Collapsible
                                open={isTaskFormOpen}
                                onOpenChange={setIsTaskFormOpen}
                                className="w-full"
                            >
                                <CollapsibleContent className="border rounded-lg p-4 mb-4 bg-card">
                                    <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
                                    <AddTaskForm
                                        sponsorId={sponsorId}
                                        onSuccess={() => setIsTaskFormOpen(false)}
                                    />
                                </CollapsibleContent>
                            </Collapsible>
                        </CardContent>
                    </Card>


                </TabsContent>

                <TabsContent value="financial" className="space-y-4 py-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Financial Summary</CardTitle>
                            <CardDescription>Costs and values associated with this sponsorship</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Sponsorship Value</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>Cash Value</span>
                                                <span className="font-medium">${cashValue.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>In-Kind Value</span>
                                                <span className="font-medium">${inKindValue.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between border-t pt-2">
                                                <span>Total Value</span>
                                                <span className="font-bold">${totalValue.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Costs & Expenses</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>Estimated Cost</span>
                                                <span className="font-medium">${estimatedCost.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Actual Cost</span>
                                                <span className="font-medium">
                          {typeof actualCost === 'number' ? `$${actualCost.toLocaleString()}` : actualCost}
                        </span>
                                            </div>
                                            <div className="flex justify-between border-t pt-2">
                                                <span>Profit Margin</span>
                                                <span className="font-bold">{profitMargin}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Task Cost Breakdown</h4>
                                    <div className="border rounded-lg overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-muted">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Task</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Department</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Cost Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Estimated</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actual</th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-card divide-y divide-gray-200">
                                            {sponsorDeliverables.map((task) => {
                                                const deptNames: { [key: number]: string } = {
                                                    1: "Marketing",
                                                    2: "Finance",
                                                    3: "Events",
                                                    4: "PR & Communications",
                                                    5: "Digital",
                                                    6: "Production"
                                                };
                                                return (
                                                    <tr key={task.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{task.title}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{deptNames[task.departmentId]}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            {task.taskType === 'cost' ? task.costType || 'Standard' : 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">${task.estimatedCost.toLocaleString()}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            {task.actualCost ? `$${task.actualCost.toLocaleString()}` : "Pending"}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Edit Sponsor Dialog */}
            <Dialog open={showEditSponsor} onOpenChange={setShowEditSponsor}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Edit Sponsor</DialogTitle>
                    </DialogHeader>
                    <EditSponsorForm
                        sponsorId={sponsorId}
                        onSuccess={() => setShowEditSponsor(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
