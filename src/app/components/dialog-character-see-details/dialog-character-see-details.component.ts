import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataDialog } from 'src/app/interfaces/data-dialog';

@Component({
  selector: 'app-dialog-character-see-details',
  templateUrl: './dialog-character-see-details.component.html',
  styleUrls: ['./dialog-character-see-details.component.scss'],
})
export class DialogCharacterSeeDetailsComponent implements OnInit {
  formCharacter!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogCharacterSeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog
  ) {}

  ngOnInit(): void {
    this.formCharacter = new FormGroup({
      name: new FormControl(this.data.character.name, Validators.required),
      origin: new FormControl(this.data.character.origin.name, null),
      location: new FormControl(this.data.character.location.name, null),
      status: new FormControl(this.data.character.status, Validators.required),
      species: new FormControl(this.data.character.species, null),
      gender: new FormControl(this.data.character.gender, null),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
