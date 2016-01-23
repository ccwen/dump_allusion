var iconv=require("iconv-lite");
var fs=require("fs");
var request=require("request");

var baseurl="http://cls.hs.yzu.edu.tw/ORIG/Show_Content.asp?id="
var total=26749 ;//as of 2016/1/23
var now=1;
var outputfolder="raw/";
var getcontent=function() {
	if (now==total) {
		console.log("finish");
		return;
	}

	request({url:baseurl+now,encoding:null}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var str = iconv.decode(new Buffer(body), "big5");
	    fs.writeFileSync(outputfolder+now+".html",str,"utf8");
			now++;
			if (now%100===0) console.log("fetching ",now);
			
			setTimeout(getcontent,50);
	  }
	})
}

getcontent();