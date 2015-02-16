var HttpComponent = require('elasticio-node').HttpComponent;

exports.process = newSMS;

function newSMS(msg, cfg) {
	// Esto creo que no es necesario ya que el campo es obligatorio
	var sender = msg.body.sender;
	if (!sender) {
	    return this.emit('error', new Error('Sender Address is required'));
	}

	var url160 = 'https://www.160world.net/servicios/ServiceSms.svc';

	var data =
            "<?xml version='1.0' encoding='UTF-8'?>" +
            "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:wor='http://www.160world.net' xmlns:arr='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>" +
            "<soapenv:Header/>" +
                "<soapenv:Body>" +
                    "<wor:EnviarSms>" +
                        "<wor:Usuario>" + cfg.username + "</wor:Usuario>" +
                        "<wor:PassWord>" + cfg.password + "</wor:PassWord>" +
                        "<wor:Remitente>" + msg.body.sender + "</wor:Remitente>" +
                        "<wor:Texto>" + msg.body.message + "</wor:Texto>" +
                        "<wor:Telefonos>" + 
                            "<arr:string>" + msg.body.to + "</arr:string>" +
                        "</wor:Telefonos>" +
                        "<wor:Url></wor:Url>" +
                    "</wor:EnviarSms>" + 
                "</soapenv:Body>" + 
            "</soapenv:Envelope>";

    var headers = {
        'Accept-Encoding' : "gzip,deflate ",
        'Content-Type': "text/xml;charset=UTF-8",
		'SOAPAction': "http://www.160world.net/IServiceSms/EnviarSms",
		'Accept': "text/xml",
		'Host': "www.160world.net",
		'Connection': "Keep-Alive"
    }
	
    var options = {
    	headers: headers,
        url : url160,
        body: data
    };

    new HttpComponent(this).post(options);
}