"use client";

import ComplaintTab from "@/components/ComplaintTab";
import RaiseComplaint from "@/components/RaiseComplaint";
import TackComplaint from "@/components/TackComplaint";
import React, { useState } from "react";

const ComplaintForm = () => {
  const [activeTab, setActiveTab] = useState('complaints')

  return (
    <section className="container max-w-7xl mx-auto h-screen p-4 md:py-4">
      <ComplaintTab setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === 'complaints' && <RaiseComplaint />}
      {activeTab === 'track' && <TackComplaint />}

    </section>
  );
};

export default ComplaintForm;

