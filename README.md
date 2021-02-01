# integrateAutoTest
Project for integrating automation testing

1- Checkout source code from https://github.com/tuanphanminh/integrateAutoTest.git
2- cd integrateAutoTest
3- npm install 
4- node server.js 


The server is listing at 5000 port

Tester's action:

1- Added code to btnShell[Index].sh 
2- At the index.html add button tag 
   <main class="container">
        Auto Load Training Data
       <div class="btn-group btn-group-justified">
           <button class="btn btn-primary  btnAutoLoadDs01">Testcase 1</button>
           <button class="btn btn-primary  btnAutoLoadDs02">Testcase 2</button>
           <button class="btn btn-primary  btnAutoLoadDs03">Testcase 3</button>
           <button class="btn btn-primary  btnAutoLoadDs04">Testcase <b>[Index] </b></button>   
   </main>

3- At the main.js
    Add EventListener for the button
    btnAutoLoadDs<b>Index</b>.addEventListener('click', () => {
        btnAutoLoadDs<b>Index</b>.disabled = true ;
        btnAutoLoadDs<b>Index</b>.innerText = btnTitle + '<b>Index</b>' + ' is running';
        click(4) ;
    });
    
    Add code for listining 
    
    async function fncHandlingEvent(data) {
        var obj = JSON.parse(data) ;
        if (obj) {
            if (obj.btnIndex == 1) {
                btnAutoLoadDs01.innerText = fillInReturnedInfo(obj.btnIndex, obj.btnValue) ;
            } else if (obj.btnIndex == 2) {
                btnAutoLoadDs02.innerText = fillInReturnedInfo(obj.btnIndex, obj.btnValue) ;
            } else if (obj.btnIndex == 3) {
                btnAutoLoadDs03.innerText = fillInReturnedInfo(obj.btnIndex, obj.btnValue) ;
            } else if (obj.btnIndex == <b>Index</b>) {
                btnAutoLoadDs<b>Index</b>.innerText = fillInReturnedInfo(obj.btnIndex, obj.btnValue) ;
            }
        }
    }