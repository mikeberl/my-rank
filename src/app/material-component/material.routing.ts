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
import { SpecialEventComponent } from './special-event/special-event.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UploadImgComponent } from './upload-img/upload-img.component';

export const MaterialRoutes: Routes = [
  {
    path: 'upload-img',
    component: UploadImgComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: ':id/edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'league/:id',
    component: LeagueComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-section',
    component: AdminSectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-league',
    component: CreateNewLeagueComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'all-leagues',
    component: AllLeaguesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/reports',
    component: ReportMessageViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':league/special-event',
    component: SpecialEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':league/report/:report',
    component : ReviewMatchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'button',
    component: ButtonsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-match/:id',
    component: CreateMatchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lists',
    component: ListsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tabs',
    component: TabsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stepper',
    component: StepperComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'expansion',
    component: ExpansionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chips',
    component: ChipsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'toolbar',
    component: ToolbarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'progress-snipper',
    component: ProgressSnipperComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'progress',
    component: ProgressComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dialog',
    component: DialogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tooltip',
    component: TooltipComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'snackbar',
    component: SnackbarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'slider',
    component: SliderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'slide-toggle',
    component: SlideToggleComponent,
    canActivate: [AuthGuard]
  }
];
