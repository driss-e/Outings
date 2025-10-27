import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ActivityDetailsComponent {
  private route = inject(ActivatedRoute);
  private activityService = inject(ActivityService);

  private routeParams = toSignal(this.route.paramMap);

  activity = computed(() => {
    const id = this.routeParams()?.get('id');
    if (id) {
      return this.activityService.getActivityById(+id);
    }
    return undefined;
  });

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  getCategoryStyles(category: string): string {
    switch (category) {
        case 'Café': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
        case 'Concert': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
        case 'Trip': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
        case 'Art': return 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300';
        default: return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300';
    }
  }
}