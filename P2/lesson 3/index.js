function calInterest(income, yearlyRate, year) {
    let curBalance = 0;
    const monthlyRate = yearlyRate / 12;
    const totalPeriod = year * 12;
    curBalance = income * ((Math.pow(1 + monthlyRate, totalPeriod) - 1) / monthlyRate);
    return curBalance;
}


function calRent(loan = 3000000, yearlyInterest = 0.035, periods = 20) {
    let curBalance = loan;
    let totalInterest = 0;
    const totalPeriod = periods * 12;
    const monthlyInterest = yearlyInterest / 12;
    const principal = loan / totalPeriod;

    for (let i = 1; i <= totalPeriod; i++) {
        let interest = Math.round(curBalance * monthlyInterest);
        totalInterest += interest;
        console.log(`第 ${i} 個月，還本金 ${principal}，利息 ${interest}，合共 ${principal + interest}`)
        curBalance -= principal;
    }
    console.log(`共還利息 ${totalInterest}`)
}