import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class GridDataSource<T> implements DataSource<T> {
    protected subject = new BehaviorSubject<T[]>([]);
    protected loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public empty = false;
    public data: T[] = [];

    constructor() { }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.subject.asObservable().pipe(
            tap(data => {
                this.empty = !data.length;
                this.data = data;
            }));
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subject.complete();
        this.loadingSubject.complete();
    }
}
