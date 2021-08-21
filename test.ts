// import { Observable } from './rxjs.js';

// const obs = new Observable(subscriber => {
//     subscriber.next(1);
//     subscriber.next(2);
//     subscriber.next(3);
//     const timeoutId = setTimeout(
//         () => {
//             subscriber.next(4);
//             subscriber.complete();
//         },
//         1000
//     );

//     return function unsubscribe() {
//         console.log('unsubscribe');
//         clearTimeout(timeoutId);
//     }
// });

// const subscription = obs.subscribe({
//     next: v => console.log(v),
//     error: err => console.error(err),
//     complete: () => console.log('completed')
// });

// subscription.unsubscribe();


import { of } from './rxjs';
import { first, map } from './rxjs/operators';

of(1, 2, 3)
    .pipe(map(v => v*v), first())
    .subscribe({
        next: v => console.log(v),
        error: err => console.error(err),
        complete: () => console.log('completed')
    });
