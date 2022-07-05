class chartObject {
    constructor() {
        this.reset_labels = [0,10,20,30,40,50,60,70,80,90,100];
        this.labels = this.reset_labels;
        this.fx01Data = []
        
        this.myLineChart = new Chart(document.getElementById("chart"), {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Actual Buying Point',
                        pointStyle: 'triangle',
                        pointRadius: 10,
                        pointBackgroundColor: "green",
                        tension: 0,
                        showLine: false,
                        backgroundColor: 'green',
                        borderColor: 'green'//makes the 
                    },
                    {
                        label: 'Actual Selling Point',
                        pointStyle: 'triangle',
                        rotation: 60,
                        pointRadius: 10,
                        pointBackgroundColor: "red",
                        tension: 0,
                        showLine: false,
                        backgroundColor: 'red',
                        borderColor: 'red'//makes the 
                    },
                    {
                        label: 'Open Bid Line',
                        pointBackgroundColor: "black",
                        pointRadius: 0,
                        tension: 0,
                        showLine: true,
                        backgroundColor: 'black',
                        borderColor: 'black'//makes the 
                    },
                    {
                        label: 'Current Trading Index',
                        data: [{x: 4, y: -1}, {x: 4, y: 1}],
                        tension: 0,
                        showLine: true,
                        backgroundColor: 'gold',
                        borderColor: 'gold'//makes the 
                    }
                    
                ]
              },
            options: {
                animation: {
                    duration: 0
                },
                legend: {display: false},
                scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    grid: {
                        borderColor: 'black'
                    }
                    },
                y: {
                    type: 'linear',
                    position: 'left',
                    grid: {
                        borderColor: 'black'
                    }
                    }
                } 
            }
        });

    };

    setMaxAndMin_XAxis (currentTradingIndex) {
        if (currentTradingIndex >= 75) {
            var xMax = currentTradingIndex + 25;
            var xMin = xMax - 100;
    
            this.myLineChart.options.scales.x.min = xMin
            this.myLineChart.options.scales.x.max = xMax
        } else {
            this.myLineChart.options.scales.x.min = 0
            this.myLineChart.options.scales.x.max = 100
        }
        this.myLineChart.update()
    }

    setMaxAndMin_YAxis (y_min, y_max, currentTradingIndex) {
        this.setMaxAndMin_XAxis(currentTradingIndex);

        var y_maxValue = y_max + 0.0001;
        var y_minValue = y_min - 0.0001;
        var lineTopPoint = y_maxValue + 1;
        var lineButtomPoint = y_minValue - 1;

        this.updateCurrentRedLine(lineButtomPoint,lineTopPoint,currentTradingIndex);
    
        this.myLineChart.options.scales.y.min = y_minValue
        this.myLineChart.options.scales.y.max = y_maxValue


        this.myLineChart.update();  
    }

    updateCurrentRedLine (y_min, y_max, currentTradingIndex) {
        this.myLineChart.data.datasets[3].data = [{x: currentTradingIndex, y: y_min}, {x: currentTradingIndex, y: y_max}]
    }

    updateBidLine (dataset) {
        this.myLineChart.data.datasets[2].data = dataset
        this.myLineChart.update();
    }

    updateBuyingPoints (dataset) {
        this.myLineChart.data.datasets[0].data = dataset
    }

    updateSellingPoints (dataset) {
        this.myLineChart.data.datasets[1].data = dataset
    }
}