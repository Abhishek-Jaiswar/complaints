'use client'

import React, { useState, useMemo, useEffect } from 'react'
import OperationsOnTable from '@/components/OperationsOnTable'
import DataTable from '@/components/DataTable'
import axios from 'axios'

interface IComplaint {
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  _id: string;
}

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [complaints, setComplaints] = useState<IComplaint[]>([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const res = await axios.get('/api/complaints/admin');
      const data = await res.data.complaints;
      setComplaints(data);
    };
    fetchComplaints();
  }, []);

  const filteredComplaints = useMemo(() => {
    return complaints.filter(item => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = status ? item.status.toLowerCase() === status.toLowerCase() : true;
      const matchesPriority = priority ? item.priority.toLowerCase() === priority.toLowerCase() : true;

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [complaints, searchTerm, status, priority])

  return (
    <div className='container max-w-7xl mx-auto p-4'>
      <div className='px-4 py-4 border border-neutral-200 rounded-md'>
        <h1 className='text-xl font-bold text-neutral-600'>Manage complaints raised by users</h1>
      </div>
      <section className='mt-10'>
        <h1 className='text-xl font-semibold text-neutral-600'>Complaints ({filteredComplaints.length})</h1>
        <div className='py-1 mt-5'>
          <p className='text-rose-600 border-b-2 border-neutral-200'>General complaints</p>
        </div>
      </section>
      <section>
        <OperationsOnTable
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
        />
      </section>
      <section>
        <DataTable complaints={filteredComplaints} />
      </section>
    </div>
  )
}

export default Dashboard
