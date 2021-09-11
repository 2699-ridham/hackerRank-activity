let link = "https://www.hackerrank.com/auth/login";
let email = "siyofe3014@macauvpn.com";
let password = "ridham.2699";
let { answer } = require("./code");
let fs=require("fs");
let puppeteer=require("puppeteer");
// const { isAsyncFunction } = require("util/types");

let browserStartPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--disable-notifications"]

});
let browser,page;
(async function fn(){
    try{
        let browserObj=await browserStartPromise;
        console.log("brower opened");
        browser=browserObj;
        page = await browser.newPage();
        await page.goto(link);
        await page.type(".input[id = 'input-1']",email,{delay: 100});
        await page.type(".input[id='input-2']",password,{delay: 100});
        await page.click('button[data-analytics="LoginPassword"]',{delay: 100});
        await waitAndClick(".topic-card a[data-attr1='algorithms']",page);
        await waitAndClick("input[value='warmup']",page);
        let questionArr= await page.$$(".challenge-submit-btn",{delay: 100});
        console.log(questionArr.length);
        for(let i=0;i<questionArr.length - 3;i++){
            questionArr=await page.$$(".challenge-submit-btn",{delay: 100});
            await questionSolver(page,questionArr[i],answer[i]);
            await page.goBack();
            await page.waitFor(3000);
        }
    }catch(err){
        console.log(err);
    }
})();

// browserStartPromise
// .then(function(browserObj){
//     console.log("open the browser");
//     browser=browserObj;
//     let openBrowserTabPromise=browser.newPage();
//     return openBrowserTabPromise;
// }).then(function(newTab){
//     console.log("connect page to the hancker rank");
//     page=newTab;
//     let openNewTabPromise=newTab.goto(link);
//     return openNewTabPromise;
// }).then(function(){
//     console.log("Email.will be enetered");
//     let emailEnteredPromise=page.type(".input[id = 'input-1']",email,{delay: 100});
//     return emailEnteredPromise;
// }).then(function(){
//     console.log("Password will be entered");
//     let passwordEnteredPromise=page.type(".input[id='input-2']",password,{delay: 100});
//     return passwordEnteredPromise;
// }).then(function(){
//     let loginClickPromise=page.click('button[data-analytics="LoginPassword"]',{delay: 100});
//     return loginClickPromise;
// }).then(function(){
//     let AlgorithmsClickPromise=waitAndClick(".topic-card a[data-attr1='algorithms']",page);
//     return AlgorithmsClickPromise;
// }).then(function(){
//     let clickWarmupPromise=waitAndClick("input[value='warmup']",page);
//     return clickWarmupPromise;
// }).then(function(){
//     let AllChallengePromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay: 100});
//     return AllChallengePromise;
// }).then(function(questionArr){
//     console.log("number of question",questionArr.length);
//     let qWillSOlvedPromise=questionSolver(page,questionArr[0],answer);
//     return qWillSOlvedPromise;
// })

function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModalPromise=cPage.waitForSelector(selector,{visible: true});
        waitForModalPromise
        .then(function(){
            let clickModal=cPage.click(selector,{delay: 100});
            return clickModal;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}

function questionSolver(page, question,answer){
    return new Promise(function(resolve,reject){
        (async function fn(){
            try{
                await question.click();
                await waitAndClick(".monaco-editor.no-user-select.vs",page);
                await waitAndClick(".checkbox-input",page);
                await page.waitForSelector(".text-area.custominput",{visible: true});
                await page.type(".text-area.custominput",answer);
                await page.keyboard.down("Control");
                await page.keyboard.press("A",{delay: 100});
                await page.keyboard.press("X",{delay: 100});
                await page.keyboard.up("Control");
                await waitAndClick(".monaco-editor.no-user-select.vs",page);
                await page.keyboard.down("Control");
                await page.keyboard.press("A",{delay: 100});
                await page.keyboard.press("V",{delay: 100});
                await page.keyboard.up("Control");
                await page.click(".hr-monaco__run-code",answer,{delay: 10000});
                resolve();
                
            }catch{
                reject(err);
            }
            
        })();
        //code read
        //hk editior -> ctrl + A and ctrl + X
        //code type;


        // qWillClickedPromise.then(function(){
        //     let waitForEditorTObeFocused=waitAndClick(".monaco-editor.no-user-select.vs",page);
        //     return waitForEditorTObeFocused;
        // }).then(function(){
            // return waitAndClick(".checkbox-input",page);
        // }).then(function(){
        //     return page.waitForSelector(".text-area.custominput",{visible: true});
        // }).then(function(){
            // let typeINinputBoxPromises=page.type(".text-area.custominput",answer,{delay: 200});
            // return typeINinputBoxPromises;
        // })
        // .then(function(){
        //     let ctrlPressPromise=page.keyboard.down("Control");
        //     return ctrlPressPromise;
        // }).then(function(){
        //     let ApressedP=page.keyboard.press("A",{delay: 100});
        //     return ApressedP;
        // }).then(function(){
        //     let XpressedP=page.keyboard.press("X",{delay: 100});
        //     return XpressedP;
        // }).then(function(){
        //     let ctrlPressPromise=page.keyboard.up("Control");
        //     return ctrlPressPromise;
        // }).then(function(){
        //     let waitForEditorTObeFocused=waitAndClick(".monaco-editor.no-user-select.vs",page);
        //     return waitForEditorTObeFocused;
        // })
        // .then(function(){
        //     let ctrlPressPromise=page.keyboard.down("Control");
        //     return ctrlPressPromise;
        // }).then(function(){
        //     let ApressedP=page.keyboard.press("A",{delay: 100});
        //     return ApressedP;
        // }).then(function(){
        //     let XpressedP=page.keyboard.press("V",{delay: 100});
        //     return XpressedP;
        // }).then(function(){
        //     let ctrlPressPromise=page.keyboard.up("Control");
        //     return ctrlPressPromise;
        // })

        // .then(function(){
        //     return page.click(".hr-monaco__run-code",answer,{delay: 10000});

        // })
        // .then(function(){
        //     return page.waitForSelector(".hr-monaco-submit",{visible: true},{delay: 1000});
        // })
        // .then(function(){
        //     console.log("submit code");
        //     return page.click(".hr-monaco-submit");
        // })
    })
}