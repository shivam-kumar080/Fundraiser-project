

function updateAll(){
    connectBank()
    previousBank()
    donate2()    
}


var message = document.getElementById('message');
var pathName = window.location.search;
var array1 = pathName.split("=");
var array2 = array1[1];
var array = array2.split("&");
var handle = array[0];
var arr = window.location.href;
var autharr = arr.split("auth=");
var auth = autharr[1];
var purchaseCount = 3;
var currentId = "";

if(auth==null)
{
    window.location.href = '/loginPage.html';
}

var btn = document.getElementById('send');
var output = document.getElementById('output');


socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle+':</strong>'+ data.message +'</p>';
})

function changeText(id){
    document.getElementById("mainName").innerHTML = id;
    document.getElementById("left-title-show").innerHTML = id;
    currentId = id;

    if(id=="World Wildlife Fund"){
        document.getElementById("quickSearch").innerHTML = "In the field of wilderness preservation, and the reduction of human impact on the environment.";
    }else if(id=="Defenders of Wildlife"){
        document.getElementById("quickSearch").innerHTML = "Its mission is to protect all native animals and plants throughout North America.";
    }else if(id=="National Forest Foundation"){
        document.getElementById("quickSearch").innerHTML = "Ensure a sustainable future for the many resources our National Forests and Grasslands provide to us all.";
    }else if(id="St. Jude Children Hospital"){
        document.getElementById("quickSearch").innerHTML = "St. Jude treats the toughest childhood cancers and pediatric diseases.";
    }

}

function previousBank(){
    var obj = {}

    try{
    obj.balance=document.getElementById('balance').value;
    }catch(err){console.log("Bad Balance");}     
    var pathName = window.location.search;
    var array1 = pathName.split("=");
    var array2 = array1[1];
    var array = array2.split("&");
    obj.username = array[0];
    obj.auth = auth;
    obj.purchaseCount = purchaseCount;

    $.ajax({
            type: 'POST',
            url: 'http://54.183.150.24:80/previousBank',
            data: JSON.stringify(obj),
            contentType: "application/json"
        })
        .done(function(data) {
            var dt = new Date();
            var utcDate = dt.toUTCString();

            var path = JSON.stringify(data).replace(/\}/g,'').replace(/\]/g,'').replace(/\[/g,'').replace(/}/g,'').replace(/{/g,'').replace(/\"/g,'').replace(/Cost:/g,'').replace(/Name:/g,'');
            var array = path.split(",");

            console.log(array);
            $('#bankList').empty();
            for(var i=0; i<array.length-2;i+=2){
                $("#bankList").prepend('<p style="font-weight: 700; font-size: 10px; float: left;"> '+array[i+1] +'</p>'+ '<p style="font-weight: 300; font-size: 10px; float: right">  $ ' + array[i]+ '</p><br><br>');
            }
            purchaseCount++;
            
        })
        .fail(function(data) {
            if(JSON.stringify(data).includes("Log Out"))
            {
                window.location.href = '/loginPage.html';
            }
            console.log("Failed" + JSON.stringify(data));
        });
}


function searchPage(){
    var pathName = window.location.search;
    var array1 = pathName.split("=");
    var array2 = array1[1];
    var array = array2.split("&");
    var username = array[0];
    window.location.href = '/queryPage.html?user='+username+'&auth='+auth;
}

function paymentPage(){
    var pathName = window.location.search;
    var array1 = pathName.split("=");
    var array2 = array1[1];
    var array = array2.split("&");
    var username = array[0];
    window.location.href = '/payment.html?user='+username+'&auth='+auth;
}

function chatPage(){
    var pathName = window.location.search;
    var array1 = pathName.split("=");
    var array2 = array1[1];
    var array = array2.split("&");
    var username = array[0];
    window.location.href = '/indexChat.html?user='+username+'&auth='+auth;
}

function homePage(){
    var pathName = window.location.search;
    var array1 = pathName.split("=");
    var array2 = array1[1];
    var array = array2.split("&");
    var username = array[0];
    window.location.href = '/index.html?user='+username+'&auth='+auth;
}

function logout(){
    window.location.href = '/loginPage.html';
}

function updateBalance() {
    var obj = {}
    try{
    obj.balance=document.getElementById('balance').value;
    }catch(err){console.log("Bad Balance");}     
    var pathName = window.location.search;
    var array1 = pathName.split("=");
    var array2 = array1[1];
    var array = array2.split("&");
    obj.username = array[0];
    obj.auth = auth;

    $.ajax({
            type: 'POST',
            url: 'http://54.183.150.24:80/updateBalance',
            data: JSON.stringify(obj),
            contentType: "application/json"
        })
        .done(function(data) {
            var path = JSON.stringify(data).replace('}','').replace(']','');
            var array = path.split(":");
            var amount = parseFloat(JSON.stringify(array[1]).replace(/\"/g,''));
            var amount2 = amount.toFixed(2);
            document.getElementById("balance").innerHTML='$'+amount2;
            console.log(JSON.stringify(obj));
        })
        .fail(function(data) {
            if(JSON.stringify(data).includes("Log Out"))
            {
                window.location.href = '/loginPage.html';
            }
            console.log("Failed" + JSON.stringify(data));
            console.log(data);
        });
        connectBank = function(){};
}

function spend() {
    var obj = {}
    try{
    obj.balance=document.getElementById('balance').value;
    }catch(err){console.log("Bad Balance");}     
    var pathName = window.location.search;
    var array1 = pathName.split("=");
    var array2 = array1[1];
    var array = array2.split("&");
    obj.username = array[0];
    obj.auth = auth;

    $.ajax({
            type: 'POST',
            url: 'http://54.183.150.24:80/spend',
            data: JSON.stringify(obj),
            contentType: "application/json"
        })
        .done(function(data) {
            var path = JSON.stringify(data).replace('}','').replace(']','');
            var array = path.split(":");
            var amount = parseFloat(JSON.stringify(array[1]).replace(/\"/g,''));
            var amount2 = amount.toFixed(2);
            document.getElementById("balance").innerHTML='$'+amount2;
            console.log(JSON.stringify(obj));
            previousBank();
        })
        .fail(function(data) {
            if(JSON.stringify(data).includes("Log Out"))
            {
                window.location.href = '/loginPage.html';
            }
            console.log("Failed" + JSON.stringify(data));
            console.log(data);
        });
        connectBank = function(){};
}



function connectBank() {
    var obj = {}
    obj.balance=String((Math.random()*1000.00).toFixed(2));
    var pathName = window.location.search;
    var array1 = pathName.split("=");
    var array2 = array1[1];
    var array = array2.split("&");
    obj.username = array[0];
    obj.auth = auth;
    try{
    obj.bankAccount = document.getElementById('bankAccount').value;
    }catch(err){document.getElementById("balance").innerHTML = 'Try Again';}
    $.ajax({
            type: 'POST',
            url: 'http://54.183.150.24:80/connectToBank',
            data: JSON.stringify(obj),
            contentType: "application/json"
        })
        .done(function(data) {
            console.log(JSON.stringify(obj));
            var newBalance = JSON.stringify(data);
            var array = newBalance.split("\"");
            document.getElementById("balance").innerHTML='$'+array;
            document.getElementById("connect").style.display = 'none';
            document.getElementById("spend").style.display = 'block';
            console.log(JSON.stringify(obj));
            document.getElementById("donatediv").style.display = 'block';
            document.getElementById("balanceBar").style.display = 'none';
            document.getElementById("balanceBar2").style.display = 'flex';
        })
        .fail(function(data) {
            if(JSON.stringify(data).includes("Log Out"))
            {
                window.location.href = '/loginPage.html';
            }
            console.log("Failed");
            console.log(JSON.stringify(data));
        });
        connectBank = function(){};
}

function donate() {
    var obj = {}
    try{
    var arr = (document.getElementById('balance').innerHTML).split(".");
    obj.cents="."+ arr[1];
    }catch(err){console.log("Bad Balance");}     
    var pathName = window.location.search;
    var array1 = pathName.split("=");
    var array2 = array1[1];
    var array = array2.split("&");
    obj.username = array[0];
    obj.auth = auth;
    obj.charityName=currentId;

    $.ajax({
            type: 'POST',
            url: 'http://54.183.150.24:80/donate',
            data: JSON.stringify(obj),
            contentType: "application/json"
        })
        .done(function(data) {
            updateBalance();
            console.log(JSON.stringify(obj));
            var dt = new Date();
            var utcDate = dt.toUTCString();
            $("#historylist").prepend('<u>'+currentId +'</u>'+ '<br><span style="font-weight: 300">' + 'Amount: $' + obj.cents+ '<br> <span style="font-size:10px;">' + utcDate + '</span></span><br><br>');
            document.getElementById("countDonates").innerHTML='$+'+parseFloat(data).toFixed(2)+' Donated'
        })
        .fail(function(data) {
            if(JSON.stringify(data).includes("Log Out"))
            {
                window.location.href = '/loginPage.html';
            }
            console.log("Failed" + JSON.stringify(obj) + document.getElementById('balance').innerHTML + JSON.stringify(data));
            console.log(data);
        });
        connectBank = function(){};
}

function donate2() {
    var obj = {}
    try{
    var arr = (document.getElementById('balance').innerHTML).split(".");
    obj.cents="."+ arr[1];
    }catch(err){console.log("Bad Balance");}     
    var pathName = window.location.search;
    var array1 = pathName.split("=");
    var array2 = array1[1];
    var array = array2.split("&");
    obj.username = array[0];
    obj.auth = auth;
    obj.charityName=document.getElementById('charityName').value

    $.ajax({
            type: 'POST',
            url: 'http://54.183.150.24:80/donate',
            data: JSON.stringify(obj),
            contentType: "application/json"
        })
        .done(function(data) {
            console.log(JSON.stringify(obj));
            var dt = new Date();
            var utcDate = dt.toUTCString();
            document.getElementById("countDonates").innerHTML='$+'+parseFloat(data).toFixed(2)+' Donated'
        })
        .fail(function(data) {
            if(JSON.stringify(data).includes("Log Out"))
            {
                window.location.href = '/loginPage.html';
            }
            console.log("Failed" + JSON.stringify(obj) + document.getElementById('balance').innerHTML + JSON.stringify(data));
            console.log(data);
        });
        connectBank = function(){};
}




function quickSearch() {
        var obj = {}
        obj.charityName=document.getElementById('charityName').value
        obj.auth = auth;
        obj.username = handle;
        $.ajax({
            type: 'POST',
            url: 'http://54.183.150.24:80/quickSearch',
            data: JSON.stringify(obj),
            contentType: "application/json"
        })
        .done(function(data) {
            console.log(JSON.stringify(obj));
            var pathName = JSON.stringify(data);
            var array = pathName.split("\"");
            var amount = parseFloat(array[2].substring(1).replace(',','')).toFixed(2);
            try{
            document.getElementById("quickSearch").innerHTML =  array[3] + ': ' + array[5] + '<br>' + array[1] + ': $' + String(amount) + '<br>' + array[7] + ': ' + array[8].substring(1).replace('}','').replace(']','');}
            catch(err)
            {document.getElementById("quickSearch").innerHTML = 'Try Again';}
            console.log(data);
        })
        .fail(function(data) {
            if(JSON.stringify(data).includes("Log Out"))
            {
                window.location.href = '/loginPage.html';
            }
            console.log(JSON.stringify(data));
        });
    }

function addCharity() {
        var obj = {}
        obj.charityName=currentId;
        obj.auth = auth;
        var pathName = window.location.search;
        var array1 = pathName.split("=");
        var array2 = array1[1];
        var array = array2.split("&");
        obj.username = array[0];
        $.ajax({
            type: 'POST',
            url: 'http://54.183.150.24:80/addCharity',
            data: JSON.stringify(obj),
            contentType: "application/json"
        })
        .done(function(data) {
            console.log(JSON.stringify(obj));
            var pathName = JSON.stringify(data);
            var array = pathName.split("\"");
            document.getElementById("addCharity").innerHTML =  'Successfully Added ' + array[7] + ' Charity To ' + array[11] +'\'s Subscribe List';
        })
        .fail(function(data) {
            if(JSON.stringify(data).includes("Log Out"))
            {
                window.location.href = '/loginPage.html';
            }
            document.getElementById("addCharity").innerHTML = 'Already Added to Subscribe List';
            console.log(JSON.stringify(obj));
        });
    }

function removeCharity() {
        var obj = {}
        obj.charityName=currentId;
        var pathName = window.location.search;
        var array1 = pathName.split("=");
        var array2 = array1[1];
        var array = array2.split("&");
        obj.username = array[0];
        obj.auth = auth;
        $.ajax({
            type: 'POST',
            url: 'http://54.183.150.24:80/removeCharity',
            data: JSON.stringify(obj),
            contentType: "application/json"
        })
        .done(function(data) {
            console.log(JSON.stringify(obj));
            var pathName = JSON.stringify(data);
            var array = pathName.split("\"");
            document.getElementById("addCharity").innerHTML =  'Successfully Deleted ' + array[7] + ' Charity To ' + array[11] +'\'s Subscribe List';
        })
        .fail(function(data) {
            if(JSON.stringify(data).includes("Log Out"))
            {
                window.location.href = '/loginPage.html';
            }
            document.getElementById("addCharity").innerHTML = 'Try Again';
            console.log(JSON.stringify(obj));
        });
    }


    var stripe = Stripe('pk_test_QFNaDOXASUpwFKo16hntJiH200yS0N0aT0');
    var elements = stripe.elements();

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      stripe.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the customer that there was an error.
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          stripeTokenHandler(result.token);
        }
      });
    });

    function stripeTokenHandler(token) {
      // Insert the token ID into the form so it gets submitted to the server
      var form = document.getElementById('payment-form');
      var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);

      var obj = {}
      obj.token = token.id;
      $.ajax({
            type: 'POST',
            url: 'http://54.183.150.24:80/payment',
            data: JSON.stringify(obj),
            contentType: "application/json"
        })
        .done(function(data) {
            console.log(JSON.stringify(data));
            
        })
        .fail(function(data) {
            console.log(data);
        });
    }


    function payment() {
        var obj = {}
        obj.username=document.getElementById('username').value
        obj.password=document.getElementById('password').value
        $.ajax({
            type: 'POST',
            url: 'http://54.183.150.24:80/payment',
            data: JSON.stringify(obj),
            contentType: "application/json"
        })
        .done(function(data) {
            var arr = JSON.stringify(data).replace(/}/g,'').replace(/]/g,'').replace(/{/g,'').replace(/\[/g,'').replace(/\\/g,'').replace(/"/g,'');
            var split = arr.split(':');
            console.log(JSON.stringify(data));
            
        })
        .fail(function(data) {
            document.getElementById("list").innerHTML = "Wrong Username/Password. Try Again.";
            console.log(data);
        });
    }

    // Custom styling can be passed to options when creating an Element.
    var style = {
      base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        color: '#32325d',
      },
    };

    // Create an instance of the card Element.
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');

