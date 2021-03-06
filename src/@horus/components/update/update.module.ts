import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update.component';
import { MatBadgeModule, MatButtonModule, MatDialogModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { UpdateService } from './update.service';
import { UpdateDialogComponent } from './update-dialog.component';
import { FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

@NgModule({
    entryComponents: [
        UpdateDialogComponent
    ],
    declarations: [
        UpdateComponent,
        UpdateDialogComponent
    ],
    imports: [
        CommonModule,
        MatBadgeModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatProgressBarModule
    ],
    exports: [
        UpdateComponent,
        UpdateDialogComponent
    ],
    providers: [
        UpdateService
    ]
})
export class UpdateModule
{
    constructor(
        private _translationLoader: FuseTranslationLoaderService
    ) {
        this._translationLoader.loadTranslations(english, spanish);
    }
}
