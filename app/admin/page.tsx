'use client';

import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdminPanel from '@/components/dashboard/AdminPanel';

export default function AdminPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-green to-neon-purple bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-2">System administration and analytics</p>
        </div>

        <AdminPanel />
      </motion.div>
    </DashboardLayout>
  );
}
