import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import {ReplaySubject, Subject} from "rxjs";
import {first, takeUntil} from "rxjs/operators";

import {GoogleChartService} from "src/google-chart/google.chart.service";
import {ProjectTotal} from "src/models/project.total";

@Component({
  selector: 'cl-google-chart',
  template: `
    <div #chartDiv id="chart-div"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleChartComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  @ViewChild('chartDiv')
  chartDiv: ElementRef;

  @Input()
  projectsTotal: Array<ProjectTotal>;

  private googleObj;

  private chartLoaded$: ReplaySubject<void> = new ReplaySubject<void>();

  private destroy$: Subject<void> = new Subject();

  constructor(private googleChartService: GoogleChartService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.projectsTotal && changes.projectsTotal.currentValue) {
      this.chartLoaded$
        .pipe(first())
        .subscribe(() => {
          this.drawChart();
          console.log(this.projectsTotal);
        });
    }
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.googleChartService.init()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.googleObj = window['google'];
        this.googleObj.charts.load('current', {'packages': ['bar']});
        this.googleObj.charts.setOnLoadCallback(() => {
          this.chartLoaded$.next();
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private drawChart(): void {
    const data = this.googleObj.visualization.arrayToDataTable([
      ['Categories', 'Planned', 'Actual'],
      ...this.getDataForChart()
    ]);

    const options = {
      bars: 'vertical',
      hAxis: {
        textStyle: {
          fontSize: 25
        }
      },
      vAxis: {
        textStyle: {
          format: 'decimal',
          fontSize: 20
        }
      },
      height: 400,
      colors: ['#1b9e77', '#d95f02', '#7570b3'],
      fontSize: 16,
      legend: {
        alignment: 'center',
        textStyle: {
          fontSize: 30
        },
        position: 'none'
      }
    };

    const chart = new this.googleObj.charts.Bar(this.chartDiv.nativeElement);

    chart.draw(data, this.googleObj.charts.Bar.convertOptions(options));
  }


  private getDataForChart(): Array<any> {
    return this.projectsTotal.map(this.getProjectDataForChart);
  }

  private getProjectDataForChart(project: ProjectTotal): Array<any> {
    return [project.name, project.planned, project.total];
  }

}
