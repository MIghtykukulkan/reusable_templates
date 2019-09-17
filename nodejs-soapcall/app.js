var soap = require('soap');
var url = 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl';
var xml = `<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ndf="https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl">
<x:Header/>
<x:Body>
    <ndf:CornerPoints>
        <ndf:sector/>
    </ndf:CornerPoints>
</x:Body>
</x:Envelope>`

var options = {
    url: 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl',
    method: 'POST',
    body: xml,
    headers: {
      'Content-Type':'text/xml;charset=utf-8',
      'Accept-Encoding': 'gzip,deflate',
      'Content-Length':xml.length,
      'SOAPAction':"https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php"
    }
  };

soap.createClient(url, function(err, client) {
    
    client.CornerPoints(args, function(err, result) {
        console.log(result);
    });
});