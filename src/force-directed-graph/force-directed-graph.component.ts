import {Component, Input, Output, EventEmitter, OnChanges, HostListener} from '@angular/core';
import {calculateViewDimensions, ViewDimensions} from '../common/view-dimensions.helper';
import {colorHelper} from '../utils/color-sets';
import {BaseChart} from '../common/base-chart.component';
import * as moment from 'moment';
import ObjectId from "../utils/object-id";
import d3 from '../d3';

@Component({
  selector: 'area-chart',
  template: `
    <chart
      [view]="view"
      [colors]="colors">

      <svg:g [attr.transform]="transform" class="force-directed-graph chart">
        <svg:g class="nodes">
          <svg:g circle *ngFor="let node of graph.nodes"
            [cx]="node.cx"
            [cy]="node.cy"
            [r]="node.radius"
            [fill]="colors(node.value)"
            [pointerEvents]="node.value === 0 ? 'none': 'all'"
            [data]="node.value"
            [classNames]="node.classNames"
            [style.cursor]="'pointer'"
            
            swui-tooltip
            [tooltipPlacement]="'top'"
            [tooltipType]="'tooltip'"
            [tooltipTitle]="node.tooltipText"
          />
        </svg:g>
        <svg:g class="links">
          <svg:line *ngFor="let link of graph.links"
            strokeWidth="1"
            [attr.x1]="link.x1"
            [attr.y1]="link.y1"
            [attr.x2]="link.x2"
            [attr.y2]="link.y2"
          />
        </svg:g>
      </svg:g>
    </chart>
  `
})
export class ForceDirectedGraph extends BaseChart implements OnChanges {
  colors: Function;
  dims: ViewDimensions;
  margin = [10, 20, 70, 70];
  seriesDomain: any;
  transform: string;

  @Input() customColors;
  @Input() graph;
  @Input() scheme;
  @Input() view;

  @Output() clickHandler = new EventEmitter();

  ngOnChanges() {
    this.update();
  }

  update() {
    super.update();
    this.dims = calculateViewDimensions(this.view, this.margin, false, false, false, 9);

    this.setColors();

    this.transform = `translate(${ this.dims.xOffset }, ${ this.margin[0] })`;
    let pageUrl = window.location.href;
  }

  click(data, series) {
    data.series = series.name;
    this.clickHandler.emit(data);
  }

  trackBy(index, item) {
    return item.name;
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
  }

}
