import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogCharacterCreateComponent } from './components/dialog-character-create/dialog-character-create.component';
import { Character } from './interfaces/character';
import { CharacterFormCreate } from './interfaces/character-form-create';
import { CharacterResults } from './interfaces/character-results';
import { CharactersService } from './services/characters.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  characters!: CharacterResults[];
  charactersFilter!: CharacterResults[];

  // INFO Simulación de POST para que muestre los valores actualizados en la lista.
  character: CharacterResults;

  constructor(
    public dialog: MatDialog,
    private characterService: CharactersService,
    private snackBar: MatSnackBar
  ) {
    this.getAllCharacters();

    // INFO Simulación de POST para que muestre los valores actualizados en la lista.
    this.character = {
      created: '',
      episode: [],
      gender: '',
      id: '',
      image: '',
      location: {
        name: '',
        url: '',
      },
      name: '',
      origin: {
        name: '',
        url: '',
      },
      species: '',
      status: '',
      type: '',
      url: '',
    };
  }

  getAllCharacters() {
    this.characterService
      .getAllCharacters()
      .subscribe((personajes: Character) => {
        this.characters = personajes.results;
        this.charactersFilter = this.characters;
      });
  }

  createCharacter() {
    const dialogEdit = this.dialog.open(DialogCharacterCreateComponent, {
      width: '40%',
      minHeight: '25%',
      data: {
        characters: this.characters,
      },
    });

    dialogEdit.componentInstance.characterCreated.subscribe(
      (characterCreate: CharacterFormCreate) => {
        // INFO Simulación de POST para que muestre los valores actualizados en la lista.
        this.character.image = characterCreate.image;
        this.character.name = characterCreate.name;
        this.character.origin.name = characterCreate.origin;
        this.character.location.name = characterCreate.location;
        this.character.status = characterCreate.status;
        this.character.species = characterCreate.species;
        this.character.gender = characterCreate.gender;

        this.characters.push(this.character);
        this.snackBar.open(
          'Se ha añadido el personaje de forma satisfactoria',
          'Cerrar',
          { panelClass: ['yellowgreen-snackbar'] }
        );
        // TODO La variable characterCreate es el nuevo objeto personaje que tenemos que hacer post
        // a la base de datos, yo lo he metido en el array para que se pueda ver en el crud.
      }
    );
  }

  filter(event: Event) {
    let search: string = (event.target as HTMLInputElement).value;
    this.characters = this.charactersFilter?.filter(
      ({ name }: CharacterResults) => {
        return name.toLowerCase().includes(search.toLowerCase());
      }
    );
  }
}
