export class Observable<T> {

    private subscriber: Subscriber<T>;

    constructor(subscriber: Subscriber<T>) {
        this.subscriber = subscriber
    }

    subscribe(observer: Observer<T>): Subscription {
        const unsubscriber = this.subscriber(observer);
        return new Subscription(unsubscriber);
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


// functions

// export function fromEvent(domObj: any, eventName: string): Observable<T> {
//     // TODO
//     // TODO return Observable
// }

// export function of<T>(list: Array<T>): Observable<T> {
//     // TODO
//     // TODO return Observable
// }

// export function interval(): Observable<T> {
//     // TODO
//     // TODO return Observable
// }
