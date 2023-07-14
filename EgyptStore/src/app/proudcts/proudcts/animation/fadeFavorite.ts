import { animate, state, style, transition, trigger } from "@angular/animations";


export const fadeFavorite = trigger('Fade', [
    state('void', style({ opacity: 0, })),
    transition('void <=> *', [animate('300ms ease-in-out')]),
    state('fade', style({ opacity: 1 }))
]);



