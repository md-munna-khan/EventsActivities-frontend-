/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { getAllUsers } from '@/services/admin/admin.service';
import UpdateStatusButton from './UpdateStatusButton.client';
import DeleteButton from './DeleteButton.client';


const ClientsManagement = async () => {
  const res = await getAllUsers({ role: 'CLIENT' }, { page: 1, limit: 50 });
  const users = res?.data || [];

  return (
    <div>
      <h2 className="text-2xl font-semibold">Clients Management</h2>
      {users.length === 0 ? (
        <div className="text-muted-foreground">No clients found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any) => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.status}</td>
                  <td className="flex gap-2">
                    <UpdateStatusButton resource="users" id={u.id} currentStatus={u.status} />
                    <DeleteButton resource="users" id={u.id} />
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

export default ClientsManagement;
