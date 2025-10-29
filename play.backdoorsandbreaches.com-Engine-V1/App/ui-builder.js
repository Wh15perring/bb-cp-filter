// VERSION*/
// B&B - Engine.UB.1.0
//


var forAddOnEnabled = false;

$( "#forAddOn" ).on( "click", function() {

    // Assuming you have a checkbox element with the ID 'myCheckbox'
var isChecked = $('#forAddOn').prop('checked');

    if (isChecked) {
        // Checkbox is checked
        console.log('for Add On is checked.');
        forAddOnEnabled = true;
    } 
    else {
        forAddOnEnabled = false;
        console.log('for Add On is not checked.');
    }
    
        

  });

//TOGGLE FUNCTIONS
remprocs = Object.assign([], proc);
function customtoggle() {

  var x = document.getElementById("builder");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  //Check if we have add-on scenarios
  if (hasAddOns == true)
  {
    $("#forAddOn").show();
    $("#forAddOnLabel").show();
  }
  else
  {
    $("#forAddOn").hide();
    $("#forAddOnLabel").hide();
  }


}

menus = ["ic","pv","c2","ps","proc","start"]

function boxtoggle(a) {
  menus.forEach(function(b, i){
  if(b!=a){
    var x = document.getElementById(b);
    x.style.display = "none";
  }else{

  var x = document.getElementById(a);
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }

  }
 });
}




//Card Selectors
function buildprocmenu(){
    if (remprocs.length==0){remprocs = Object.assign([], proc);}
    console.log("Procedure List:");
    console.log(remprocs);

    //Card Selectors
    document.getElementById("proc").innerHTML = "";
    remprocs.forEach(buildselector);

    function buildselector(card, i){
        //console.log(i)
        cardtile = card

        //change style to fit box
        cardtile = cardtile.replace("'procimg'", "'procimgbuild'");
        cardtile = cardtile.replace("<a ","<a onclick='return false;' ")
        cardtile = cardtile.replace("data-lightbox","data")

        //console.log(card)
        //create containing div
        cdv = "<div id='proc_"+i+"' onclick='chooseproc(this.id, this);'>"+cardtile+"</div>"
        document.getElementById("proc").innerHTML += cdv;
    };
}

function buildscenemenu(s){

    //Card Selectors
    document.getElementById(s).innerHTML = "";

    if (s=='ic'){ init.forEach(buildselector); }
    if (s=='pv'){ pivot.forEach(buildselector); }
    if (s=='c2'){ c2.forEach(buildselector); }
    if (s=='ps'){ persist.forEach(buildselector); }


    function buildselector(card, i){
        //console.log(i)
        cardtile = card


        //change style to fit box
        cardtile = cardtile.replace("'scenimg'", "'scenimgbuild'");
        cardtile = cardtile.replace("<a ","<a onclick='return false;' ")
        cardtile = cardtile.replace("data-lightbox","data")

        //console.log(card)
        //create containing div
        cdv = "<div id='"+s+"_"+i+"' onclick='choose(this.id, this);'>"+cardtile+"</div>"
        document.getElementById(s).innerHTML += cdv;
    };
}

function buildinjmenu(){
    

    //Card Selectors
    document.getElementById("start").innerHTML = "";
    ins.forEach(buildselector);

    function buildselector(card, i){
        //console.log(i)
        cardtile = card


        //change style to fit box
        cardtile = cardtile.replace("<a ","<a onclick='return false;' ")
        cardtile = cardtile.replace("data-lightbox","data")

        //console.log(card)
        //create containing div
        cdv = "<div id='inj_"+i+"' onclick='chooseinj(this.id, this);'>"+cardtile+"</div>"
        document.getElementById("start").innerHTML += cdv;
    };
}

custom = [0,0,0,0]

function choose(id,contents) {
    console.log(id);
    

    //fix lightbox and formatting
    card = contents.innerHTML;
    swap = card.replace("scenimgbuild", "scenimg");
    swap = swap.replace("return false;","")
    swap = swap.replace("data","data-lightbox")
    //console.log(swap);
    
    if (id.includes("ic")) {
        
        //Here, we need to check if we are selecting for the add-on, or the main deck.
        if (forAddOnEnabled)
        {
            addICCustom(swap);
        }
        else
        {
            document.getElementById("a").innerHTML = swap;
            document.getElementById("dma").innerHTML = swap;
            //boxtoggle('ic');
            idx=id.replace("ic_","")
            reminit=init.slice();
            reminit.splice(idx, 1);
            custom.splice(0,1,id)
        }
        


    }
    if (id.includes("pv")) {
        if (forAddOnEnabled)
        {
            addPECustom(swap);
        }
        else
        {
            document.getElementById("b").innerHTML = swap;
            document.getElementById("dmb").innerHTML = swap;
            //boxtoggle('pv');
            idx=id.replace("pv_","")
            rempivot=pivot.slice();
            rempivot.splice(idx, 1);
            custom.splice(1,1,id)
        }
        


    }
    if (id.includes("c2")) {

        if (forAddOnEnabled)
        {
            addCECustom(swap);
        }
        else
        {
            document.getElementById("c").innerHTML = swap;
            document.getElementById("dmc").innerHTML = swap;
            //boxtoggle('c2');
            idx=id.replace("c2_","")
            remc2=c2.slice();
            remc2.splice(idx, 1);
            custom.splice(2,1,id)
        }
        


    }
    if (id.includes("ps")) {
        if (forAddOnEnabled)
        {
            addPERCustom(swap);
        }
        else
        {
            document.getElementById("d").innerHTML = swap;
            document.getElementById("dmd").innerHTML = swap;
            //boxtoggle('ps');
            idx=id.replace("ps_","")
            rempersist=persist.slice();
            rempersist.splice(idx, 1);
            custom.splice(3,1,id)
        }
    }
return false;
}

function chooseinj(id,contents) {
    console.log(id);

    

    //fix lightbox and formatting
    card = contents.innerHTML;
    swap = card.replace("scenimgbuild", "scenimg");
    swap = swap.replace("return false;","")
    swap = swap.replace("data","data-lightbox")
    //console.log(swap);

    document.getElementById("injectbox").innerHTML = swap;
    document.getElementById("injectbox").innerHTML += "<button id='clearcon' onclick='clearcondition()'> Clear Starting Condition </button>";

    console.clear();
    randins = Object.assign([], ins);
    idx = id.replace("inj_","")
    console.log(idx)

    console.log("Inject Pool:");
    console.log(ins);

    console.log("Chosen Inject:");
    console.log(randins[idx]);

    console.log("Remaining Inject:");
    randins.splice(idx, 1);
    console.log(randins);

    shuffle(randins);
    //boxtoggle('start');

return false;
}

//used for checking the addon. Not sure we need this at all...
function checkaddon(){
    addonbuttons = document.querySelectorAll('.addonbutt').forEach(el => {
        el.style.display = 'inline';
        el.style.color = 'blue';
    });
}

//clear add-ons functions
function clear_ic() {
    document.getElementById("addIC").innerHTML = ""
    document.getElementById("solIC").innerHTML = ""
    IC = 0
    buttIC.style.display = "inline";
    clearIC.style.display = "none";
    shuffle(reminit);
}

function clear_pe() {
    document.getElementById("addPE").innerHTML = ""
    document.getElementById("solPE").innerHTML = ""
    PE = 0
    buttPE.style.display = "inline";
    clearPE.style.display = "none";
    shuffle(rempivot);
}

function clear_ce() {
    document.getElementById("addCE").innerHTML = ""
    document.getElementById("solCE").innerHTML = ""
    CE = 0
    buttCE.style.display = "inline";
    clearCE.style.display = "none";
    shuffle(remc2);
}

function clear_per() {
    document.getElementById("addPER").innerHTML = ""
    document.getElementById("solPER").innerHTML = ""
    PER = 0
    buttPER.style.display = "inline";
    clearPER.style.display = "none";
    shuffle(rempersist);
}

chosenprocs=[]
function chooseproc(id,contents) {
    console.log(id);

    //fix lightbox and formatting
    card = contents.innerHTML;
    swap = card.replace("scenimgbuild", "scenimg");
    swap = swap.replace("return false;","")
    swap = swap.replace("data","data-lightbox")
    console.log(swap);

    //document.getElementById("injectbox").innerHTML = swap;

    console.clear();
    idx = id.replace("proc_","")
    console.log(idx)

    console.log("Proc Pool:");
    console.log(remprocs);

    console.log("Selected Proc:");
    console.log(remprocs[idx]);

    if (chosenprocs.length <= 4)
    {
        console.clear();
        console.log("Chosen Procedures:");
        chosenprocs.push(remprocs[idx]);
        console.log(chosenprocs);

        console.log("Remaining Procedures:");
        remprocs.splice(idx, 1);
        console.log(remprocs);

        document.getElementById("output").innerHTML = chosenprocs.join("");
        document.getElementById("remainder").innerHTML = remprocs.join("");
        //boxtoggle('proc');
    }
    if (chosenprocs.length >4)
    {
        console.clear();
        console.log("Resetting Procedures")
        remprocs = Object.assign([], proc);
        chosenprocs=[]

        console.log("Chosen Procedures:");
        //chosenprocs.push(proc[idx]);
        console.log(chosenprocs);

        document.getElementById("output").innerHTML = chosenprocs.join("");
        document.getElementById("remainder").innerHTML = remprocs.join("");
    }
    buildprocmenu();

return false;
}