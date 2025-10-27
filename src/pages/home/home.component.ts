
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

  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }
}
