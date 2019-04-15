import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { AttachmentsModule } from './attachments/attachments.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { FilterHeaderCellModule } from './filter-header-cell/filter-header-cell.module';
import { FlagIconModule } from './flag-icon/flag-icon.module';
import { FroalaModule } from './froala/froala.module';
import { ImageInputModule } from './image-input/image-input.module';
import { ListItemsModule } from './list-items/list-items.module';
import { LocationMapModule } from './location-map/location-map.module';
import { MarketableModule } from './marketable/marketable.module';
import { StockableModule } from './stockable/stockable.module';
import { TerritoriesModule } from './territories/territories.module';
import { UpdateModule } from './update/update.module';
import { ConfirmationDialogModule } from './confirmation-dialog/confirmation-dialog.module';

@NgModule({
    imports: [
        AttachmentsModule,
        ConfirmationDialogModule,
        CommonModule,
        DatepickerModule,
        FilterHeaderCellModule,
        FlagIconModule,
        FroalaModule,
        ImageInputModule,
        ListItemsModule,
        LocationMapModule,
        MarketableModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        StockableModule,
        TerritoriesModule,
        UpdateModule
    ],
    exports: [
        AttachmentsModule,
        ConfirmationDialogModule,
        DatepickerModule,
        FilterHeaderCellModule,
        FlagIconModule,
        FroalaModule,
        ImageInputModule,
        ListItemsModule,
        LocationMapModule,
        MarketableModule,
        StockableModule,
        TerritoriesModule,
        UpdateModule
    ]
})
export class ComponentsModule
{
}