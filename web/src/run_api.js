const api_origin = "http://localhost:3001";

var prices = [{"name": "", "id": 1, "price": 0}]; // dummy

const table_header = [
    "Id",
    "Name",
    "Price",
];

function createPriceTable() {
    console.log("Creating table: raw=%d", prices.length);
    var table = document.createElement('table');
    var tr = document.createElement('tr');
    for (var j = 0; j < table_header.length; j++) {
        // create header raw
        var th = document.createElement('th');
        th.textContent = table_header[j];
        tr.appendChild(th);
    }
    table.appendChild(tr);
    for (var i = 0; i < prices.length; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < table_header.length; j++) {
        // create data raws
        var td = document.createElement('td'); 
        switch (j) {
        case 0:
            td.textContent = prices[i].id;
            break;
        case 1:
            td.textContent = prices[i].name;
            break;
        case 2:
            td.textContent = prices[i].price;
            break;
        default:
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    document.getElementById('pricetable').appendChild(table);
}

async function callApi() {
    const res = await fetch(api_origin + "/fruit/prices");
    return await res.json();
}

async function callPostApi(name, price) {
    const data = {
        "name": name,
        "price": price,
    };
    const res = await fetch(api_origin + "/fruit/prices", 
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });
    return await res.json();
}

function buttonClick() {
    //check input form
    const name = priceform.fruit_name.value;
    const price = priceform.fruit_price.value;
    if (name === "" || price === "") return;
    //call POST API
    callPostApi(name, price).then (result => {
        prices = result;
        // append price data to the last
        const table_div = document.getElementById('pricetable');
        const table = table_div.childNodes[1]; // <table />
        const tr = document.createElement('tr');
        for (var i = 0; i < table_header.length; i++) {
            const td = document.createElement('td');
            switch (i) {
            case 0: td.textContent = prices.length; break;
            case 1: td.textContent = name; break;
            case 2: td.textContent = price; break;
            default:
            }
            tr.appendChild(td);    
        }
        table.appendChild(tr);
    });
}

document.getElementById("addone").addEventListener('click', buttonClick);

console.log("calling api...");
callApi().then(result => {
    prices = result;
    createPriceTable();
});
