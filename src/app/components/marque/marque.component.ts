import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Subject} from "rxjs";
import {MarqueService} from "../../shared/services/marque/marque.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.css']
})
export class MarqueComponent implements AfterViewInit{
  data: {}[] = [];
  displayedColumns: string[] = ['numero', 'nom'];
  dataSource = new MatTableDataSource<{}>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataReadySubject = new Subject<void>();

  constructor(
      private marqueService: MarqueService,
      private _liveAnnouncer: LiveAnnouncer,
  ) {
  }

  getData() {
    this.marqueService.getMarqueList().subscribe((marques) => {
      console.log("get data ...");
      this.data = marques.map((marque) => ({
        numero: marque.id,
        nom: marque.nom,
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
