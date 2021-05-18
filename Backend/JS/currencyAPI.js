var https = require('https');
var output = document.getElementById('JSresult')

function convertCurrency(amount, fromCurrency, toCurrency, cb) {
  var apiKey = 'b55178b553967e0f972d';

  fromCurrency = encodeURIComponent('USD');
  toCurrency = encodeURIComponent('EUR');
  var query = fromCurrency + '_' + toCurrency;

  var url = 'https://api.currconv.com/api/v7/convert?q='
            + query + '&compact=ultra&apiKey=' + apiKey;

  https.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          try {
            var jsonObj = JSON.parse(body);

            var val = jsonObj[query];
            if (val) {
              var total = val * amount;
              cb(null, Math.round(total * 100) / 100);
            } else {
              var err = new Error("Value not found for " + query);
              console.log(err);
              cb(err);
            }
          } catch(e) {
            console.log("Parse error: ", e);
            cb(e);
          }
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
        cb(e);
  });
}

// var convertButton = document.getElementById('JSConvert');
document.getElementById("JSConvert").onclick = function() {convertStatic()};

function convertStatic() {
  document.getElementById("JSResult").innerHTML = 0.82;
}

// Using fixer.io API
// set endpoint and your API key
endpoint = 'convert';
access_key = 'API_KEY';

// define from currency, to currency, and amount
from = 'EUR';
to = 'GBP';
amount = '10';

// execute the conversion using the "convert" endpoint:
$.ajax({
    url: 'https://data.fixer.io/api/' + endpoint + '?access_key=' + access_key +'&from=' + from + '&to=' + to + '&amount=' + amount,   
    dataType: 'jsonp',
    success: function(json) {

        // access the conversion result in json.result
        alert(json.result);
                
    }
});
