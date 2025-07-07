'use client'

import React from 'react'
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface IComplaint {
    title: string;
    description: string;
    status: string;
    priority: string;
    createdAt: string;
    _id: string;
}

export default function DataTable({ complaints }: { complaints: IComplaint[] }) {
    return (
        <div className="border rounded-md overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {complaints.length > 0 ? (
                        complaints.map(item => (
                            <TableRow key={item._id} className="hover:bg-neutral-50">
                                <TableCell className="max-w-[200px] truncate" title={item.title}>
                                    {item.title}
                                </TableCell>
                                <TableCell className="max-w-[300px] truncate" title={item.description}>
                                    {item.description}
                                </TableCell>
                                <TableCell className="">
                                    <Badge className={getStatusClass(item.status)}>{item.status}</Badge>
                                </TableCell>
                                <TableCell className="">
                                    <Badge className={getPriorityClass(item.priority)}>{item.priority}</Badge>
                                </TableCell>
                                <TableCell className="">
                                    {new Date(item.createdAt).toLocaleDateString('en-IN', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5}>No complaints found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

function getStatusClass(status: string) {
    switch (status) {
        case 'in progress':
            return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold';
        case 'resolved':
            return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold';
        default:
            return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold';
    }
}

function getPriorityClass(priority: string) {
    switch (priority) {
        case 'low':
            return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold';
        case 'medium':
            return 'bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold';
        case 'high':
            return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold';
        default:
            return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold';
    }
}
