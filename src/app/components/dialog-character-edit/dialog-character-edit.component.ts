import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Combo } from 'src/app/interfaces/character-combo';
import { DataDialog } from 'src/app/interfaces/data-dialog';
import {
  GenderObject,
  SpeciesObject,
  StatusObject,
} from 'src/app/shared/objects-character';

@Component({
  selector: 'app-dialog-character-edit',
  templateUrl: './dialog-character-edit.component.html',
  styleUrls: ['./dialog-character-edit.component.scss'],
})
export class DialogCharacterEditComponent implements OnInit {
  statusesCombo!: Combo[];
  gendersCombo!: Combo[];
  speciesCombo!: Combo[];

  formCharacter!: FormGroup;

  @Output() characterEdited = new EventEmitter<DataDialog>();

  constructor(
    public dialogRef: MatDialogRef<DialogCharacterEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.formCharacter = new FormGroup({
      name: new FormControl(this.data.character.name, Validators.required),
      origin: new FormControl(this.data.character.origin.name, null),
      location: new FormControl(this.data.character.location.name, null),
      status: new FormControl(this.data.character.status, Validators.required),
      species: new FormControl(this.data.character.species, null),
      gender: new FormControl(this.data.character.gender, null),
    });

    this.statusesCombo = StatusObject;
    this.gendersCombo = GenderObject;
    this.speciesCombo = SpeciesObject;
  }

  saveCharacter() {
    this.formCharacter.markAllAsTouched();
    if (this.formCharacter.invalid) {
      this.snackBar.open(
        'Revisa los campos requeridos antes de guardar',
        'Cerrar',
        { panelClass: ['red-snackbar'] }
      );
    } else {
      this.characterEdited.emit(this.formCharacter.value);
      this.dialogRef.close();
    }
  }
}
