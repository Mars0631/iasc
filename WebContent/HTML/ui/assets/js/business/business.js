var ws, charCpu, memoryChart, diskChart;

function initWebSocket() {
    "use strict";
    if (window.WebSocket) {

        ws = new WebSocket("ws://localhost:8080/iasc/wsServlet");


        ws.onopen = function () {
            console.log("open!!");
            ws.send("hello" + Math.random().toFixed(2));
        };


        ws.onclose = function (evt) {
            console.log("closed!!");
        };
        var sys, val1, usr, val2, val3, val4;

        ws.onmessage = function (evt) {
            console.log(evt.data);

            //charCpu.setChartAttribute('animation', 1);
            sys = evt.data.toString().split("|")[1].toString();
            val1 = sys.split("$")[1].replace("%", "");

            usr = evt.data.toString().split("|")[0].toString();
            val2 = usr.split("$")[1].replace("%", "");

            val3 = evt.data.toString().split("|")[2].toString().split("$")[1];

            val4 = evt.data.toString().split("|")[3].toString().split("$")[1];


            // charCpu.setChartAttribute('subCaption', val1);
            charCpu.setDataForId("vUser", val1);
            charCpu.setDataForId("vSys", val2);

            memoryChart.setDataForId("memoryPoint", val3);
            diskChart.setDataForId("diskPoint", val4);


        };

        ws.onerror = function (evt) {
            console.log("WebSocketError!");
        };
    }

}

function FC_ChartUpdated(DOMID) {
    if (DOMID == "cpuchart") {

        var charRef = FusionCharts(DOMID);

        dataVUser = charRef.getDataForId("vUser");

        dataVSys = charRef.getDataForId("vSys");


        //        charCpu.args.dataSource.annotations.groups[0].items[1].tooltext = dataVSys;
        // var vaSys = charRef.getDataForId("vSysValue");
        // console.log(dataVUser);
        // charRef.setChartAttribute('caption', dataVUser.toString());

    }
}


FusionCharts.ready(function () {
    "use strict";
    charCpu = new FusionCharts({
        type: 'angulargauge',
        dataFormat: 'json',
        id: 'cpuchart',
        renderAt: 'chart-container-cpu',
        height: '260',
        dataSource: {
            "chart": {
                "caption": "CPU使用率",
                // "subCaption": "使用率"
                "subCaption": "绿针(User)蓝针(System)",
                "lowerLimit": "0",
                "upperLimit": "100",
                "showValue": "1",
                "showBorder": "0",
                "majorTMNumber": "4",
                "majorTMHeight": "15",
                "majorTMThickness": "1.5",
                "numberSuffix": "%",
                "bgcolor": "#ffffff",
                "minorTMNumber": "4",
                "minorTMHeight": "9",
                "minorTMThickness": ".5",
                "showHoverEffect": "1",
                "pivotRadius": "7",
                "pivotFillColor": "#1122CC",
                "pivotFillMix": "{dark-30},{light-30},{dark-40}",
                "pivotFillRatio": "",
                "gaugeFillMix": "{dark-1},{light-1},{dark-1}",

                "chartBottomMargin": "10",
                //                "chartTopMargin": "15",
                "theme": "fint"
            },
            "colorRange": {
                "color": [{
                        "minValue": "0",
                        "maxValue": "40",
                        "label": "空闲",
                        "code": "#6baa01"
                            },
                    {
                        "minValue": "40",
                        "maxValue": "80",
                        "code": "#f8bd19"
                            },
                    {
                        "minValue": "80",
                        "maxValue": "100",
                        "code": "#e44a00"
                            }]

            },
            "dials": {
                "dial": [{
                    // "editMode": "1",
                    "id": "vSys",
                    "value": "0",
                    "showValue": "1",
                    "valueX": "250",
                    "valueY": "240",
                    "bgColor": "#0075c2",
                    "tooltext": "System usage: $value",
                    "rearExtension": "15"
                            }, {
                    "id": "vUser",
                    "value": "0",
                    "showValue": "1",
                    "valueX": "150",
                    "text": "0",
                    "valueY": "240",
                    "bgColor": "#1aaf5d",
                    "tooltext": "User usage: $value",
                    "rearExtension": "15"
                            }]
            }
            //            "annotations": {
            //                "origw": "400",
            //                "origh": "300",
            //                "autoscale": "1",
            //                "groups": [
            //                    {
            //                        "id": "valueBG",
            //                        "items": [
            //                            {
            //                                "id": "vBgSys",
            //                                "type": "rectangle",
            //                                "x": "255",
            //                                "y": "275",
            //                                "tox": "315",
            //                                "toy": "300",
            //                                "fillcolor": "#0075c2"
            //                    }, {
            //                                "id": "vSysValue",
            //                                "type": "text",
            //                                "x": "260",
            //                                "text": "1",
            //                                "tooltext": "hello ",
            //                                "fontSize": "12",
            //                                "align": "left",
            //                                "y": "285",
            //                                "fillcolor": "#ffffff"
            //
            //                    },
            //                            {
            //                                "id": "vBgUser",
            //                                "type": "rectangle",
            //                                "x": "155",
            //                                "y": "275",
            //                                "tox": "215",
            //                                "toy": "300",
            //                                "fillcolor": "#1aaf5d"
            //                    }
            //                ]
            //            }
            //        ]
            //            }


        }
    }).render();
    memoryChart = new FusionCharts({
            type: 'hlineargauge',
            renderAt: 'chart-container-memory',
            width: '430',
            height: '126',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "内存使用率",
                    "subcaptionFontBold": "0",
                    "lowerLimit": "0",
                    "upperLimit": "100",
                    //                                "lowerLimitDisplay": "Bad",
                    //                                "upperLimitDisplay": "Good",

                    "majorTMThickness": "2",
                    "minorTMColor": "#163143",
                    "minorTMAlpha": "35",
                    "minorTMHeight": "4",
                    "minorTMThickness": "1",
                    "gaugeFillMix": "{dark-1},{light-1},{dark-1}",

                    "numberSuffix": "%",
                    "showValue": "1",
                    "showBorder": "0",
                    "tickValueStep": "1",
                    //"tickValueDecimals": "2",
                    // "forceTickValueDecimals": "1",
                    "showShadow": "1",
                    "tickMarkDistance": "5",
                    "alignCaptionWithCanvas": "1",
                    "captionAlignment": "center",
                    "bgcolor": "#ffffff"
                },
                "colorRange": {
                    "color": [{
                        "minValue": "0",
                        "maxValue": "40",
                        "label": "低",
                        "code": "#6baa01"
                                }, {
                        "minValue": "40",
                        "maxValue": "75",
                        "label": "中",
                        "code": "#f8bd19"
                                }, {
                        "minValue": "75",
                        "maxValue": "100",
                        "label": "繁忙",
                        "code": "#e44a00"
                                }]
                },


                "pointers": {
                    "pointer": [
                        {
                            "id": "memoryPoint",
                            "value": "0"
                        }
                    ]
                }


            }
        })
        .render();
    diskChart = new FusionCharts({
            type: 'hlineargauge',
            renderAt: 'chart-container-disk',
            width: '430',
            height: '127',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "磁盘使用率",
                    "subcaptionFontBold": "0",
                    "lowerLimit": "0",
                    "upperLimit": "100",
                    //                                "lowerLimitDisplay": "Bad",
                    //                                "upperLimitDisplay": "Good",

                    "majorTMThickness": "2",
                    "minorTMColor": "#163143",
                    "minorTMAlpha": "35",
                    "minorTMHeight": "4",
                    "minorTMThickness": "1",
                    "gaugeFillMix": "{dark-1},{light-1},{dark-1}",

                    "numberSuffix": "%",
                    "showValue": "1",
                    "showBorder": "0",
                    "tickValueStep": "1",
                    //"tickValueDecimals": "2",
                    // "forceTickValueDecimals": "1",
                    "showShadow": "1",
                    "tickMarkDistance": "5",
                    "alignCaptionWithCanvas": "1",
                    "captionAlignment": "center",
                    "bgcolor": "#ffffff"
                },
                "colorRange": {
                    "color": [{
                        "minValue": "0",
                        "maxValue": "30",
                        "label": "轻度",
                        "code": "#6baa01"
                                }, {
                        "minValue": "30",
                        "maxValue": "70",
                        "label": "中度",
                        "code": "#f8bd19"
                                }, {
                        "minValue": "70",
                        "maxValue": "100",
                        "label": "重度",
                        "code": "#e44a00"
                                }]
                },
                "pointers": {
                    "pointer": [
                        {
                            "id": "diskPoint",
                            "value": "0"
                        }
                    ]
                }
            }
        })
        .render();
});


window.onload = function () {
    initWebSocket();
}
