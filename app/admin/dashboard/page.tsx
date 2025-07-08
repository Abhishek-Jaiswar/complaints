'use client';

import React, { useEffect, useMemo, useState } from 'react';
import OperationsOnTable from '@/components/OperationsOnTable';
import DataTable from '@/components/DataTable';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface IComplaint {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [complaints, setComplaints] = useState<IComplaint[]>([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const res = await axios.get('/api/complaints/admin');
      setComplaints(res.data.complaints);
    };
    fetchComplaints();
  }, []);

  const filteredComplaints = useMemo(() => {
    return complaints.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = status ? item.status === status : true;
      const matchesPriority = priority ? item.priority === priority : true;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [complaints, searchTerm, status, priority]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/complaints/admin/${id}`);
      setComplaints(prev => prev.filter(item => item._id !== id));
      toast.success("Deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="container max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 py-4 border border-neutral-200 rounded-md">
        <h1 className="text-xl font-bold text-neutral-800">
          📋 Admin Dashboard — Manage Complaints
        </h1>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>

      <OperationsOnTable
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />
      <DataTable complaints={filteredComplaints} onDelete={handleDelete} />
      <div className='mt-5'>
        <p className="text-sm text-neutral-600 mt-1">
          Total complaints: <strong>{complaints.length}</strong> — Showing: <strong>{filteredComplaints.length}</strong>
        </p>
      </div>
    </div>
  );
}
