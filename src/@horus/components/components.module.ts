import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { AttachmentsModule } from '@horus/components/attachments/attachments.module';
import { ConfirmationDialogModule } from '@horus/components/confirmation-dialog/confirmation-dialog.module';
import { DatepickerModule } from '@horus/components/datepicker/datepicker.module';
import { FilterHeaderCellModule } from '@horus/components/filter-header-cell/filter-header-cell.module';
import { FlagIconModule } from '@horus/components/flag-icon/flag-icon.module';

import { ImageInputModule } from '@horus/components/image-input/image-input.module';
import { ListItemsModule } from '@horus/components/list-items/list-items.module';
import { LocationMapModule } from '@horus/components/location-map/location-map.module';
import { MarketableModule } from '@horus/components/marketable/marketable.module';
import { StockableModule } from '@horus/components/stockable/stockable.module';
import { SlugModule } from '@horus/components/slug/slug.module';
import { TerritoriesModule } from '@horus/components/territories/territories.module';
import { UpdateModule } from '@horus/components/update/update.module';
import { WysiwygCKEditorModule } from './ckeditor/ckeditor.module';

@NgModule({
    imports: [
        AttachmentsModule,
        ConfirmationDialogModule,
        CommonModule,
        DatepickerModule,
        FilterHeaderCellModule,
        FlagIconModule,
        ImageInputModule,
        ListItemsModule,
        LocationMapModule,
        MarketableModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        SlugModule,
        StockableModule,
        TerritoriesModule,
        UpdateModule,
        WysiwygCKEditorModule
    ],
    exports: [
        AttachmentsModule,
        ConfirmationDialogModule,
        DatepickerModule,
        FilterHeaderCellModule,
        FlagIconModule,
        ImageInputModule,
        ListItemsModule,
        LocationMapModule,
        MarketableModule,
        StockableModule,
        SlugModule,
        TerritoriesModule,
        UpdateModule,
        WysiwygCKEditorModule
    ]
})
export class ComponentsModule
{}
