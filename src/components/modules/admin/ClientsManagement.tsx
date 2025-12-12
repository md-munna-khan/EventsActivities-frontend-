// /* components/modules/admin/ClientsManagement.tsx */
// import React from "react";

// import UpdateStatusButton from "./UpdateStatusButton";

// import { getAllUsers } from "@/services/user/userService";

// type User = {
//   id: string;
//   email?: string | null;
//   role?: string | null;
//   status?: string | null;
//   createdAt?: string;
//   updatedAt?: string;
// };

// const ClientsManagement = async () => {
//   const res = await getAllUsers({ role: "CLIENT" }, { page: 1, limit: 50 });
//   const users: User[] = Array.isArray(res?.data) ? res.data : [];

//   if (!res || res.success === false) {
//     return (
//       <div>
//         <h2 className="text-2xl font-semibold">Clients Management</h2>
//         <div className="mt-4 text-red-600">Failed to load clients: {res?.message ?? "Unknown error"}</div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold">Clients Management</h2>

//       {users.length === 0 ? (
//         <div className="mt-4 text-muted-foreground">No clients found</div>
//       ) : (
//         <div className="mt-4 overflow-x-auto rounded-md border">
//           <table className="table w-full">
//             <thead>
//               <tr>
//                 <th className="pl-4">Email</th>
//                 <th>Role</th>
//                 <th>Status</th>
//                 <th className="text-right pr-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((u) => (
//                 <tr key={u.id}>
//                   <td className="pl-4">{u.email ?? "-"}</td>
//                   <td>{u.role ?? "-"}</td>
//                   <td>{u.status ?? "-"}</td>
//                   <td className="flex justify-end gap-2 pr-4">
//                     <UpdateStatusButton resource="users" id={u.id} currentStatus={u.status ?? "ACTIVE"} />
                    
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClientsManagement;





import React from "react";

import { getAllUsers } from "@/services/user/userService";
import UpdateStatusButton from "./UpdateStatusButton";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

type User = {
  id: string;
  email?: string | null;
  role?: string | null;
  status?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

const ClientsManagement = async () => {
  const res = await getAllUsers({ role: "CLIENT" }, { page: 1, limit: 50 });
  const users: User[] = Array.isArray(res?.data) ? res.data : [];

  if (!res || res.success === false) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Clients Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">Failed to load clients: {res?.message ?? "Unknown error"}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Clients Management</h2>
        <div className="flex items-center gap-3">
          <Input placeholder="Search by email or name" className="max-w-sm" />
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="w-full overflow-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-sm text-muted-foreground">
                  <th className="text-left pl-6 py-3">Client</th>
                  <th className="text-left py-3">Role</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-right pr-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t last:border-b">
                    <td className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          {u.email ? (
                            <AvatarFallback>{u.email.charAt(0).toUpperCase()}</AvatarFallback>
                          ) : (
                            <AvatarFallback>C</AvatarFallback>
                          )}
                        </Avatar>
                        <div className="min-w-0">
                          <div className="font-semibold truncate">{u.email ?? "-"}</div>
                          <div className="text-xs text-muted-foreground truncate">Joined: {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="text-sm">{u.role ?? "-"}</div>
                    </td>

                    <td className="py-4">
                      <Badge variant={u.status === 'ACTIVE' ? 'secondary' : 'outline'}>
                        {u.status ?? "-"}
                      </Badge>
                    </td>

                    <td className="pr-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <UpdateStatusButton resource="users" id={u.id} currentStatus={u.status ?? "ACTIVE"} />

                    
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsManagement;

