import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Activity } from '../../models/activity.model';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class ActivityCardComponent {
  activity = input.required<Activity>();

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