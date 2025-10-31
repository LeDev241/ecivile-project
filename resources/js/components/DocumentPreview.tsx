import { FileText, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface Props {
    path?: string | null | File;
    label: string;
}

export default function DocumentPreview({ path, label }: Props) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Si path est un File, créer un URL temporaire
    useEffect(() => {
        if (path instanceof File) {
            const url = URL.createObjectURL(path);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [path]);

    const openPreview = () => {
        if (path && typeof path === 'string') {
            setPreviewUrl(`/preview?path=${encodeURIComponent(path)}`);
        }
    };

    const closePreview = () => setPreviewUrl(null);

    const isProvided = path != null;

    return (
        <div className="mb-4">
            <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>

            {isProvided ? (
                <button
                    type="button"
                    onClick={openPreview}
                    className="mt-1 flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-blue-700 transition hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800"
                >
                    <FileText className="h-4 w-4" />
                    <span>Voir le document</span>
                </button>
            ) : (
                <p className="mt-1 text-gray-500 italic dark:text-gray-400">Non fourni</p>
            )}

            {/* Modale */}
            {previewUrl && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="animate-fadeIn relative h-[90vh] w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-900">
                        {/* Barre de titre */}
                        <div className="flex items-center justify-between bg-black/80 px-4 py-1">
                            <h3 className="text-sm font-semibold text-gray-100">{label}</h3>
                            <Button
                                size={'sm'}
                                onClick={closePreview}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive p-0 font-semibold hover:bg-destructive/90"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Contenu du document */}
                        <div className="h-full w-full">
                            <iframe src={previewUrl} className="h-full w-full" title={`Aperçu - ${label}`} />
                        </div>

                        <div className="absolute bottom-2 w-full text-center text-xs text-gray-600 dark:text-gray-400">
                            Si le document ne s’affiche pas, essayez de le télécharger depuis le navigateur.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
