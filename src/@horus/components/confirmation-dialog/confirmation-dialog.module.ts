import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ConfirmationDialogComponent } from '@horus/components/confirmation-dialog/confirmation-dialog.component';
import { locale as english } from '@horus/components/confirmation-dialog/i18n/en';
import { locale as spanish } from '@horus/components/confirmation-dialog/i18n/es';

@NgModule({
    entryComponents: [
        ConfirmationDialogComponent
    ],
    declarations: [
        ConfirmationDialogComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule
    ],
    exports: [
        ConfirmationDialogComponent
    ]
})
export class ConfirmationDialogModule
{
    constructor(
        private _translationLoader: FuseTranslationLoaderService
    ) {
        this._translationLoader.loadTranslations(english, spanish);
    }
}
