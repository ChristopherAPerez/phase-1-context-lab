/* Your Code Here */

function createEmployeeRecord(array){
    let obj = {
        "firstName": array[0],
        "familyName": array[1],
        "title": array[2],
        "payPerHour": array[3],
        "timeInEvents": [],
        "timeOutEvents": []
        }

    return obj
}

function createEmployeeRecords(array){
    let employees = []
    array.forEach(function(element){
        employees.push(createEmployeeRecord(element))
    })

    return employees
}

function createTimeInEvent(date){

    let inHour = parseInt(date.slice(11))
    let inDate = date.slice(0,10)

    let obj = {
        "type": "TimeIn",
        "hour": inHour,
        "date": inDate
    }

    this.timeInEvents.push(obj)

    return this
}

function createTimeOutEvent(date){

    let outHour = parseInt(date.slice(11))
    let outDate = date.slice(0,10)

    let obj = {
        "type": "TimeOut",
        "hour": outHour,
        "date": outDate
    }

    this.timeOutEvents.push(obj)

    return this
}

function hoursWorkedOnDate(date){

    let foundInTime = this.timeInEvents.find(function(f){
        if(f.date === date){
            return f
        }
    })

    let foundOutTime = this.timeOutEvents.find(function(f){
        if(f.date === date){
            return f
        }
    })

    return (foundOutTime.hour - foundInTime.hour) / 100

    //let inTime = this.timeInEvents.map(function(t){
    //    if(t.date === date){
    //        return t.hour
    //    }
    //}).reduce((a, b) => a + b, 0)

    //let outTime = this.timeOutEvents.map(function(t){
    //    if(t.date === date){
    //        return t.hour
    //    }
    //}).reduce((a, b) => a + b, 0)

    //return (outTime - inTime) / 100 
}

function wagesEarnedOnDate(date){

    let payPerHour = this.payPerHour

    let hours = hoursWorkedOnDate.call(this, date)

    return (payPerHour * hours)

}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {

    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(collection, firstNameString){

    let firstName = collection.map(function(f){
        return f.firstName
    })

    let match = firstName.find(function(m){
        return m === firstNameString
    })

    let record = collection.find(function(r){
        return r.firstName === match
    })

    return record
}

function calculatePayroll(array){

    let total = array.reduce(function(c, t){
        return c + allWagesFor.call(t)
    }, 0)

    console.log(total)

    return total
}