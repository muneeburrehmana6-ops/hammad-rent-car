// components/NotificationBell.jsx
// Polls the backend every 30s for new-car notifications and shows an unread
// badge. "Read" state is tracked locally per-browser via localStorage (the
// timestamp of the newest notification the user has opened the dropdown to see).
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const STORAGE_KEY = "lastSeenNotificationAt";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    try {
      const { data } = await api.get("/notifications");
      setNotifications(data);

      const lastSeen = localStorage.getItem(STORAGE_KEY);
      const lastSeenTime = lastSeen ? new Date(lastSeen).getTime() : 0;
      const unread = data.filter((n) => new Date(n.createdAt).getTime() > lastSeenTime).length;
      setUnreadCount(unread);
    } catch {
      // silently ignore (e.g. not logged in yet)
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const toggleOpen = () => {
    setOpen((o) => !o);
    if (!open && notifications.length > 0) {
      localStorage.setItem(STORAGE_KEY, notifications[0].createdAt);
      setUnreadCount(0);
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleOpen} className="relative p-2" aria-label="Notifications">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current">
          <path
            d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-amber text-asphalt text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white text-asphalt rounded-lg shadow-xl border border-asphalt/10 z-50 max-h-96 overflow-y-auto">
          <p className="px-4 py-2 text-sm font-semibold border-b border-asphalt/10">Notifications</p>
          {notifications.length === 0 ? (
            <p className="px-4 py-6 text-sm text-asphalt/50 text-center">No notifications yet.</p>
          ) : (
            notifications.map((n) => (
              <Link
                key={n._id}
                to={n.car ? `/cars/${n.car._id}` : "/cars"}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm hover:bg-asphalt/5 border-b border-asphalt/5 last:border-0"
              >
                {n.message}
                <span className="block text-xs text-asphalt/40 mt-0.5">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
