import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-page',
  templateUrl: './director-page.component.html',
  styleUrls: ['./director-page.component.scss']
})
export class DirectorPageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {Name: string, Bio: string, Birthdate: string, Deathdate: string},
    public dialogRef: MatDialogRef<DirectorPageComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
