
var tzone = require('tzone');


var iCalEvent = function(){
	this.version = '2.0';
	this.id = '-//sitaroster//iCalEvent.js v0.2//EN';
	this.event = {};
}

iCalEvent.prototype = {

	format: function(datetime){

		function pad(n){
			n = parseInt(n);
			return n < 10 ? '0' + n : n
		}

		var d = new Date(datetime);

		return d.getUTCFullYear()
			+ pad(d.getUTCMonth() + 1)
			+ pad(d.getUTCDate()) + 'T'
			+ pad(d.getUTCHours())
			+ pad(d.getUTCMinutes())
			+ pad(d.getUTCSeconds());
	},

	set: function(key, value){
		this.event[key] = value;
	},

	organizer: function(obj){
		this.event.organizer = obj;
	},

	summary: function(summary){
		this.event.summary = summary;
	},

	toFile: function(){
		var result = ''
		result += 'BEGIN:VEVENT\r\n';
		result += 'UID: '+ this.event.uuid + '\r\n';
		result += 'DTSTAMP;TZID=' + this.event.location + ':' + this.format(new Date()) + '\r\n';
		
		if (this.event.organizer) 	result += 'ORGANIZER;CN="' + this.event.organizer.name + '":mailto:' + this.event.organizer.email + '\r\n';
		if (this.event.starts) 		result += 'DTSTART;TZID=' + 'Pacific/Auckland' + ':' + this.event.starts + '\r\n';
		if (this.event.ends) 		result += 'DTEND;TZID=' + 'Pacific/Auckland' + ':' + this.event.ends + '\r\n';
		if (this.event.url) 		result += 'URL;VALUE=URI:' + this.event.url + '\r\n';
		if (this.event.summary) 	result += 'SUMMARY:' + this.event.summary + '\r\n';

		result += 'END:VEVENT\r\n';
		
		
		return result;
	}
	
}


module.exports = iCalEvent;