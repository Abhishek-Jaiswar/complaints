"use client";

import ComplaintTab from "@/components/ComplaintTab";
import RaiseComplaint from "@/components/RaiseComplaint";
import TackComplaint from "@/components/TackComplaint";
import React, { useState } from "react";

const ComplaintForm = () => {
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   category: "",
  //   priority: "Low",
  // });

  const [activeTab, setActiveTab] = useState('complaints')

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // ✅ Call your API here
  //   console.log("Submitted complaint:", formData);
  // };

  return (
    <section className="container max-w-7xl mx-auto h-screen p-14">
      <ComplaintTab setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === 'complaints' && <RaiseComplaint />}
      {activeTab === 'track' && <TackComplaint />}

    </section>
  );
};

export default ComplaintForm;

{/* <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-rose-600">Raise a Complaint</h2>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Complaint Title
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            placeholder="Enter complaint title"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your issue"
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          >
            <option value="">Select category</option>
            <option value="Product">Product</option>
            <option value="Service">Service</option>
            <option value="Support">Support</option>
            <option value="Billing">Billing</option>
            <option value="Technical">Technical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Priority</label>
          <div className="flex gap-4">
            {["Low", "Medium", "High"].map(level => (
              <label key={level} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  checked={formData.priority === level}
                  onChange={handleChange}
                  className="accent-rose-600"
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit Complaint
        </Button>
      </form> */}
