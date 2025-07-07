'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

interface IComplaint {
    title: string;
    description: string;
    status: string;
    priority: string;
    createdAt: string;
    _id: string;
}

export default function ComplaintDetailsPage() {
    const { id } = useParams();
    const router = useRouter();

    const [complaint, setComplaint] = useState<IComplaint | null>(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const res = await axios.get(`/api/complaints/admin/${id}`);
                const data = res.data?.complaint;
                setComplaint(data);
                setStatus(data?.status || '');
            } catch (err) {
                console.error(err);
            }
        };
        fetchComplaint();
    }, [id]);

    const complaintId = complaint?._id

    const handleUpdateStatus = async () => {
        if (!status) return;

        try {
            setLoading(true);
            const response = await axios.put('/api/complaints/admin', {
                complaintId,
                status
            }, {
                withCredentials: true
            });

            router.refresh();

            if (response.data.success) {
                toast.success("Status updated successfully")
                router.push("/admin/dashboard")
            }

        } catch (err) {
            console.error(err);
            toast.error("Error updating status")
        } finally {
            setLoading(false)
        }
    };

    if (!complaint) return <p className="p-8">Loading...</p>;

    return (
        <div className="container max-w-7xl mx-auto p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 py-4 border border-neutral-200 rounded-md">
                <h1 className="text-xl font-bold text-neutral-800">Analyse the raised complaint and take actions</h1>
                <Button asChild>
                    <Link href={'/admin/dashboard'}>Back to Dashboard</Link>
                </Button>
            </div>

            <div className="mt-10 flex flex-col lg:flex-row gap-8">
                <div className="flex-1 border border-neutral-200 rounded-md p-6 shadow-sm">
                    <h1 className="text-2xl font-bold mb-6 text-neutral-800">Complaint Details</h1>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                readOnly
                                value={complaint.title}
                                className="bg-neutral-100 cursor-not-allowed"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                readOnly
                                value={complaint.description}
                                className="bg-neutral-100 cursor-not-allowed resize-none"
                                rows={4}
                            />
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-neutral-700">Priority:</span>
                                <Badge variant="outline" className="capitalize -mb-1">{complaint.priority}</Badge>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-neutral-700">Status:</span>
                                <Badge variant='destructive' className="capitalize -mb-1">{complaint.status}</Badge>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-neutral-700">Date of submission</span>
                            <p className="text-neutral-900">
                                {new Date(complaint.createdAt).toLocaleString('en-IN')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 border border-neutral-200 rounded-md p-6 shadow-sm">
                    <Label htmlFor="status" className="text-xl font-semibold mb-4 block text-neutral-800">
                        You can change the status of complaint
                    </Label>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <Select
                            onValueChange={(value) => setStatus(value)}
                            value={status}>
                            <SelectTrigger className="w-52">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="In progress">In progress</SelectItem>
                                    <SelectItem value="Resolved">Resolved</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Button
                            variant="default"
                            className="w-full sm:w-auto cursor-pointer"
                            onClick={handleUpdateStatus}
                            disabled={loading}
                        >
                            {loading ? <span className='
                                        flex items-center justify-center gap-2'>
                                <Loader2 className='w-4 h-4 animate-spin ' />
                                Updating...
                            </span> : "Update status"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
