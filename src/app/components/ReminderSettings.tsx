'use client';

import { useState, useEffect } from 'react';
import { NotificationManager } from '../utils/NotificationManager';

export default function ReminderSettings() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [interval, setInterval] = useState<number | null>(null);

  useEffect(() => {
    // Check if notifications are supported
    const notificationSupported = 'Notification' in window;
    setIsSupported(notificationSupported);

    if (notificationSupported) {
      setPermission(Notification.permission);
      
      // Get saved interval
      const savedInterval = localStorage.getItem('breakReminderInterval');
      if (savedInterval) {
        setInterval(parseInt(savedInterval, 10));
      }
    }
  }, []);

  const handleIntervalChange = async (minutes: number | null) => {
    const notificationManager = NotificationManager.getInstance();

    if (minutes === null) {
      notificationManager.clearReminders();
      setInterval(null);
      return;
    }

    const success = await notificationManager.setupReminders(minutes);
    if (success) {
      setInterval(minutes);
      setPermission(Notification.permission);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white/10 backdrop-blur-lg rounded-lg p-4 space-y-4">
      <h3 className="text-sm font-semibold text-white/90">Break Reminders</h3>
      
      {permission === 'denied' ? (
        <p className="text-xs text-white/70">
          Notifications are blocked. Please enable them in your browser settings.
        </p>
      ) : (
        <div className="space-y-2">
          <select
            value={interval || ''}
            onChange={(e) => handleIntervalChange(e.target.value ? parseInt(e.target.value, 10) : null)}
            className="w-full bg-white/20 text-white rounded px-2 py-1 text-sm"
          >
            <option value="">Disabled</option>
            <option value="30">Every 30 minutes</option>
            <option value="60">Every hour</option>
            <option value="90">Every 1.5 hours</option>
            <option value="120">Every 2 hours</option>
          </select>
          
          <p className="text-xs text-white/70">
            {interval
              ? `You'll be reminded to take a break every ${interval} minutes`
              : 'Select an interval to enable break reminders'}
          </p>
        </div>
      )}
    </div>
  );
}