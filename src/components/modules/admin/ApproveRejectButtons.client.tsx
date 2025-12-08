// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useState } from 'react';
// import { toast } from 'sonner';

// interface Props {
//   applicationId: string;
// }

// const base = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000/api/v1';

// export default function ApproveRejectButtons({ applicationId }: Props) {
//   const [loading, setLoading] = useState(false);

//   const approve = async () => {
//     if (!confirm('Approve this application?')) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`${base}/admin/${applicationId}/approve`, { method: 'PATCH', credentials: 'include' });
//       const result = await res.json();
//       if (result.success) {
//         toast.success('Application approved');
//         // reload
//         window.location.reload();
//       } else {
//         toast.error(result.message || 'Failed to approve');
//       }
//     } catch (err: any) {
//       toast.error(err?.message || 'Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const reject = async () => {
//     if (!confirm('Reject this application?')) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`${base}/admin/${applicationId}/reject`, { method: 'PATCH', credentials: 'include' });
//       const result = await res.json();
//       if (result.success) {
//         toast.success('Application rejected');
//         window.location.reload();
//       } else {
//         toast.error(result.message || 'Failed to reject');
//       }
//     } catch (err: any) {
//       toast.error(err?.message || 'Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex gap-2">
//       <button className="btn btn-approve" onClick={approve} disabled={loading}>Approve</button>
//       <button className="btn btn-reject" onClick={reject} disabled={loading}>Reject</button>
//     </div>
//   );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, X, Loader2 } from "lucide-react";

import { approveHostApplication, rejectHostApplication } from "@/services/admin/admin.service";

interface Props {
  applicationId: string;
}

export default function ApproveRejectButtons({ applicationId }: Props) {
  const [loadingAction, setLoadingAction] = useState<null | "approve" | "reject">(null);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  const runAction = async (action: "approve" | "reject") => {
    setLoadingAction(action);
    try {
      const result =
        action === "approve"
          ? await approveHostApplication(applicationId)
          : await rejectHostApplication(applicationId);

      if (result?.success) {
        toast.success(result.message || `Application ${action}d successfully`);
        // refresh page to re-fetch server data
        window.location.reload(); // or use router.refresh() if Next.js app router
        setOpenApprove(false);
        setOpenReject(false);
      } else {
        toast.error(result?.message || `Failed to ${action}`);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || `Error while trying to ${action}`);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Approve dialog */}
      <Dialog open={openApprove} onOpenChange={setOpenApprove}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Approve
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this host application?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpenApprove(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => runAction("approve")}
              disabled={loadingAction !== null}
            >
              {loadingAction === "approve" ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4" /> Processing
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> Confirm Approve
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject dialog */}
      <Dialog open={openReject} onOpenChange={setOpenReject}>
        <DialogTrigger asChild>
          <Button size="sm" variant="destructive" className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Reject
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this host application?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpenReject(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => runAction("reject")}
              disabled={loadingAction !== null}
            >
              {loadingAction === "reject" ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4" /> Processing
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <X className="h-4 w-4" /> Confirm Reject
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
