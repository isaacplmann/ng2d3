"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_sets_1 = require('../utils/color-sets');
var base_chart_component_1 = require('../common/base-chart.component');
var d3_1 = require('../d3');
var BarHorizontal2D = (function (_super) {
    __extends(BarHorizontal2D, _super);
    function BarHorizontal2D() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    BarHorizontal2D.prototype.ngOnChanges = function () {
        this.update();
    };
    BarHorizontal2D.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();
        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontal2D.prototype.getGroupScale = function () {
        var spacing = 0.2;
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontal2D.prototype.getInnerScale = function () {
        var spacing = 0.2;
        return d3_1.default.scaleBand()
            .rangeRound([0, this.groupScale.bandwidth()])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    };
    BarHorizontal2D.prototype.getValueScale = function () {
        return d3_1.default.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valuesDomain);
    };
    BarHorizontal2D.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontal2D.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarHorizontal2D.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarHorizontal2D.prototype.groupTransform = function (group) {
        return "translate(0, " + this.groupScale(group.name) + ")";
    };
    BarHorizontal2D.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarHorizontal2D.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarHorizontal2D.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    BarHorizontal2D.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'bar-horizontal-2d',
                    template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g gridPanelSeries\n          [xScale]=\"valueScale\"\n          [yScale]=\"groupScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          orient=\"horizontal\">\n        </svg:g>\n\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"valueScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesHorizontal\n            [xScale]=\"valueScale\"\n            [yScale]=\"innerScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n\n      </svg:g>\n    </chart>\n  ",
                    animations: [
                        core_1.trigger('animationState', [
                            core_1.transition('* => void', [
                                core_1.style({
                                    opacity: 1,
                                    transform: '*',
                                }),
                                core_1.animate(500, core_1.style({ opacity: 0, transform: 'scale(0)' }))
                            ])
                        ])
                    ]
                },] },
    ];
    BarHorizontal2D.ctorParameters = [];
    BarHorizontal2D.propDecorators = {
        'view': [{ type: core_1.Input },],
        'results': [{ type: core_1.Input },],
        'scheme': [{ type: core_1.Input },],
        'customColors': [{ type: core_1.Input },],
        'legend': [{ type: core_1.Input },],
        'xAxis': [{ type: core_1.Input },],
        'yAxis': [{ type: core_1.Input },],
        'showXAxisLabel': [{ type: core_1.Input },],
        'showYAxisLabel': [{ type: core_1.Input },],
        'xAxisLabel': [{ type: core_1.Input },],
        'yAxisLabel': [{ type: core_1.Input },],
        'gradient': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return BarHorizontal2D;
}(base_chart_component_1.BaseChart));
exports.BarHorizontal2D = BarHorizontal2D;
//# sourceMappingURL=bar-horizontal-2d.component.js.map