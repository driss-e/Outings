import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { ActivityCardComponent } from '../../components/activity-card/activity-card.component';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';
import { Review } from '../../models/activity.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ActivityCardComponent, RouterLink, ReactiveFormsModule, ActivityDetailsComponent]
})
export class DashboardComponent {
  private activityService = inject(ActivityService);

  activeTab = signal<'activities' | 'profile' | 'reviews'>('activities');
  animationDirection = signal<'left' | 'right'>('right');

  // For demonstration, we'll just show the first two activities as "my activities"
  myActivities = computed(() => this.activityService.activities$().slice(0, 2));

  // Placeholder for reviews
  myReviews = computed(() => {
    return this.activityService.activities$()
      .flatMap(a => a.reviews.map(r => ({ ...r, activityTitle: a.title })))
      .slice(0, 3);
  });
  
  profileForm = new FormGroup({
    name: new FormControl('Demo User'),
    email: new FormControl('demo@example.com'),
  });

  setTab(tab: 'activities' | 'profile' | 'reviews') {
    const tabOrder = ['activities', 'profile', 'reviews'];
    const currentTabIndex = tabOrder.indexOf(this.activeTab());
    const newTabIndex = tabOrder.indexOf(tab);

    if (newTabIndex > currentTabIndex) {
      this.animationDirection.set('right');
    } else if (newTabIndex < currentTabIndex) {
      this.animationDirection.set('left');
    }

    this.activeTab.set(tab);
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }
}
