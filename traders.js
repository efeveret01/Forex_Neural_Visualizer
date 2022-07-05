class Traders {
    constructor(brain, balance, name) {
        if (name != ""){
            this.name = name;
        }
        this.brain = brain;
        this.balance = balance;
        this.didDayTrade = false;
        this.total = balance;
        this.points = parseFloat(1.00);
        this.fitness = parseFloat(0.00);
        this.isSuccessfulTrade = false;
        this.dailyTradeArray = [];
        this.hasFailedTradeArray = false;
    }
    
    checkTradesForFailure () {
        let count = 0
        for (let i = 0; i < this.dailyTradeArray.length; i++ ) {
            if (this.dailyTradeArray[i] == false) {
                count = count + 1;
            }
        }
        
        if (count >= 3){
            this.hasFailedTradeArray = true;
        } else {
            this.hasFailedTradeArray = false; 
        }
        
        
    }
    
    addToDailyTradeArray (bool) {
        this.dailyTradeArray.push(bool)
        
        if (this.dailyTradeArray.length == 6) {
            this.dailyTradeArray.shift();
        }
        
        this.checkTradesForFailure();
    }

    addToBalance(amountFloat) {
        this.balance = this.balance + amountFloat;
        this.total = this.total + amountFloat;
        this.addToDailyTradeArray(true);
        this.didDayTrade = true
        this.balance.toFixed(2)
        this.total.toFixed(2)
        
    }

    subFromBalance(amountFloat) {
        this.balance = this.balance - amountFloat;
        this.total = this.total - amountFloat;
        this.addToDailyTradeArray(false);
        this.didDayTrade = true
    }


    makeATrade(actualTrade, expectedLabelTrade) {
        this.isSuccessfulTrade = false;
        
        if (actualTrade == expectedLabelTrade){
            this.isSuccessfulTrade = true

            if (actualTrade == 1.0 || actualTrade == 4.0) {
                this.points = this.points * 1.01
            } else {
                this.points = this.points * 1.25
                this.addToBalance(25.00)
            }
        } else {

            if (actualTrade == 1.0 || actualTrade == 4.0) {
                if (expectedLabelTrade == 2.0 || expectedLabelTrade == 3.0) {
                    this.points = this.points * 0.99
                    } 
            } else {
                this.points = this.points * 0.75
                this.subFromBalance(4.80)
            };
        };       
        this.checkTradesForFailure()
        this.points
        //return this.points, isSuccessfulTrade;
    }
  }