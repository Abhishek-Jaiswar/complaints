import React, { useState } from 'react'
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const RaiseComplaint = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    status: "pending"
  });

  console.log(formData);

  const [loading, setLoading] = useState(false)

  const navigate = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/complaints/user", formData, {
        withCredentials: true,
      });

      console.log("@@Response: ", response.data);

      if (response.status === 201) {
        navigate.push("/");
        toast.success("Your complaint has been registered")
      } else if (response.status === 200 && response.data.success) {
        navigate.push("/");
        toast.success("Your complaint has been registered")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='px-4 md:max-w-7xl mx-auto bg-white'>
      <form
        onSubmit={handleSubmit}
        className="px-0 md:max-w-2xl p-4 md:p-6 bg-white rounded-md md:rounded-none md:shadow-none space-y-6"
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
            <option value="product">Product</option>
            <option value="service">Service</option>
            <option value="support">Support</option>
            <option value="billing">Billing</option>
            <option value="technical">Technical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Priority</label>
          <div className="flex gap-4">
            {["low", "medium", "high"].map(level => (
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

        <div className='flex items-center gap-8'>
          <Button
            type="submit"
            disabled={loading}
            className="cursor-pointer hover:bg-rose-700 transition-colors duration-300"
          >
            {loading ? <span className='
            flex items-center justify-center gap-2'>
              <Loader2 className='w-4 h-4 animate-spin ' />
              Submitting...
            </span> : "Submit Complaint"}
          </Button>
          <Button variant={"secondary"}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default RaiseComplaint;
