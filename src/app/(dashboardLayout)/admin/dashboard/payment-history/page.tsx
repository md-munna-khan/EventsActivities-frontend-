import { getPayments } from "@/services/admin/payment.service";
import PaymentHistoryClient from "@/components/modules/admin/PaymentHistoryClient";

interface PageProps {
    search: {
        page?: string;
        status?: string;
    };
}

const PaymentHistoryPage = async ({ search }: PageProps) => {
    const page = Number(search?.page) || 1;
    const status = search?.status;

    const result = await getPayments({ page, limit: 12, status });
    const payments = result.data || [];
    const meta = result.meta || { page: 1, limit: 12, total: payments.length };

    return (
        <PaymentHistoryClient
            payments={payments}
            meta={meta}
            // statusFilter={status || "all"}
        />
    );
};

export default PaymentHistoryPage;