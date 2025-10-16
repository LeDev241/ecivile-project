import { type ElementType } from 'react';
import { PlaceholderPattern } from './ui/placeholder-pattern';

interface StatCardProps {
    icon: ElementType;
    title: string;
    value: number | string;
    bgColor: string;
}

export default function StatCard({ icon: Icon, title, value, bgColor }: StatCardProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-xl border border-sidebar-border/70 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-sidebar-border ${bgColor} flex min-h-[150px] flex-col items-center justify-center p-4 sm:min-h-[180px]`}
        >
            <PlaceholderPattern className="absolute inset-0 h-full w-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                <div className="flex items-center justify-center rounded-full bg-white/20 p-3 backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="mt-2 flex max-w-[90%] flex-col items-center gap-1 text-center">
                    <h3 className="text-sm font-bold break-words text-white sm:text-base md:text-lg">{title}</h3>
                    <p className="truncate text-lg font-semibold text-white sm:text-xl">{value}</p>
                </div>
            </div>
        </div>
    );
}
