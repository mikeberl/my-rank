import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { CreateMatchComponent } from './create-match/create-match.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { HomeComponent } from './home/home.component';
import { LeagueComponent } from './league/league.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { CreateNewLeagueComponent } from './create-new-league/create-new-league.component';
import { AllLeaguesComponent } from './all-leagues/all-leagues.component';
import { ReportMessageViewComponent } from './admin-section/report-message-view/report-message-view.component';
import { ReviewMatchComponent } from './admin-section/review-match/review-match.component';

export const MaterialRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'league/:id',
    component: LeagueComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin-section',
    component: AdminSectionComponent
  },
  {
    path: 'new-league',
    component: CreateNewLeagueComponent
  },
  {
    path: 'all-leagues',
    component: AllLeaguesComponent
  },
  {
    path: 'reports/:id',
    component: ReportMessageViewComponent
  },
  {
    path: ':league/report/:report',
    component : ReviewMatchComponent
  },
  {
    path: 'button',
    component: ButtonsComponent
  },
  {
    path: 'create-match/:id',
    component: CreateMatchComponent
  },
  {
    path: 'lists',
    component: ListsComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'stepper',
    component: StepperComponent
  },
  {
    path: 'expansion',
    component: ExpansionComponent
  },
  {
    path: 'chips',
    component: ChipsComponent
  },
  {
    path: 'toolbar',
    component: ToolbarComponent
  },
  {
    path: 'progress-snipper',
    component: ProgressSnipperComponent
  },
  {
    path: 'progress',
    component: ProgressComponent
  },
  {
    path: 'dialog',
    component: DialogComponent
  },
  {
    path: 'tooltip',
    component: TooltipComponent
  },
  {
    path: 'snackbar',
    component: SnackbarComponent
  },
  {
    path: 'slider',
    component: SliderComponent
  },
  {
    path: 'slide-toggle',
    component: SlideToggleComponent
  }
];
