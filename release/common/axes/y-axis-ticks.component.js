"use strict";
var core_1 = require('@angular/core');
var trim_label_helper_1 = require('../trim-label.helper');
var ticks_helper_1 = require('./ticks.helper');
var YAxisTicks = (function () {
    function YAxisTicks() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.showGridLines = false;
        Object.assign(this, {
            innerTickSize: 6,
            outerTickSize: 6,
            tickPadding: 3,
            rotateLabels: false,
            verticalSpacing: 20,
            textAnchor: 'middle',
            trimLabel: trim_label_helper_1.trimLabel
        });
    }
    YAxisTicks.prototype.ngOnChanges = function () {
        this.update();
    };
    YAxisTicks.prototype.update = function () {
        var scale;
        var sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
        this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
        scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                return d;
            };
        }
        this.adjustedScale = scale.bandwidth ? function (d) {
            return scale(d) + scale.bandwidth() * 0.5;
        } : scale;
        switch (this.orient) {
            case "top":
                this.transform = function (tick) {
                    return "translate(" + this.adjustedScale(tick) + ",0)";
                };
                this.textAnchor = "middle";
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? "0em" : ".71em";
                break;
            case "bottom":
                this.transform = function (tick) {
                    return "translate(" + this.adjustedScale(tick) + ",0)";
                };
                this.textAnchor = "middle";
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? "0em" : ".71em";
                break;
            case "left":
                this.transform = function (tick) {
                    return "translate(0," + this.adjustedScale(tick) + ")";
                };
                this.textAnchor = "end";
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = ".32em";
                break;
            case "right":
                this.transform = function (tick) {
                    return "translate(0," + this.adjustedScale(tick) + ")";
                };
                this.textAnchor = "start";
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = ".32em";
                break;
        }
    };
    YAxisTicks.prototype.getTicks = function () {
        var ticks;
        var maxTicks = this.getMaxTicks();
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
            if (ticks.length > maxTicks) {
                if (this.tickArguments) {
                    this.tickArguments[0] = Math.min(this.tickArguments[0], maxTicks);
                }
                else {
                    this.tickArguments = [maxTicks];
                }
                ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
            }
        }
        else {
            ticks = this.scale.domain();
            ticks = ticks_helper_1.reduceTicks(ticks, maxTicks);
        }
        return ticks;
    };
    YAxisTicks.prototype.getMaxTicks = function () {
        var tickHeight = 20;
        return Math.floor(this.height / tickHeight);
    };
    YAxisTicks.prototype.tickTransform = function (tick) {
        return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
    };
    YAxisTicks.prototype.gridLineTransform = function () {
        return "translate(0," + this.verticalSpacing + ")";
    };
    YAxisTicks.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[yAxisTicks]',
                    template: "\n    <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n      [attr.transform]=\"transform(tick)\" >\n      <title>{{tickFormat(tick)}}</title>\n      <svg:text\n        stroke-width=\"0.01\"\n        [attr.dy]=\"dy\"\n        [attr.x]=\"x1\"\n        [attr.y]=\"y1\"\n        [attr.text-anchor]=\"textAnchor\"\n\n        [style.font-size]=\"'12px'\">\n        {{trimLabel(tickFormat(tick))}}\n      </svg:text>\n\n      <svg:g\n        *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n\n        <svg:line\n          class=\"gridline-path gridline-path-horizontal gridline-path-shadow\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\" />\n        <svg:line\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\"\n          y1=\"1\"\n          y2=\"1\" />\n      </svg:g>\n    </svg:g>\n  "
                },] },
    ];
    YAxisTicks.ctorParameters = [];
    YAxisTicks.propDecorators = {
        'scale': [{ type: core_1.Input },],
        'orient': [{ type: core_1.Input },],
        'tickArguments': [{ type: core_1.Input },],
        'tickValues': [{ type: core_1.Input },],
        'tickStroke': [{ type: core_1.Input },],
        'tickFormatting': [{ type: core_1.Input },],
        'showGridLines': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
    };
    return YAxisTicks;
}());
exports.YAxisTicks = YAxisTicks;
//# sourceMappingURL=y-axis-ticks.component.js.map