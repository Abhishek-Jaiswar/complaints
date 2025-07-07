
interface IComplaintTab {
    setActiveTab: (tab: string) => void;
    activeTab: string
}

const ComplaintTab: React.FC<IComplaintTab> = ({ setActiveTab, activeTab }) => {
    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="border border-neutral-200 rounded-t-md px-4 py-2">
                <h1 className="text-xl font-bold text-neutral-700">
                    You can fill the form to raise your complaints
                </h1>
            </div>

            <div className="border border-t-0 border-neutral-200 rounded-b-md flex max-w-2xl">
                <button
                    onClick={() => setActiveTab('complaints')}
                    className={`flex-1 text-center py-3 text-sm font-medium cursor-pointer transition-colors duration-200 ${activeTab === "complaints" ? "bg-rose-200 rounded-bl-md" : ""}`}>
                    Complaints
                </button>
                <div className="border-r border-neutral-200" />
                <button
                    onClick={() => setActiveTab('track')}
                    className={`flex-1 text-center py-3 text-sm font-medium cursor-pointer transition-colors duration-200 ${activeTab === "track" ? "bg-rose-200 rounded-br-md" : ""}`}>
                    Track Complaints
                </button>
            </div>
        </div>
    );
};

export default ComplaintTab;
