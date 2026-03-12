
import React from 'react';
import { Search, Filter, Calendar, Download } from 'lucide-react';

export const LeadsFilter: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center py-4 border-b border-[#1A1A1A]/5">
            <div className="flex flex-wrap items-center gap-3">
                {/* Date Filter */}
                <button className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-lg text-sm text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/20 transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span>Last 30 Days</span>
                </button>

                {/* Status Filter */}
                <select className="px-3 py-2 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-lg text-sm text-[#1A1A1A]/70 hover:border-[#1A1A1A]/20 transition-colors outline-none focus:ring-1 focus:ring-[#1A1A1A]/20">
                    <option value="">All Statuses</option>
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="closed">Closed</option>
                </select>

                {/* Urgency Filter */}
                <select className="px-3 py-2 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-lg text-sm text-[#1A1A1A]/70 hover:border-[#1A1A1A]/20 transition-colors outline-none focus:ring-1 focus:ring-[#1A1A1A]/20">
                    <option value="">Urgency</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>

                <button className="text-xs text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors px-2">
                    Clear Filters
                </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/30" />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        className="pl-9 pr-4 py-2 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 rounded-lg text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 w-full md:w-64 transition-colors"
                    />
                </div>
                <button className="p-2 hover:bg-[#1A1A1A]/10 rounded-lg text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors border border-[#1A1A1A]/10" title="Export CSV">
                    <Download className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
