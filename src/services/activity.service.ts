
import { Injectable, signal } from '@angular/core';
import { Activity } from '../models/activity.model';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private activities: Activity[] = [
    {
      id: 1,
      title: 'Morning Coffee & Code',
      category: 'Café',
      description: 'Join fellow developers for a morning of coding and coffee at the best café in town. A great way to network and get work done in a relaxed atmosphere.',
      imageUrl: 'https://picsum.photos/seed/coffee/800/600',
      date: '2024-08-15',
      time: '09:00 AM',
      location: 'The Daily Grind',
      participants: 8,
      maxParticipants: 15,
      reviews: [
        { id: 1, user: { id: 1, name: 'Alice', avatarUrl: 'https://picsum.photos/seed/user1/100' }, rating: 5, comment: 'Great atmosphere and coffee!', date: '2024-07-20' },
        { id: 2, user: { id: 2, name: 'Bob', avatarUrl: 'https://picsum.photos/seed/user2/100' }, rating: 4, comment: 'Productive morning.', date: '2024-07-21' }
      ]
    },
    {
      id: 2,
      title: 'Indie Rock Fest',
      category: 'Concert',
      description: 'An evening of live music featuring the best local indie bands. Get ready to rock out and discover new music.',
      imageUrl: 'https://picsum.photos/seed/concert/800/600',
      date: '2024-08-22',
      time: '07:30 PM',
      location: 'The Music Hall',
      participants: 150,
      maxParticipants: 200,
      reviews: [
        { id: 3, user: { id: 3, name: 'Charlie', avatarUrl: 'https://picsum.photos/seed/user3/100' }, rating: 5, comment: 'Amazing energy and great bands!', date: '2024-07-25' }
      ]
    },
    {
      id: 3,
      title: 'Mountain Hiking Trip',
      category: 'Trip',
      description: 'A guided day trip to the nearby mountains. Enjoy breathtaking views and a good workout. Suitable for intermediate hikers.',
      imageUrl: 'https://picsum.photos/seed/hike/800/600',
      date: '2024-09-01',
      time: '08:00 AM',
      location: 'Pine Ridge Trailhead',
      participants: 5,
      maxParticipants: 12,
      reviews: [
        { id: 4, user: { id: 4, name: 'Diana', avatarUrl: 'https://picsum.photos/seed/user4/100' }, rating: 5, comment: 'The views were incredible. Well organized.', date: '2024-07-28' },
        { id: 5, user: { id: 5, name: 'Eve', avatarUrl: 'https://picsum.photos/seed/user5/100' }, rating: 4, comment: 'Challenging but rewarding.', date: '2024-07-28' }
      ]
    },
     {
      id: 4,
      title: 'City Art Walk',
      category: 'Art',
      description: 'Explore the vibrant street art and galleries in the downtown art district. A guided tour with insights from local artists.',
      imageUrl: 'https://picsum.photos/seed/artwalk/800/600',
      date: '2024-08-18',
      time: '02:00 PM',
      location: 'Downtown Art District',
      participants: 12,
      maxParticipants: 25,
      reviews: []
    }
  ];

  private readonly _activities = signal<Activity[]>(this.activities);
  public readonly activities$ = this._activities.asReadonly();

  getActivityById(id: number): Activity | undefined {
    return this.activities.find(activity => activity.id === id);
  }
}
