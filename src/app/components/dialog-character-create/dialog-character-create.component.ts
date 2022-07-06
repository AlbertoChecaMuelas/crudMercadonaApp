import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CharacterResults } from 'src/app/interfaces/character-results';
import { DataDialog } from 'src/app/interfaces/data-dialog';
import { Combo } from 'src/app/interfaces/character-combo';
import {
  GenderObject,
  SpeciesObject,
  StatusObject,
} from 'src/app/shared/objects-character';

@Component({
  selector: 'app-dialog-character-create',
  templateUrl: './dialog-character-create.component.html',
  styleUrls: ['./dialog-character-create.component.scss'],
})
export class DialogCharacterCreateComponent implements OnInit {
  statusesCombo!: Combo[];
  gendersCombo!: Combo[];
  speciesCombo!: Combo[];

  formCharacter!: FormGroup;

  urlRegex =
    /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;

  @Output() characterCreated = new EventEmitter<CharacterResults>();

  constructor(
    public dialogRef: MatDialogRef<DialogCharacterCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formCharacter = new FormGroup({
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(this.urlRegex),
      ]),
      name: new FormControl('', Validators.required),
      origin: new FormControl('', null),
      location: new FormControl('', null),
      status: new FormControl('', Validators.required),
      species: new FormControl('', null),
      gender: new FormControl('', null),
    });

    this.statusesCombo = StatusObject;
    this.gendersCombo = GenderObject;
    this.speciesCombo = SpeciesObject;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveCharacter() {
    if (this.formCharacter.invalid) {
      this.formCharacter.markAllAsTouched();
      this.snackBar.open(
        'Revisa los campos requeridos antes de guardar',
        'Cerrar',
        { panelClass: ['red-snackbar'] }
      );
    } else {
      this.characterCreated.emit(this.formCharacter.value);
      this.dialogRef.close();
    }
  }
}
