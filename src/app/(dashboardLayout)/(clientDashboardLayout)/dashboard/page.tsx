import { getUserBookings } from '@/services/events/eventService';
import ClientDashboardClient from '@/components/modules/client/ClientDashboardClient';

const ClientDashboardPage = async () => {
    const bookingsResult = await getUserBookings();
    const bookings = bookingsResult?.data || [];

    return <ClientDashboardClient bookings={bookings} />;
};

export default ClientDashboardPage;