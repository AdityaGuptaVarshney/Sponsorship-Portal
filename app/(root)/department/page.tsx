import React from 'react'
import { SummaryMetrics } from "@/components/dashboard/SummaryMetrics";
import { summaryMetrics } from "@/app/utils/mockData";
import { FinancialMetrics } from "@/components/dashboard/FinancialMetrics";
import { DeliverableStatus } from "@/components/dashboard/DeliverableStatus";
import { SponsorPerformance } from "@/components/dashboard/SponsorPerformance";
import { DepartmentPerformance } from "@/components/dashboard/DepartmentPerformance";
import { getCurrentUser } from '@/lib/actions/auth.action';
import {redirect} from "next/navigation";

const Page = async () => {
    const user = await getCurrentUser();
    if (!user || user.role !== 'department') {
        return redirect('/sign-in'); // or '/sign_in'
    }
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-y-auto p-6 bg-background/95">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{user?.name} Dashboard</h1>
                        <p className="text-muted-foreground">
                            Overview of all sponsorship activities and performance metrics. role {user?.role}
                        </p>
                    </div>

                    <SummaryMetrics data={summaryMetrics} />

                    <div className="grid gap-6 md:grid-cols-2">
                        <FinancialMetrics />
                        <div className="grid gap-6 grid-cols-1">
                            <DeliverableStatus />
                        </div>
                    </div>

                    <SponsorPerformance />

                    <DepartmentPerformance />
                </div>
            </main>
        </div>
    )
}

export default Page;
