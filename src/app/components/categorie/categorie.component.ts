import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Subject} from "rxjs";
import {CategorieService} from "../../shared/services/categorie/categorie.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements AfterViewInit{
  data: {}[] = [];
  displayedColumns: string[] = ['numero', 'nom'];
  dataSource = new MatTableDataSource<{}>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataReadySubject = new Subject<void>();

  constructor(
      private categorieService: CategorieService,
      private _liveAnnouncer: LiveAnnouncer,
  ) {
  }

  getData() {
    this.categorieService.getCategorieList().subscribe((categories) => {
      console.log("get data ...");
      this.data = categories.map((categorie) => ({
        numero: categorie.id,
        nom: categorie.nom,
      }));
      this.dataSource = new MatTableDataSource(this.data);

      // Emit the signal when data is ready
      this.dataReadySubject.next();
    });
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    this.dataReadySubject.subscribe(() => {
      // This code will execute after data is ready
      console.log("data is ready");
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // Trigger the data retrieval
    this.getData();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
