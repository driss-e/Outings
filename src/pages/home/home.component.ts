import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../../services/activity.service';
import { ActivityCardComponent } from '../../components/activity-card/activity-card.component';
import { FormsModule } from '@angular/forms';
import { Activity } from '../../models/activity.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ActivityCardComponent, FormsModule]
})
export class HomeComponent {
  private activityService = inject(ActivityService);
  
  activities = this.activityService.activities$;
  
  searchTerm = signal('');
  selectedCategory = signal('All');
  selectedDate = signal('');

  categories = computed(() => {
    const allCategories = this.activities().map(a => a.category);
    return ['All', ...new Set(allCategories)];
  });

  filteredActivities = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();
    const date = this.selectedDate();
    
    return this.activities().filter(activity => {
      const matchesSearchTerm = activity.title.toLowerCase().includes(term) || activity.location.toLowerCase().includes(term);
      const matchesCategory = category === 'All' || activity.category === category;
      const matchesDate = !date || activity.date === date;
      
      return matchesSearchTerm && matchesCategory && matchesDate;
    });
  });

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }

  getCategoryStyles(category: string): string {
    if (category === 'All') {
      return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300';
    }
    switch (category) {
        case 'Café': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
        case 'Concert': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
        case 'Trip': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
        case 'Art': return 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  }
}