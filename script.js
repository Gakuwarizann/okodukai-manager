//変数の宣言

let wallet = 0;
let chest = 0;
let craftBudget = 0;
let gajeBudget = 0;
let otherBudget = 4000;
let craftBudgetLeft = 0;
let gajeBudgetLeft = 0;


//ページを開き直した後、ローカルストレージからデータを復元
window.addEventListener("load", function () {
    wallet = Number(localStorage.getItem("wallet")) || 0;
    chest  = Number(localStorage.getItem("chest"))  || 0;
    craftBudget  = Number(localStorage.getItem("craftB"))  || 0;
    gajeBudget  = Number(localStorage.getItem("gajeB"))  || 0;
    otherBudget = 4000 - craftBudget - gajeBudget;

    craftBudgetLeft = Number(localStorage.getItem("craftBLeft"))  || 0;
    gajeBudgetLeft = Number(localStorage.getItem("gajeBLeft"))  || 0;
    textKoushin();
});





function textKoushin(){
    let all = wallet + chest;

    //財布残高をテキストに反映
    let walletText = document.getElementById("walletZandaka").textContent;
    document.getElementById("walletZandaka").textContent = (wallet  + "円");

    //チェスト残高をテキストに反映
    let chestText = document.getElementById("chestZandaka").textContent;
    document.getElementById("chestZandaka").textContent = (chest  + "円");

    //全残高をテキストに反映
    let allText = document.getElementById("allMoney").textContent;
    document.getElementById("allMoney").textContent = (all  + "円");

    //手芸予算をテキストに反映
    document.getElementById("craftBudget").textContent = (craftBudget + "円");

    //ガジェット予算をテキストに反映
    document.getElementById("gajeBudget").textContent = (gajeBudget + "円");

    //その他の予算をテキストに反映
    document.getElementById("otherBudget").textContent = (otherBudget + "円");
      
    //残り手芸予算をテキストに反映
    document.getElementById("craftBudgetLeft").textContent = (craftBudgetLeft + "円");
  
    //残りガジェと予算をテキストに反映
    document.getElementById("gajeBudgetLeft").textContent = (gajeBudgetLeft + "円");

}





textKoushin();

function kiroku(){
    let pay = document.getElementById("pay");
    let chestOrWallet = document.getElementById("chestOrWallet");
    let payWay = document.getElementById("payWay");
    if (Number(pay.value) >= 0 ){
     if ((chestOrWallet.value) == "タンス"){
         chest = chest - Number(pay.value);    
     } else {
         wallet = wallet - Number(pay.value);
     }

     if ((payWay.value) == "手芸"){
         craftBudgetLeft = craftBudgetLeft - Number(pay.value);
     }else if ((payWay.value) == "ガジェット"){
          gajeBudgetLeft = gajeBudgetLeft - Number(pay.value);
      }
    }else{
        alert("マイナスの金額は 入力できないヨ！");
    }

    localStorage.setItem("chest", chest); 
    localStorage.setItem("wallet", wallet);

    localStorage.setItem("craftBLeft", craftBudgetLeft); 
    localStorage.setItem("gajeBleft", gajeBudgetLeft);

    textKoushin();
    //alert("記録しました");
}

let okButton = document.getElementById("okButton");
okButton.addEventListener("click",kiroku);
okButton.addEventListener("click",textKoushin);


function incomeKiroku(){
    let income = document.getElementById("income");
    let chestOrWallet_income = document.getElementById("chestOrWallet_income")
    if (Number(income.value) >= 0){
        if ((chestOrWallet_income.value)== "タンス"){
            chest = chest + Number(income.value);
        } else {
         wallet = wallet + Number(income.value);
        }
    }else{
        alert("マイナスの金額は 入力できないヨ！");
    }
    localStorage.setItem("chest", chest); 
    localStorage.setItem("wallet", wallet);

    textKoushin();
    //alert("記録しました");
}


let okButton_income = document.getElementById("okButton_income");
okButton_income.addEventListener("click",incomeKiroku);



function budgetKiroku(){
    let budget = document.getElementById("budget");
    let budgetWay = document.getElementById("budgetWay");
    if ((budget.value)>= 0){
        if ((budgetWay.value)== "手芸"){
          craftBudget = budget.value;
           craftBudgetLeft = craftBudget;
        } else if ((budgetWay.value)== "ガジェット"){
         gajeBudget = budget.value;
         gajeBudgetLeft = gajeBudget;
        }
    }else{
        alert("マイナスの金額は 入力できないヨ！");
    }
    localStorage.setItem("craftB",craftBudget)
    localStorage.setItem("gajeB",gajeBudget)
    otherBudget = 4000 - craftBudget - gajeBudget;
    textKoushin();
}

let budgetOk = document.getElementById("budgetOk");
budgetOk.addEventListener("click",budgetKiroku);


function everyMonthReset(){
    craftBudgetLeft = craftBudget;
    gajeBudgetLeft = gajeBudget;
    textKoushin();
}

function exportData(){
    let json = JSON.stringify(saveData);
    let blob = new Blob([json], { type: "application/json" });

    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "okodukai_backup.json";
    a.click();
}

function dlJSON(){
    let saveData = {
        "wallet": wallet,
        "chest": chest,
        "craftBudget": craftBudget,
        "gajeBudget": gajeBudget,
        "craftBudgetLeft": craftBudgetLeft,
        "gajeBudgetLeft": gajeBudgetLeft
    };

    exportData();
}


let downloadJSON = document.getElementById("downloadJSON");
downloadJSON.addEventListener("click",dlJSON)

function yomikomi(){
    let fileInput = document.getElementById("importFile");
    let file = fileInput.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(){
        let data = JSON.parse(reader.result);

        wallet = Number(data.wallet) || 0;
        chest  = Number(data.chest)  || 0;

        textKoushin();
    };

    reader.readAsText(file);
}





let importButton= document.getElementById("inportButton");
importButton.addEventListener(click,yomikomi);



let monthReset = document.getElementById("monthReset");
monthReset.addEventListener("click",everyMonthReset);


function kesuyo(){
    let noRegret = prompt("ローカルストレージ内のデータを本当に消したいなら、「消します」と入力してください。")
    if (noRegret == "消します"){
        localStorage.clear();
        location.reload();
    }
}

let deleteButton = document.getElementById("kesukai");
deleteButton.addEventListener("click",kesuyo)


