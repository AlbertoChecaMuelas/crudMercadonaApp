import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CharacterFormEdit } from 'src/app/interfaces/character-form-edit';
import { CharacterResults } from 'src/app/interfaces/character-results';
import { DialogCharacterEditComponent } from '../dialog-character-edit/dialog-character-edit.component';
import { DialogCharacterSeeDetailsComponent } from '../dialog-character-see-details/dialog-character-see-details.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() character!: CharacterResults;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  editCard(): void {
    const dialogEdit = this.dialog.open(DialogCharacterEditComponent, {
      width: '40%',
      minHeight: '25%',
      data: {
        character: this.character,
      },
    });

    dialogEdit.componentInstance.characterEdited.subscribe(
      (characterEdit: CharacterFormEdit) => {
        // INFO Simulación de POST para que muestre los valores actualizados en la lista.
        this.character.name = characterEdit.name;
        this.character.origin.name = characterEdit.origin;
        this.character.location.name = characterEdit.location;
        this.character.status = characterEdit.status;
        this.character.species = characterEdit.species;
        this.character.gender = characterEdit.gender;

        this.snackBar.open(
          'Se ha editado el personaje de forma satisfactoria',
          'Cerrar',
          { panelClass: ['yellowgreen-snackbar'] }
        );
        // TODO La variable characterEdit sería el objeto que habría que usar en la
        // llamada POST para guardar el personaje editado en la base de datos.
      }
    );
  }

  seeCard(): void {
    const dialogEdit = this.dialog.open(DialogCharacterSeeDetailsComponent, {
      width: '40%',
      minHeight: '25%',
      data: {
        character: this.character,
      },
    });
  }
}
