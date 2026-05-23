"use client";

import { ArrowRight, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedPosts } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function HomeScreen() {
    const { data, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ["featured-posts"],
        queryFn: fetchFeaturedPosts,
    });

    return (
        <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-16 sm:px-8 lg:px-10">
            <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
                <section className="space-y-6">
                    <div className="inline-flex items-center rounded-full border bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur">
                        Next.js starter with Tailwind, shadcn/ui, axios, and TanStack Query
                    </div>
                    <div className="space-y-4">
                        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                            A clean endpoint-ready foundation for building your next app.
                        </h1>
                        <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                            The scaffold is wired for structured data fetching, reusable UI components, and a src-based App Router setup.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button className="h-11 rounded-full px-5" asChild>
                            <a href="#data">
                                View sample data
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                        <Button variant="outline" className="h-11 rounded-full px-5" onClick={() => refetch()}>
                            <RefreshCw className={isFetching ? "mr-2 h-4 w-4 animate-spin" : "mr-2 h-4 w-4"} />
                            Refresh endpoint data
                        </Button>
                    </div>
                </section>

                <Card className="border-slate-200/80 bg-white/85 shadow-xl shadow-slate-200/60 backdrop-blur" id="data">
                    <CardHeader>
                        <CardTitle>Featured endpoint preview</CardTitle>
                        <CardDescription>
                            This card is backed by axios + TanStack Query and can be swapped for your real API later.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isLoading ? (
                            <p className="text-sm text-slate-500">Loading data from the endpoint...</p>
                        ) : isError ? (
                            <p className="text-sm text-red-600">Could not load sample data.</p>
                        ) : (
                            <ul className="space-y-3">
                                {data?.slice(0, 3).map((post) => (
                                    <li key={post.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                        <p className="text-sm font-medium text-slate-900">{post.title}</p>
                                        <p className="mt-1 text-sm text-slate-600">{post.body}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}