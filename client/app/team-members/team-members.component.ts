import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  constructor(private dash: DashboardService) { }

  team;

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.dash.getTeamMembersList().subscribe(data => {
      this.team = data;
    });
  }
}
