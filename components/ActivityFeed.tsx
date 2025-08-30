import React from 'react';
import { Activity } from '../types';

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span className="absolute top-4 right-4 -mr-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex gap-3">
                <div>
                  <img className="h-8 w-8 rounded-full" src={activity.avatar} alt="" />
                </div>
                <div className="min-w-0 flex-1 pt-1.5">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-hubspot-text">{activity.user}</span>{' '}
                    <span className="font-medium text-hubspot-blue">{activity.target}</span>{' '}
                    {activity.action}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;