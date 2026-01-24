
import React from 'react';

export const Features: React.FC = () => {
  return (
    <section className="bg-gray-50 py-24 px-8 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">For developers</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Achieve new heights with agentic development platforms, evolving the IDE into the agent-first era.
            </p>
            <button className="px-6 py-3 font-semibold text-black border border-black rounded-full hover:bg-black hover:text-white transition-all">
              Download
            </button>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">For organizations</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Level up your entire team with collaborative agentic workflows and streamlined operations.
            </p>
            <button className="px-6 py-3 font-semibold text-gray-400 border border-gray-300 rounded-full cursor-not-allowed">
              Coming soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
