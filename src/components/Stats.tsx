import { useEffect, useState } from "react";

export const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ensure the component is mounted before showing stats
    setIsVisible(true);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <section id="stats" className="py-20 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sui-blue to-sui-purple bg-clip-text text-transparent mb-2">
              100K+
            </div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sui-purple to-sui-teal bg-clip-text text-transparent mb-2">
              1M+
            </div>
            <div className="text-gray-400">Transactions</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sui-teal to-sui-blue bg-clip-text text-transparent mb-2">
              $500M+
            </div>
            <div className="text-gray-400">Total Value Locked</div>
          </div>
        </div>
      </div>
    </section>
  );
};