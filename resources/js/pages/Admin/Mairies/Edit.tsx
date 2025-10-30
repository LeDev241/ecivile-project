import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import { PageProps } from '@/types/types';
import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';

export default function Edit({ mairie, communes, provinces, arrondissements }: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        nom: mairie.nom || '',
        description_courte: mairie.description_courte || '',
        adresse_complete: mairie.adresse_complete || '',
        telephone_principal: mairie.telephone_principal || '',
        email: mairie.email || '',
        province_id: mairie.province_id?.toString() || '',
        commune_id: mairie.commune_id?.toString() || '',
        arrondissement_id: mairie.arrondissement_id?.toString() || '',
        code_postal: mairie.code_postal || '',
    });

    const submit = (e:React.FormEvent) => {
        e.preventDefault();
        put(route('admin.mairies.update', mairie.id));
    };

    // Filtrage en cascade
    const communesFiltered = communes.filter((c) => c.province_id.toString() === data.province_id);
    const arrondissementsFiltered = arrondissements.filter((a) => a.commune_id.toString() === data.commune_id);

    return (
        <AdminLayout>
            <Head title={`Modifier ${mairie.nom}`} />

            <div className="container mx-auto space-y-4 px-4">
                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Modifier: {mairie.nom}</h3>

                <form onSubmit={submit} className="space-y-4 p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* Nom */}
                        <div className="space-y-2">
                            <Label htmlFor="nom">Nom</Label>
                            <Input id="nom" type="text" value={data.nom} onChange={(e) => setData('nom', e.target.value)} className="rounded-none" />
                            {errors.nom && <div className="mt-1 text-red-500">{errors.nom}</div>}
                        </div>

                        {/* Téléphone */}
                        <div className="space-y-2">
                            <Label htmlFor="telephone_principal">Téléphone principal</Label>
                            <Input
                                id="telephone_principal"
                                type="text"
                                value={data.telephone_principal}
                                onChange={(e) => setData('telephone_principal', e.target.value)}
                                className="rounded-none"
                            />
                            {errors.telephone_principal && <div className="mt-1 text-red-500">{errors.telephone_principal}</div>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="rounded-none"
                            />
                            {errors.email && <div className="mt-1 text-red-500">{errors.email}</div>}
                        </div>

                        {/* Code postal */}
                        <div className="space-y-2">
                            <Label htmlFor="code_postal">Code postal</Label>
                            <Input
                                id="code_postal"
                                type="text"
                                value={data.code_postal}
                                onChange={(e) => setData('code_postal', e.target.value)}
                                className="rounded-none"
                            />
                            {errors.code_postal && <div className="mt-1 text-red-500">{errors.code_postal}</div>}
                        </div>

                        {/* Province */}
                        <div className="space-y-2">
                            <Label>Province</Label>
                            <Select value={data.province_id} onValueChange={(value) => setData('province_id', value)}>
                                <SelectTrigger className="rounded-none">
                                    <SelectValue placeholder="Choisir une province" />
                                </SelectTrigger>
                                <SelectContent className="rounded-none">
                                    {provinces.map((p) => (
                                        <SelectItem key={p.id} value={p.id.toString()}>
                                            {p.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.province_id && <div className="mt-1 text-red-500">{errors.province_id}</div>}
                        </div>

                        {/* Commune */}
                        <div className="space-y-2">
                            <Label>Commune</Label>
                            <Select value={data.commune_id} onValueChange={(value) => setData('commune_id', value)}>
                                <SelectTrigger className="rounded-none">
                                    <SelectValue placeholder="Choisir une commune" />
                                </SelectTrigger>
                                <SelectContent className="rounded-none">
                                    {communesFiltered.map((c) => (
                                        <SelectItem key={c.id} value={c.id.toString()}>
                                            {c.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.commune_id && <div className="mt-1 text-red-500">{errors.commune_id}</div>}
                        </div>

                        {/* Arrondissement */}
                        <div className="space-y-2">
                            <Label>Arrondissement</Label>
                            <Select value={data.arrondissement_id} onValueChange={(value) => setData('arrondissement_id', value)}>
                                <SelectTrigger className="rounded-none">
                                    <SelectValue placeholder="Choisir un arrondissement" />
                                </SelectTrigger>
                                <SelectContent className="rounded-none">
                                    {arrondissementsFiltered.map((a) => (
                                        <SelectItem key={a.id} value={a.id.toString()}>
                                            {a.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.arrondissement_id && <div className="mt-1 text-red-500">{errors.arrondissement_id}</div>}
                        </div>
                    </div>

                    {/* Adresse complète */}
                    <div className="space-y-2">
                        <Label htmlFor="adresse_complete">Adresse complète</Label>
                        <Input
                            id="adresse_complete"
                            type="text"
                            value={`${provinces.find((p) => p.id.toString() === data.province_id)?.nom || ''} - ${
                                communes.find((c) => c.id.toString() === data.commune_id)?.nom || ''
                            } - ${arrondissements.find((a) => a.id.toString() === data.arrondissement_id)?.nom || ''}`}
                            readOnly
                            className="rounded-none bg-gray-200"
                        />
                    </div>

                    {/* Description courte */}
                    <div className="space-y-2">
                        <Label htmlFor="description_courte">Description courte</Label>
                        <Textarea
                            id="description_courte"
                            value={data.description_courte}
                            onChange={(e) => setData('description_courte', e.target.value)}
                            className="rounded-none"
                        />
                        {errors.description_courte && <div className="mt-1 text-red-500">{errors.description_courte}</div>}
                    </div>

                    <div className="mb-8 flex justify-end">
                        <Button type="submit" disabled={processing} className="w-full bg-blue-600 hover:bg-blue-700 sm:w-[200px]">
                            <Save className="mr-2 h-4 w-4" />
                            Mettre à jour
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
