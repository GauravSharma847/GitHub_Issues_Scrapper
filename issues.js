const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit=require("pdfkit");
 

function getIssuesPageHtml(url,topic,repoName) {
    request(url,cb);
    function cb(err,response,html) {
        if(err) {
            console.log(err);
        } else {
            // console.log(html);
            // getIssuesPageHtml(html);
            getIssues(html);
        }
    }

    function getIssues(html) {
        let $ = cheerio.load(html);
        let issuesArr = $(".d-block.d-md-none.position-absolute.top-0.bottom-0.left-0.right-0");
        // let issuesArr = $(".Box-row.Box-row--focus-gray.p-0 mt-0.js-navigation-item.js-issue-row");
        // console.log(issuesArr.length);

        let arr = [];

        for(let i = 0 ; i < issuesArr.length ; i++) {
            let link = $(issuesArr[i]).attr("href");
            // console.log(link);
            arr.push(link);
        }
        console.log(topic,"      ",arr);


        //File_Folder
        let folderPath = path.join(__dirname,topic);
        dirCreator(folderPath);
        let filePath = path.join(folderPath,repoName + ".pdf");

        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();


        // fs.writeFileSync(filePath,);

    }
}
module.exports =getIssuesPageHtml;

function dirCreator(folderPath) {
    if(fs.existsSync(folderPath) == false) {
        fs.mkdirSync(folderPath);
    }
}

