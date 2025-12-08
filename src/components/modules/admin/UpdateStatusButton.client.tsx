"use client";
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function UpdateStatusButton({ resource, id, currentStatus }: { resource: 'users' | 'hosts' | 'events', id: string, currentStatus?: string }) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    const newStatus = prompt(`Enter new status for ${resource} (current: ${currentStatus}):`);
    if (!newStatus) return;
    if (!confirm(`Set status to ${newStatus}?`)) return;
    setLoading(true);
    try {
        const res = await fetch(`/api/admin/${resource}/${id}/status`, { method: 'PATCH', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) });
        const payload = await res.json();
        if (res.ok && payload.success) {
          toast.success(payload.message || 'Status updated');
          window.location.reload();
        } else {
          toast.error(payload.message || 'Failed to update status');
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error';
        toast.error(message);
      } finally {
      setLoading(false);
    }
  };

  return (
    <button className="btn btn-sm" onClick={handleUpdate} disabled={loading}>{loading ? 'Updating...' : 'Update Status'}</button>
  );
}
