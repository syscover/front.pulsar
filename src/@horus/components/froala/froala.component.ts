import { Component, Renderer2, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '@horus/services/config.service';
import { AttachmentFamily } from 'app/main/apps/admin/admin.models';
import * as _ from 'lodash';
declare const $: any;
const noop = () => {};

@Component({
    selector: 'hr-froala',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FroalaComponent),
            multi: true
        }
    ],
    template: `
        <div    [froalaEditor]="froalaOptions" 
                [(froalaModel)]="value"></div>
    `,
    styles: [`
        :host{
            margin-bottom: 20px;
        }
        .ui-messages-error {
            position: absolute;
        }
        input.ng-dirty.ng-invalid {
            border-bottom-color: #e62a10;
        }`]
})
export class FroalaComponent implements OnInit 
{
    @Input() placeholder: string;
    @Input() heightMin: number;
    @Input() heightMax: number;
    @Input()
    get value(): string
    {
        return this._value;
    }
    set value(value: string)
    {
        console.log('DEBUG - hr-froala set value: ' + value);

        this._value = value;
        this.propagateChange(this._value);
    }
    private _value: string;

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = (_: any) => { };

    
    @Input() attachmentFamilies: AttachmentFamily[] = [];
    @Input() imageUploadURL: string;
    froalaOptions: any = {};
    
    constructor(
        private configService: ConfigService,
        private renderer: Renderer2,
        private translateService: TranslateService
    ) { }

    // accessor to get imageStyles with classes build from attachment families
    get imageStyles()
    {
        const imageStyles = {};
        for (const attachmentFamily of this.attachmentFamilies)
        {
            imageStyles['dh2-attachment-family-' + attachmentFamily.id] = attachmentFamily.name; // Images styles for Froala
        }
        return imageStyles;
    }

    writeValue(value: string): void
    {
        this.value = value;
    }
    registerOnChange(fn): void
    {
        this.propagateChange = fn;
    }
    registerOnTouched(fn): void
    { 
        this.propagateTouch = fn;
    }

    ngOnInit(): void
    {
        if (! this.imageUploadURL) this.imageUploadURL = this.configService.get('restUrl') + '/api/v1/admin/wysiwyg/upload';

        // set froala option properties
        this.froalaOptions.key                      = this.configService.get('froalaKey');
        this.froalaOptions.placeholderText          = this.placeholder;
        this.froalaOptions.heightMin                = this.heightMin;
        this.froalaOptions.heightMax                = this.heightMax;
        this.froalaOptions.tabSpaces                = 4;
        
        this.froalaOptions.fontSizeSelection        = true;
        this.froalaOptions.fontSize                 = ['8', '9', '10', '11', '12', '14', '18', '24', '30', '36', '48', '60', '72', '96'];

        this.froalaOptions.toolbarButtons = {
            'moreText': {
              'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
            },
            'moreParagraph': {
              'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
            },
            'moreRich': {
              'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
            },
            'moreMisc': {
              'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
              'align': 'right',
              'buttonsVisible': 2
            }
          };


        
        /* this.froalaOptions.fontFamilySelection      = true;
        this.froalaOptions.fontFamily               = {
            "Roboto,sans-serif": 'Roboto',
            "Oswald,sans-serif": 'Oswald',
            "Montserrat,sans-serif": 'Montserrat',
            "'Open Sans Condensed',sans-serif": 'Open Sans Condensed'
          }; */

        // this.froalaOptions.enter            = $.FroalaEditor.ENTER_DIV;

        // TODO, Detect change language, now is not possible
        // https://github.com/froala/angular-froala-wysiwyg/issues/66
        // this.froalaOptions.language = this.translateService.currentLang;
        
        this.froalaOptions.toolbarButtons = {
            'moreText': {
              'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
            },
            'moreParagraph': {
              'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
            },
            'moreRich': {
              'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
            },
            'moreMisc': {
              'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
              'align': 'right',
              'buttonsVisible': 2
            }
          };
        this.froalaOptions.pluginsEnabled = [
            'align',
            'charCounter',
            'codeBeautifier',
            'codeView',
            'colors',
            'draggable',
            'embedly',
            'emoticons',
            'entities',
            // 'file',
            'fontAwesome',
            'fontFamily',
            'fontSize',
            'fullscreen',
            'image',
            'imageTUI',
            // 'imageManager',
            'inlineStyle',
            'inlineClass',
            'lineBreaker',
            'lineHeight',
            'link',
            'lists',
            'paragraphFormat',
            'paragraphStyle',
            // 'quickInsert',
            'quote',
            'save',
            'table',
            'url',
            'video',
            'wordPaste'
        ];

        /* this.froalaOptions.events = {
            'froalaEditor.blur' : (e, editor, response) => {
                this.onTouchedCallback();
            },
            'froalaEditor.contentChanged' : (e, editor, response) => {
                this.onChangeCallback(editor.html.get());
            },
            'froalaEditor.image.uploaded' : (e, editor, response) => {
                //
            },
            'froalaEditor.image.beforeUpload' : (e, editor, images) => {
                //
            },
            'froalaEditor.image.inserted' : (e, editor, $img, response) => {
                for (const image of $img) 
                {
                    this.renderer.addClass(image, 'dh2-uploaded');
                    const objResponse = JSON.parse(response);
                    this.renderer.setAttribute(image, 'data-dh2-image', JSON.stringify(objResponse.image));
                }
            },
            'froalaEditor.commands.after': (e, editor, cmd, param1, param2) => {
                // after change style
                if (cmd === 'imageStyle') 
                {
                    if (param1.indexOf('dh2-attachment-family') !== -1) 
                    {
                        for (const image of editor.image.get()) 
                        {
                            if (image.classList.contains(param1)) 
                            {
                                // get attachment family know with preview
                                const attachmentFamily = _.find(this.attachmentFamilies, {id: +param1.split('-')[3]});
                                this.renderer.setStyle(image, 'width', `${attachmentFamily.width}px`);
                            } 
                            else 
                            {
                                // check that image has any class from attachment families
                                let hasClass = false;
                                image.classList.forEach((value, index) => {
                                    if (value.indexOf('dh2-attachment-family') !== -1)
                                    {
                                        const attachmentFamily = _.find(this.attachmentFamilies, {id: +value.split('-')[3]});
                                        this.renderer.setStyle(image, 'width', `${attachmentFamily.width}px`);
                                        hasClass = true;
                                    }
                                });

                                if (! hasClass) this.renderer.setStyle(image, 'width', `100%`);
                            }
                        }
                    }
                }
            }
        }; */

        /* if (this.imageUploadURL) 
        {
            this.froalaOptions.imageUploadMethod = 'post';
            this.froalaOptions.requestWithCORS = true;
            this.froalaOptions.imageUploadURL = this.imageUploadURL;
            this.froalaOptions.imageResizeWithPercent = true;
            this.froalaOptions.imageRoundPercent = true;
            this.froalaOptions.imageDefaultWidth = 100;
            this.froalaOptions.imageSplitHTML = true;
        } */

        /* this.froalaOptions.imageStyles = Object.assign({},
            this.imageStyles,
            {
                'fr-rounded': 'Rounded',
                'fr-bordered': 'Bordered'
            }
        ); */
    }
}
