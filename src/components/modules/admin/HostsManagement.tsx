/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { getAllHosts } from '@/services/admin/admin.service';
import UpdateStatusButton from './UpdateStatusButton.client';
import DeleteButton from './DeleteButton.client';

const HostsManagement = async () => {
  const res = await getAllHosts({}, { page: 1, limit: 50 });
  const hosts = res?.data || [];

  return (
    <div>
      <h2 className="text-2xl font-semibold">Hosts Management</h2>
      {hosts.length === 0 ? (
        <div className="text-muted-foreground">No hosts found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hosts.map((h: any) => (
                <tr key={h.id}>
                  <td>{h.name}</td>
                  <td>{h.email}</td>
                  <td>{h.status}</td>
                  <td className="flex gap-2">
                    <UpdateStatusButton resource="hosts" id={h.id} currentStatus={h.status} />
                    <DeleteButton resource="hosts" id={h.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HostsManagement;
