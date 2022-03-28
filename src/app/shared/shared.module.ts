import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { LeagueItems } from '../models/league.model';
import { RankedPlayers } from '../models/ranked-player.model';
import { Users } from '../models/user.model';


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
    LeagueItems,
    RankedPlayers,
    Users
 ]
})
export class SharedModule { }
