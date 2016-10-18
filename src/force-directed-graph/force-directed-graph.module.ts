import {NgModule} from "@angular/core";
import {ForceDirectedGraph} from "./force-directed-graph.component";
// import {ForceDirectedGraphNormalized} from "./force-directed-graph-normalized.component";
// import {ForceDirectedGraphStacked} from "./force-directed-graph-stacked.component";
// import {AreaSeries} from "./area-series.component";
import {CommonModule} from "../common/common.module";

@NgModule({
  imports: [CommonModule],
  declarations: [
    ForceDirectedGraph,
    // ForceDirectedGraphNormalized,
    // ForceDirectedGraphStacked,
    // AreaSeries
  ],
  exports: [
    ForceDirectedGraph,
    // ForceDirectedGraphNormalized,
    // ForceDirectedGraphStacked,
    // AreaSeries
  ]
})
export class ForceDirectedGraphModule {}
