import { mockUser, mockRival, mockQuests } from '@/lib/data';
import { DashboardClient } from './components';

export default function DashboardPage() {
  const today = new Date();
  const pendingQuests = mockQuests.filter(q => {
    const questDate = new Date(q.createdForDate);
    return q.status === 'pending' &&
           questDate.getDate() === today.getDate() &&
           questDate.getMonth() === today.getMonth() &&
           questDate.getFullYear() === today.getFullYear();
  });

  return (
    <DashboardClient
      user={mockUser}
      rival={mockRival}
      initialQuests={pendingQuests}
    />
  );
}
