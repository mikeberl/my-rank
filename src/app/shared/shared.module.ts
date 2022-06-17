import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
/* import { LeagueItems } from '../models/league.model'; */
//import { RankedPlayers } from '../models/ranked-player.model';
// import { Users } from '../models/user.model';
import { MatchService } from '../services/match.service';
import { ReportService } from '../services/report.service';
import { PlayerService } from '../services/player.service';
import { UserService } from '../services/user.service';
import { GeneratorService } from '../services/generator.service';
import { HttpServiceService } from '../services/http-service.service';


@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
   ],
  providers: [ 
    MenuItems,
    UserService,
    MatchService,
    ReportService,
    PlayerService,
    UserService,
    GeneratorService, 
    HttpServiceService
 ]
})
export class SharedModule { }
