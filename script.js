import { countryList } from "./codes.js";

const Base_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns = document.querySelectorAll('.dropdown select');

const btn=document.querySelector('form button');
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");



for(let select of dropdowns){
    for(let currCode in countryList){
       let newOption=document.createElement("option");
       newOption.innerText=currCode;
       newOption.value=currCode;
       if(select.name==="from"&& currCode==="USD"){
          newOption.selected="selected";
       }
       else if(select.name==="to"&& currCode==="INR"){
        newOption.selected="selected";
       }
       select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate=async()=>{
    let amount= document.querySelector(".amount input");
    let amtvalue=amount.value;
   
    let flag=1;
    if (/^\d+$/.test(amtvalue)) {
       flag=1;
     } else {
       flag=0;
     }
    if(amtvalue ===""||amtvalue<1||flag==0){
       amtvalue=1;
       amount.value="1";
    }
    
    const URL=`${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data= await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    
    let finalAmount=amtvalue*rate;
    msg.innerText=`${amtvalue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

}

const updateFlag = (element) =>{
      let currCode = element.value;
      let countaryCode = countryList[currCode];
      let newSrc=`https://flagsapi.com/${countaryCode}/flat/64.png`;
      let img=element.parentElement.querySelector("img");
      img.src=newSrc;
};


btn.addEventListener("click",(evt)=>{
     evt.preventDefault(); 
     updateExchangeRate(); 
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});

document.addEventListener('mousemove', function (e) {
    const sparkContainer = document.createElement('div');
    sparkContainer.className = 'spark-container';
    document.body.appendChild(sparkContainer);

    const numSparks = 20;

    for (let i = 0; i < numSparks; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';

        const x = e.clientX;
        const y = e.clientY;

        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;

        spark.style.transform = `translate(${x}px, ${y}px)`;
        spark.style.opacity = '0';

        sparkContainer.appendChild(spark);

        // Trigger reflow
        spark.offsetHeight;

        spark.style.transform = `translate(${x + offsetX}px, ${y + offsetY}px)`;
        spark.style.opacity = '1';
    }

    // Remove sparks after animation
    setTimeout(() => {
        document.body.removeChild(sparkContainer);
    }, 130);
});

