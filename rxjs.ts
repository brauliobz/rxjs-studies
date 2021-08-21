import { Operator } from "./rxjs/operators";

export class Observable<T> {

    private subscriber: Subscriber<T>;

    constructor(subscriber: Subscriber<T>) {
        this.subscriber = subscriber
    }

    subscribe(observer: Observer<T>): Subscription {
        const unsubscriber = this.subscriber(observer);
        return new Subscription(unsubscriber);
    }

    pipe<U>(operator: Operator<T, U>) {
        return operator(this)
    }
}

type Unsubscriber = () => void;

type Subscriber<T> = (observer: Observer<T>) => (void | Unsubscriber);

export class Subscription {
    private unsubscriber: Unsubscriber | null;

    constructor(unsubscriber: Unsubscriber | void) {
        if (unsubscriber) {
            this.unsubscriber = unsubscriber;
        } else {
            this.unsubscriber = null;
        }
    }

    unsubscribe() {
        if (this.unsubscriber) {
            this.unsubscriber()
        }
    }
}

type Observer<T> = {
    next: (value: T) => void,
    error: (error: any) => void,
    complete: () => void
};


// creation operators

// export function fromEvent(domObj: any, eventName: string): Observable<T> {
//     // TODO
//     // TODO return Observable
// }

export function of<T>(...list: T[]): Observable<T> {
    return new Observable(subscriber => {
        for (const value of list) {
            subscriber.next(value);
        }
    });
}

// export function interval(): Observable<T> {
//     // TODO
//     // TODO return Observable
// }
