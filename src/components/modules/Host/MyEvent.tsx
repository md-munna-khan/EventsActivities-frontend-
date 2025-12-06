/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent, IEventFormData } from "@/services/host/hostService";
import { toast } from "sonner";
import Link from "next/link";

const MyEvents = () => {
  const [events, setEvents] = useState<(IEventFormData & { id: string; participantCount: number; image: string; status: string })[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await getEvents({ page: 1, limit: 20 });
      if (res.success) setEvents(res.data);
      else toast.error(res.message || "Failed to fetch events");
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    const res = await deleteEvent(id);
    if (res.success) {
      toast.success("Event deleted successfully");
      setEvents(events.filter((e) => e.id !== id));
    } else {
      toast.error(res.message || "Failed to delete event");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!events.length) return <p className="text-center mt-10">You have no events yet.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">My Hosted Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
            {event.image && <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />}
            <div className="p-4">
              <h2 className="text-lg font-bold">{event.title}</h2>
              <p className="text-sm text-gray-600">{event.category}</p>
              <p className="text-sm mt-2">{event.description?.substring(0, 100)}...</p>
              <p className="mt-2 text-sm">
                Date: <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
              </p>
              <p className="text-sm">Participants: {event.participantCount}</p>
              <p className="text-sm">Status: {event.status}</p>
              <div className="flex justify-between mt-4">
                <Link href={`/host/dashboard/events/edit/${event.id}`}>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
