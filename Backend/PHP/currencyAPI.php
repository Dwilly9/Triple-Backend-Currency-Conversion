<!-- Original API used -->
<?php
function convertCurrency($amount,$from_currency,$to_currency){
  $apikey = 'your-api-key-here';

  $from_Currency = urlencode($from_currency);
  $to_Currency = urlencode($to_currency);
  $query =  "{$from_Currency}_{$to_Currency}";

  // change to the free URL if you're using the free version
  $json = file_get_contents("https://api.currconv.com/api/v7/convert?q={$query}&compact=ultra&apiKey={$apikey}");
  $obj = json_decode($json, true);

  $val = floatval($obj["$query"]);


  $total = $val * $amount;
  return number_format($total, 2, '.', '');
}

//uncomment to test
//echo convertCurrency(10, 'USD', 'PHP');
?>

<!-- fixer.io API -->
<?php 
// set API Endpoint and API key 
// set API Endpoint, access key, required parameters
$endpoint = 'convert';
$access_key = 'API_KEY';

$from = 'USD';
$to = 'EUR';
$amount = 10;

// initialize CURL:
$ch = curl_init('https://data.fixer.io/api/'.$endpoint.'?access_key='.$access_key.'&from='.$from.'&to='.$to.'&amount='.$amount.'');   
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// get the JSON data:
$json = curl_exec($ch);
curl_close($ch);

// Decode JSON response:
$conversionResult = json_decode($json, true);

// access the conversion result
echo $conversionResult['result'];
?>