
import React from 'react';
import { Eye, MapPin } from 'lucide-react';
import { StatusBadge } from '../../ui/StatusBadge';
import type { Customer } from '../../../src/lib/googleSheets';

interface CustomersTableProps {
    customers: Customer[];
    onRowClick: (customer: Customer) => void;
}

export const CustomersTable: React.FC<CustomersTableProps> = ({ customers, onRowClick }) => {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-[#1A1A1A]/10 bg-white/40 backdrop-blur-md shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#1A1A1A]/5 text-xs uppercase tracking-wider text-[#1A1A1A]/60 font-medium">
                    <tr>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Customer</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Type</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Phone</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Email</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5">Status</th>
                        <th className="px-6 py-4 border-b border-[#1A1A1A]/5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]/5 text-sm">
                    {customers.map((customer) => (
                        <tr
                            key={customer.id}
                            onClick={() => onRowClick(customer)}
                            className="group hover:bg-[#1A1A1A]/5 transition-colors cursor-pointer"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 flex items-center justify-center text-sm font-medium text-[#1A1A1A]/60">
                                        {customer.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-[#1A1A1A] font-medium">{customer.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-xs bg-[#1A1A1A]/5 px-2.5 py-1 rounded-lg text-[#1A1A1A]/60 border border-[#1A1A1A]/5">
                                    {customer.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[#1A1A1A]/70 font-mono text-xs">
                                {customer.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[#1A1A1A]/60 text-xs">
                                {customer.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={customer.statusType}>
                                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                                </StatusBadge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-[#1A1A1A]/10 rounded-lg text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {customers.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-[#1A1A1A]/30">
                                No customers found matching your filters.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
