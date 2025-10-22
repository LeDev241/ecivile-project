import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type NavItem } from '@/types';
import { ChartColumnBig, LayoutGrid, List, MessageCircleQuestion } from 'lucide-react';
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
        href: route('mairie.dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Liste des déclarations',
        href: route('mairie.declarations.index', { statut: 'envoyee' }),
        icon: List,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Statistique',
        href: route('mairie.declarations.statistic'),
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

export default function MairieLayout({ children, breadcrumbs }: AdminLayoutProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs ?? defaultBreadcrumbs} mainNavItems={mainNavItems} footerNavItems={footerNavItems}>
            {children}
        </AppLayout>
    );
}
