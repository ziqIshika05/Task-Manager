import React, { useState } from 'react';
import { fetchSmartSchedule } from '../services/api';

// Define your Task type according to your model
interface Task {
  title: string;
  estimatedHours: number;
  dueDate: string;
  dependencies: string[];
}

interface SmartScheduleProps {
  projectId: number;
  tasks: Task[];
}

const SmartSchedule: React.FC<SmartScheduleProps> = ({ projectId, tasks }) => {
  const [recommendedOrder, setRecommendedOrder] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSchedule = async () => {
    setLoading(true);
    setError('');
    setRecommendedOrder([]);
    try {
      const { recommendedOrder } = await fetchSmartSchedule(projectId, tasks);
      setRecommendedOrder(recommendedOrder);
    } catch {
      setError('Failed to get schedule recommendation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-xl mx-auto mt-6">
      <h3 className="text-lg font-semibold mb-2">Smart Task Scheduler</h3>
      <button
        onClick={handleSchedule}
        disabled={loading || tasks.length === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {loading ? 'Planning...' : 'Get Smart Schedule'}
      </button>
      {error && <div className="mt-3 text-red-600 font-medium">{error}</div>}
      {recommendedOrder.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Recommended Task Order</h4>
          <ol className="list-decimal list-inside bg-green-100 rounded p-3">
            {recommendedOrder.map((title, idx) => (
              <li key={idx} className="mb-2">{title}</li>
            ))}
          </ol>
        </div>
      )}
      {tasks.length === 0 && (
        <div className="mt-4 text-gray-500 text-sm">No tasks available for scheduling.</div>
      )}
    </div>
  );
};

export default SmartSchedule;
