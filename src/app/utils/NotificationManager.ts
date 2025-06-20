export class NotificationManager {
  private static instance: NotificationManager;
  private reminderInterval: number | null = null;

  private constructor() {}

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  async setupReminders(intervalMinutes: number): Promise<boolean> {
    const hasPermission = await this.requestPermission();
    if (!hasPermission) return false;

    // Clear any existing interval
    this.clearReminders();

    // Set up new interval
    this.reminderInterval = window.setInterval(() => {
      this.showNotification();
    }, intervalMinutes * 60 * 1000);

    // Store the reminder preference
    localStorage.setItem('breakReminderInterval', intervalMinutes.toString());

    return true;
  }

  clearReminders() {
    if (this.reminderInterval) {
      clearInterval(this.reminderInterval);
      this.reminderInterval = null;
      localStorage.removeItem('breakReminderInterval');
    }
  }

  private showNotification() {
    if (Notification.permission === 'granted') {
      const notification = new Notification('Time for a Break!', {
        body: 'Take a moment to rest your eyes and mind.',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'break-reminder',
        requireInteraction: true
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  }

  // Initialize reminders from saved preferences
  async initFromStorage() {
    const savedInterval = localStorage.getItem('breakReminderInterval');
    if (savedInterval) {
      await this.setupReminders(parseInt(savedInterval, 10));
    }
  }
}