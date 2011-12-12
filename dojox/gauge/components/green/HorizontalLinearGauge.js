define([
		"dojo/_base/lang", 
		"dojo/_base/declare",
		"dojo/_base/Color",
		"../GaugeUtils",
		"../../RectangularGauge", 
		"../../LinearScaler", 
		"../../RectangularScale", 
		"../../RectangularValueIndicator",
		"../DefaultPropertiesMixin"
	], 
	function(lang, declare, Color, GaugeUtils, RectangularGauge, LinearScaler, RectangularScale, RectangularValueIndicator, DefaultPropertiesMixin){

	/*=====
	var RectangularGauge = dojox.gauge.RectangularGauge;
	=====*/

		return declare("dojox.gauge.components.green.HorizontalLinearGauge", [RectangularGauge, DefaultPropertiesMixin], {
			//	borderColor:
			//		The border color. Default is "#323232".
			borderColor: [50,50,50],
			//	fillColor:
			//		The background color. Default is "#6DB713".
			fillColor: [109,183,19],
			//	indicatorColor:
			//		The indicator fill color. Default is "#000000".
			indicatorColor: [0,0,0],
			constructor: function(){
				// Base colors
				this.borderColor = new Color(this.borderColor);
				this.fillColor = new Color(this.fillColor);
				this.indicatorColor = new Color(this.indicatorColor);

				this.addElement("background", lang.hitch(this, this.drawBackground));

				// Scaler
				var scaler = new LinearScaler();
				
				// Scale
				var scale = new RectangularScale();
				scale.set("scaler", scaler);
				scale.set("labelPosition", "leading");
				scale.set("paddingLeft", 30);
				scale.set("paddingRight", 30);
				scale.set("paddingTop", 28);
				scale.set("labelGap", 2);
				scale.set("font", {
					family: "Helvetica",
					weight: "bold",
					size: "7pt"
				});
				this.addElement("scale", scale);
				
				var indicator = new RectangularValueIndicator();
				indicator.set("interactionArea", "gauge");
				indicator.set("value", scaler.minimum);
				indicator.set("paddingTop", 32);
				indicator.set("indicatorShapeFunc", lang.hitch(this, function(group, indicator){

					return group.createPolyline([0, 0, -10, -20, 10, -20, 0, 0]).setFill(this.indicatorColor);

				}));
				scale.addIndicator("indicator", indicator);
			},

			drawBackground: function(g, w, h){
				var lighterFillColor = GaugeUtils.brightness(new Color(this.fillColor), 100);
				g.createRect({
					x: 0,
					y: 0,
					width: w,
					height: 50,
					r: 10
				}).setFill(this.borderColor);
				g.createRect({
					x: 3,
					y: 3,
					width: w - 6,
					height: 44,
					r: 7
				}).setFill({
					type: "linear",
					x1: 0,
					y1: 2,
					x2: 0,
					y2: 30,
					colors: [
						{offset: 0, color: lighterFillColor},
						{offset: 1, color: this.fillColor}
					]
				});
				g.createRect({
					x: 6,
					y: 6,
					width: w - 12,
					height: 38,
					r: 5
				}).setFill({
					type: "linear",
					x1: 0,
					y1: 6,
					x2: 0,
					y2: 38,
					colors: [
						{offset: 0, color: [226,226,221]},
						{offset: 0.5, color: [239,239,236]},
						{offset: 1, color: "white"}
					]
				});
			}
		});
	}
);

