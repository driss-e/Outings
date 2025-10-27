
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Activity, Review, User } from '../../models/activity.model';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule]
})
export class DashboardComponent {
  private activityService = inject(ActivityService);

  // Mock data for the dashboard
  currentUser = signal<User>({
    id: 1,
    name: 'Alice',
    avatarUrl: 'https://picsum.photos/seed/user1/200'
  });
  
  registeredActivities = signal<Activity[]>([
    this.activityService.getActivityById(1)!,
    this.activityService.getActivityById(3)!
  ]);

  myReviews = signal<Review[]>([
     this.activityService.getActivityById(1)!.reviews.find(r => r.user.id === 1)!
  ]);

  activeTab = signal<'activities' | 'profile' | 'reviews'>('activities');
  
  profileForm = new FormGroup({
    name: new FormControl(this.currentUser().name),
    email: new FormControl('alice@example.com') // mock email
  });

  setTab(tab: 'activities' | 'profile' | 'reviews') {
    this.activeTab.set(tab);
  }

  onProfileUpdate() {
    console.log('Profile updated:', this.profileForm.value);
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }
}
