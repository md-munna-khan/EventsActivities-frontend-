/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function DeleteButton({ resource, id }: { resource: 'users' | 'hosts' | 'events', id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${resource}/${id}`, { method: 'DELETE', credentials: 'include' });
      const payload = await res.json();
      if (res.ok && payload.success) {
        toast.success(payload.message || 'Deleted');
        window.location.reload();
      } else {
        toast.error(payload.message || 'Failed to delete');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="btn btn-sm btn-danger" onClick={handleDelete} disabled={loading}>{loading ? 'Deleting...' : 'Delete'}</button>
  );
}
