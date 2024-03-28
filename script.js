let values = document.querySelectorAll("input[type=text]")
let calculateBtn = document.querySelector("#calculate")
let boxes = document.querySelectorAll(".box")
let table = document.querySelector("#result")
let resultTable = document.querySelector("tbody");

let cashInSystem = document.querySelector("#system-cash")

let line = document.querySelector("#line")

let denominationSum = [];

let createTable = document.createElement("table");
let differenceTable = document.createElement("table");
let div = document.createElement("div")


window.addEventListener("load", (event)=>{
    values.forEach(element => {
            element.value = "";
    })
})
calculateBtn.addEventListener("click", ()=>{
    //deletes table if another calculation is being made
    resultTable.innerHTML = ""
    createTable.innerHTML = ""
    differenceTable.innerHTML = ""

    boxes.forEach(element =>{
        let tableRow = document.createElement("tr");
            //denomination
        let denomination = Number(element.innerText);
            //how many denominations there are, picks out input value
        let denominationCount = Math.floor(Number(element.children["1"].value))
            //get value of each denomination and its count
        let totalOfDenomination = (denomination * denominationCount)

        if(!isNaN(denominationCount)){
            if(denominationCount !== 0){
            resultTable.appendChild(tableRow);
                for(let i = 0; i < 3; i++){
                        let tableData = document.createElement("td");
                        tableRow.appendChild(tableData);
                        switch(i){
                            case 0:
                                tableData.innerText = `${denomination} € ×`
                                break;
                            case 1:
                                tableData.innerText = `${denominationCount}`
                                break;
                            case 2:
                                tableData.innerText = `= ${totalOfDenomination.toFixed(2)}`
                                break;
                        }
                    }
                denominationSum.push(totalOfDenomination);
            }
        }

    })

    table.classList.remove("hidden")

    //calculate sum
    let totalSum = denominationSum.reduce((total, member) => {return total + member}).toFixed(2);
    
    //draw line
    line.innerHTML = `<hr>`
    
    let tableHead = document.createElement("thead");
    let tableBody = document.createElement("tbody");
    let tableHeadHead = document.createElement("th");
    let textTableRow = document.createElement("tr");

    
    table.appendChild(div)
    div.appendChild(createTable)

    createTable.classList.add("sum-table")
    //add header
    createTable.appendChild(tableHead)
    tableHead.appendChild(textTableRow);
    tableHead.style.textAlign = "right"
    textTableRow.appendChild(tableHeadHead)
    tableHeadHead.innerText = `Grynųjų kasoje`
    createTable.appendChild(tableBody)

    if(cashInSystem.value !== "" && !isNaN(cashInSystem.value)){
        div.classList.add("differenceContainer")

        div.appendChild(differenceTable)
        differenceTable.classList.add("differenceTable")

        let tableHeadDifference = document.createElement("thead");
        let tableBodyDifference = document.createElement("tbody");
        let tableHeadHeadDifference = document.createElement("th");
        let textTableRowDifference = document.createElement("tr");

        //head
        differenceTable.appendChild(tableHeadDifference)
        tableHeadDifference.appendChild(textTableRowDifference);
        tableHeadDifference.appendChild(tableHeadHeadDifference);
        tableHeadDifference.style.textAlign = "right"
        tableHeadHeadDifference.innerText = "Skirtumas"
        //body
        differenceTable.appendChild(tableBodyDifference)

        //"ATIMTI SUMA IS TO, KAS YRA KASOJE. JEIGU DAUGIAU NEI 0, PARASYTI PLIUSAS TIEK IR TIEK, JEI MAIAU NEI 0, PARASYTI MINUSAS TIEK IR TIEK"


            for(let i = 0; i < 3; i++){
                let rowDifference = document.createElement("tr");
                let dataDifference = document.createElement("td");
                tableBodyDifference.appendChild(rowDifference)
                rowDifference.appendChild(dataDifference)
                dataDifference.classList.add("eachDenominationSum")
                switch(i){
                    case 0:
                        dataDifference.innerHTML = `Kasoje: <strong>${totalSum}€ </strong>`
                        break;
                    case 1:
                        dataDifference.innerHTML = `Sistemoje: <strong> ${cashInSystem.value}€ </strong>`
                        break;
                    case 2:
                        let result = totalSum - cashInSystem.value;
                        if(result > 0){
                            dataDifference.innerHTML = `<span style="color: green;">Pliusas: </span> <strong> ${result.toFixed(2)}€ </strong>`
                        }
                        else{
                            dataDifference.innerHTML = `<span style="color: red;">Minusas: </span> <strong> ${result.toFixed(2)} €</strong>`
                        }
                        break;
                }
            }    
    }else{
        createTable.style.margin = "auto"
    }


    let counter = 0;
    denominationSum.forEach(element =>{
        counter++;
        const lenghtOfSums = denominationSum.length;

        if(element !== 0){
            let row = document.createElement("tr");
            let data = document.createElement("td");
            tableBody.appendChild(row)
            row.appendChild(data);
            data.classList.add("eachDenominationSum")
            //add plus to the last member and show sum with equals symbol
            if(counter === lenghtOfSums){
                data.innerHTML = `+  ${element.toFixed(2)} <hr> <strong> = ${totalSum} </strong>`
            }else{
                data.innerText = `${element.toFixed(2)}`
            }
        }
    })
    //empty array containing all values
    denominationSum = [];

    values.forEach(element => {
        element.value = "";
    })
    cashInSystem.value = "";
})
