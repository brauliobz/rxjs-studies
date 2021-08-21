import { Observable } from "../rxjs";

export type Operator<T, U> = (sourceObservable: Observable<T>) => Observable<U>;

// export const filter: Operator = () => {
//     // TODO
//     // TODO return new Observable
// }

// export const first: Operator = () => {
//     // TODO
//     // TODO return new Observable
// }

export function map<T, U>(pureTransform: (value: T, index: number) => U): Operator<T, U> {
    return (sourceObservable: Observable<T>) => {
        let index = 0;
        return new Observable(subscriber => {
            sourceObservable.subscribe({
                next: t => subscriber.next(pureTransform(t, index++)),
                error: err => console.error(err),
                complete: () => {}
            });
        })
    };
}
