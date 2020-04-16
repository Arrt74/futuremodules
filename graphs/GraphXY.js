import React, {useEffect} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import {uniqueId} from "lodash";
import numeraljs from "numeraljs";

am4core.useTheme(am4themes_dark);

export const GraphXY = ({graphData,config}) => {

  const graphId = uniqueId('graph-');

  useEffect(() => {
    let chart = am4core.create(graphId, am4charts.XYChart);
    chart.paddingRight = 20; // This is somehow needed otherwise the last part of the xAxis string is clamped :O

    if ( graphData ) {
      let xAxis = null;
      if (config.graphXYXDataType==="value") {
        xAxis = chart.xAxes.push(new am4charts.ValueAxis());
      } else if (config.graphXYXDataType==="category") {
        xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      } else {
        xAxis = chart.xAxes.push(new am4charts.DateAxis());
      }

      xAxis.renderer.minGridDistance = 50;
      xAxis.renderer.grid.template.location = 0.5;
      xAxis.startLocation = 0.5;
      xAxis.endLocation = 0.5;

      chart.yAxes.push(new am4charts.ValueAxis());

      console.log("GraphData inside ", graphData);
      graphData.forEach((e,i) => {
        let series = chart.series.push(new am4charts.LineSeries());
        series.name=e.name;
        series.dataFields.valueY = "y";
        if (config.graphXYXDataType==="value") {
          series.dataFields.valueX = "x";
          series.tooltipText = "{valueX} - {name} {valueY.value}";
        } else if (config.graphXYXDataType==="category") {
          series.dataFields.categoryX = "x";
          series.tooltipText = "{categoryX} - {name} {valueY.value}";
        } else {
          series.dataFields.dateX = "x";
          series.tooltipText = "{dateX.formatDate(dd/MM)} - {name} {valueY.value}";
        }

        // if (config.graphXYSeries[i].fillArea==="true") {
        //   series.fillOpacity = 0.2;
        // } else {
        //   series.fillOpacity = 0;
        // }
        //
        // if (numeraljs(config.graphXYSeries[i].lineWidth).value()===0) {
        //   series.strokeWidth = 1;
        // } else {
        //   series.strokeWidth = numeraljs(config.graphXYSeries[i].lineWidth).value();
        // }
        // series.strokeDasharray = config.graphXYSeries[i].lineStyle;
        // series.tensionX = 1;
        // if (config.graphXYSeries[i].bullet==="square") {
        //   let bullet = series.bullets.push(new am4charts.Bullet());
        //   let square = bullet.createChild(am4core.Rectangle);
        //   square.width = 5;
        //   square.height = 5;
        //   square.horizontalCenter = "middle";
        //   square.verticalCenter = "middle";
        // } else if (config.graphXYSeries[i].bullet==="circle") {
        //   let bullet = series.bullets.push(new am4charts.CircleBullet());
        //   bullet.circle.radius=2.5;
        // }
        series.data = e.data;
      });

      // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      // valueAxis.tooltip.disabled = true;
      // valueAxis.renderer.minWidth = 35;
      //
      // let series = chart.series.push(new am4charts.LineSeries());
      // series.dataFields.dateX = "date";
      // series.dataFields.valueY = "value";
      //
      // series.tooltipText = "{name}: [bold]{valueY}[/]";

      // createAxisAndSeries("visits", "Visits", false, "circle");

      chart.legend = new am4charts.Legend();
      chart.cursor = new am4charts.XYCursor();
      let title = chart.titles.create();
      title.text = config.title;
      title.fontSize = 20;
      title.fontWeight = "bold";
      title.marginBottom = 5;
    }

    return () => {
      if ( chart ) {
        chart.dispose();
      }
    }
  }, [graphData, config, graphId]);

  return (
    <div id={graphId} style={{width: "100%", height: "500px"}}/>
  );
};
