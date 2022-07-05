function getBestRemovedTrader() {
    if (currentRemovedBest == "N/A"){
        return currentRemovedBest
    }else{
        return currentRemovedBest.name
    }
}

function getBestAliveTrader() {
    if (tradersArray.length >= 1){
        return tradersArray[0].name
    }else{
        return "N/A"
    }
}



//TRAINING SPEED FUNCTIONS
function speedUp() {
    let tempIncreasedSpeed = speedDelay - 50;

    if (tempIncreasedSpeed >= 0){
        speedDelay = tempIncreasedSpeed;
    }
    document.getElementById("speedElement").innerHTML = String(speedDelay) + "ms";
};

function speedDown() {
    let tempDecreasedSpeed = speedDelay + 50;

    if (tempDecreasedSpeed <= 1000){
        speedDelay = tempDecreasedSpeed;
    }
    document.getElementById("speedElement").innerHTML = String(speedDelay) + "ms";
};


//SETUP THE TRADERS CLASS OBJECTS IN ARRAY
function createTraders() {
    for (let i = 0; i < POPULATION_INT; i++) {
        var brain =  new NeuralNetwork(BRAIN_INPUT_NODES, BRAIN_HIDDEN_NODES, BRAIN_OUTPUTS_NODES);
        var name = "Trader_" + (String(i+1))
        tradersArray[i] = new Traders(brain, parseFloat(10.00), name)
    }
};


//TRADERS RANK TABLE SETUP
async function newRankVisual(){
    const tempPElementHolder01 = document.createElement('p');
    
    tempPElementHolder01.innerHTML = "  ALIVE TRADERS:";
    await document.getElementById("ranking_div").appendChild(tempPElementHolder01);
    
    for (let i = 0; i < tradersArray.length; i++) {
        const tempDivElementHolder01 = document.createElement('div');
        
        tempDivElementHolder01.setAttribute("class", "Div1xxx");
        tempDivElementHolder01.setAttribute("id", tradersArray[i].name);

        const ranks = tradersArray[i].name + " | Fitness: " + tradersArray[i].fitness.toFixed(7) + ", Balance: " + tradersArray[i].total.toFixed(2) + " GDP";
        const textnode = document.createTextNode(ranks);
        tempDivElementHolder01.appendChild(textnode);
        document.getElementById("ranking_div").appendChild(tempDivElementHolder01);
    }
    
    const tempPElementHolder02 = document.createElement('p');

    tempPElementHolder02.innerHTML = "REMOVED TRADERS:";
    document.getElementById("ranking_div").appendChild(tempPElementHolder02);
    
    for (let i = 0; i < failedTradersArray.length; i++) {
        const tempElementHolder01 = document.createElement('div');
        
        tempElementHolder01.setAttribute("class", "Div2xxx");
        const ranks = failedTradersArray[i].name + " | Fitness: " + failedTradersArray[i].fitness.toFixed(7) + ", Balance: " + failedTradersArray[i].total.toFixed(2) + " GDP";
        const textnode = document.createTextNode(ranks);
        tempElementHolder01.appendChild(textnode);
        document.getElementById("ranking_div").appendChild(tempElementHolder01);
    }
};

async function resetRank(){
    document.getElementById("ranking_div").innerHTML = ""
    await newRankVisual();
}