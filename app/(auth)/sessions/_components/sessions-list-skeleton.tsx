"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const SessionsListSkeleton = () => (
  <div className="flex flex-col items-center justify-center w-full gap-3">
    {[...Array(2)].map((_, i) => (
      <Card key={i} className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              {/* Avatar */}
              <Skeleton className="h-12 w-12 rounded-full shrink-0" />

              {/* Content */}
              <div className="flex-1 space-y-2">
                {/* Name and badge row */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
                {/* Email row */}
                <Skeleton className="h-4 w-48" />
              </div>
            </div>

            {/* Action button */}
            <Skeleton className="h-9 w-9 rounded-md shrink-0" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);
