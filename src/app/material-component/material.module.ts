import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
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
import {
  DialogComponent,
  DialogOverviewExampleDialogComponent
} from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { HomeComponent } from './home/home.component';
import { UserStatisticsComponent } from './user-statistics/user-statistics.component';
import { RankingListComponent } from './home/ranking-list/ranking-list.component';
import { LeagueComponent } from './league/league.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { CreateNewLeagueComponent } from './create-new-league/create-new-league.component';
import { AllLeaguesComponent } from './all-leagues/all-leagues.component';
import { ReportMessageViewComponent } from './admin-section/report-message-view/report-message-view.component';
import { ReviewMatchComponent } from './admin-section/review-match/review-match.component';
import { MatchesViewComponent } from './league/matches-view/matches-view.component';
import { ErrorComponent } from './error/error.component';
import { SpecialEventComponent } from './special-event/special-event.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UploadImgComponent } from './upload-img/upload-img.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [AuthGuard],
  entryComponents: [DialogOverviewExampleDialogComponent],
  declarations: [
    ButtonsComponent,
    CreateMatchComponent,
    ListsComponent,
    MenuComponent,
    TabsComponent,
    StepperComponent,
    ExpansionComponent,
    ChipsComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    ProgressComponent,
    DialogComponent,
    DialogOverviewExampleDialogComponent,
    TooltipComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    HomeComponent,
    UserStatisticsComponent,
    RankingListComponent,
    LeagueComponent,
    AdminSectionComponent,
    CreateNewLeagueComponent,
    AllLeaguesComponent,
    ReportMessageViewComponent,
    ReviewMatchComponent,
    MatchesViewComponent,
    ErrorComponent,
    SpecialEventComponent,
    LoginComponent,
    RegisterComponent,
    EditProfileComponent,
    UploadImgComponent
  ]
})
export class MaterialComponentsModule {}
