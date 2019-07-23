import { Observable } from 'rxjs';

export class IAutoCompleteItem {
    id: string;
    text: string;
}

export interface IAutoCompleteProvider {
    getItems(term: string): Observable<IAutoCompleteItem[]>;
}