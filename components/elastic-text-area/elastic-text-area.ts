import { Directive , HostListener} from '@angular/core';

/**
 * Generated class for the ElasticTextArea directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[elastic-text-area]' // Attribute selector
})
export class ElasticTextArea {

  constructor() {
    //console.log('Hello ElasticTextArea Directive');
  }

  // The foollowing Decorator listens for an Event on the Host element

  @HostListener('input', ['$event.target'])
    onTextInput(domElement:any) : void{
      domElement.style.overflow = 'hidden';
      domElement.style.height = 'auto';
      //console.log(domElement.scrollHeight);
      if(domElement.scrollHeight < 380){
        domElement.style.height = domElement.scrollHeight + 'px';
      }      
    }

}
