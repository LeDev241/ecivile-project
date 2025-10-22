import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type NavItem } from '@/types';
import { ChartColumnBig, FolderPlus, LayoutGrid, MessageCircleQuestion, Plus } from 'lucide-react';
import { ReactNode } from 'react';

// Breadcrumbs par défaut pour l'admin
const defaultBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: route('dashboard'),
    },
];

const mainNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: route('hopital.dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Nouvelle déclaration',
        href: route('hopital.declarations.create'),
        icon: Plus,
    },
    {
        title: 'Liste des déclarations',
        href: route('hopital.declarations.index'),
        icon: FolderPlus,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Statistique',
        href: route('hopital.declarations.statistic'),
        icon: ChartColumnBig,
    },
    {
        title: 'FAQ',
        href: '#',
        icon: MessageCircleQuestion,
    },
];

interface AdminLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function HopitalLayout({ children, breadcrumbs }: AdminLayoutProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs ?? defaultBreadcrumbs} mainNavItems={mainNavItems} footerNavItems={footerNavItems}>
            {children}
        </AppLayout>
    );
}
