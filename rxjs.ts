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

    pipe<A>(operator: Operator<T, A>): Observable<A>;
    pipe<A, B>(op1: Operator<T, A>, op2: Operator<A, B>): Observable<B>;
    pipe(...operators: Operator<any, any>[]): Observable<any> {
        if (operators.length == 1) {
            return operators[0](this)
        } else {
            let obs: Observable<any> = this;
            for (const op of operators) {
                obs = op(obs);
            }
            return obs;
        }
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
        let complete = false;
        for (const value of list) {
            if (complete) {
                break;
            }
            subscriber.next(value);
        }

        return function unsubscribe() {
            complete = true;
        }
    });
}

// export function interval(): Observable<T> {
//     // TODO
//     // TODO return Observable
// }
