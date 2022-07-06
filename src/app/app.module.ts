import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { DialogCharacterEditComponent } from './components/dialog-character-edit/dialog-character-edit.component';
import { DialogCharacterSeeDetailsComponent } from './components/dialog-character-see-details/dialog-character-see-details.component';
import { CardComponent } from './components/card/card.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { DialogCharacterCreateComponent } from './components/dialog-character-create/dialog-character-create.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    DialogCharacterEditComponent,
    DialogCharacterSeeDetailsComponent,
    DialogCharacterCreateComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        verticalPosition: 'top',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
