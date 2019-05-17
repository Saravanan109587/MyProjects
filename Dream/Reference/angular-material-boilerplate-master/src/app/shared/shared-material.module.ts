import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    declarations: [],
    imports: [],
    exports: [
        MatFormFieldModule,
        MatDividerModule,
        MatInputModule
    ]
})
export class SharedMaterialModule { }
