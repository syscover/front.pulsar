import { Pipe, PipeTransform } from '@angular/core';
import { Translatable } from '@horus/types';
import { Lang } from '@horus/types';

@Pipe({
    name: 'actionTranslationObject'
})
export class ActionTranslationObjectPipe implements PipeTransform 
{
    transform(object: Translatable, lang: Lang): string 
    {
        const langs: string[] = object.data_lang; // get langs from object
        if (langs.indexOf(lang.id) === -1) return 'create';
        return 'edit';
    }
}
