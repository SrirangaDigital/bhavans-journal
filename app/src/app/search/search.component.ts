import { Component, OnInit, ViewEncapsulation, Renderer } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import * as _underscore from 'underscore';

// Import the DataService
import { DataService } from '../data.service';


export interface Author {
  author: string;
  roman: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  searchForm = new FormGroup({
    title: new FormControl(''),
    authornames: new FormControl(''),
    feature: new FormControl(''),
    series: new FormControl(''),
    fulltext: new FormControl(''),
    year: new FormControl('')
  });

  features: Array<any>;
  authors: Array<any>;

  filteredAuthorOptions: Observable<string[]>;
  
  constructor( private route: ActivatedRoute, private router: Router, private _dataService: DataService, private renderer: Renderer) { }

  ngOnInit() {

    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this._dataService.getFeaturesList())
      .subscribe(res => {
        this.features = res;
    });

    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this._dataService.getAllAuthors())
      .subscribe(res => {
        this.authors = res;


        this.filteredAuthorOptions = this.searchForm.get('authornames').valueChanges
          .pipe(
            map(value => value ? this._filterAuthor(value) : this.authors.slice())
          );
    });
  }

  private _filterAuthor(value: string): Author[] {

    // console.log(value);
    const filterValueAuthor = value.toLowerCase();

    return this.authors.filter(option => option.author.toLowerCase().includes(filterValueAuthor));
  }

  displayAuthor(user?: Author): string | undefined {
    
    return user ? user.author : undefined;
  }

  onSubmit() {

    var form = _underscore.pick(this.searchForm.value, _underscore.identity);
	  this.router.navigate(['/searchResults'], { queryParams:  form });
  }
}
