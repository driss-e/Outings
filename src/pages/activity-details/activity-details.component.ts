
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
}
