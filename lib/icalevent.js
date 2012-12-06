
var tzone = require('tzone');


var iCalEvent = function(){
	this.version = '2.0';
	this.id = '-//sitaroster//iCalEvent.js v0.2//EN';
	this.event = {};
}

iCalEvent.prototype = {

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
		result += 'UID:'+ this.event.uuid + '\r\n';
		result += 'DTSTAMP:'+ this.event.tstamp + '\r\n';
		result += 'ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN="'+this.event.user.name+'":mailto:' + this.event.user.email +'\r\n';
		result += 'ORGANIZER;PARTSTAT=ACCEPTED;CN="' + this.event.organizer.name + '":mailto:' + this.event.organizer.email + '\r\n';
		result += 'DTSTART:' + this.event.start + '\r\n';
		result += 'DTEND:' + this.event.end + '\r\n';
		if (this.event.url) 		result += 'URL;VALUE=URI:' + this.event.url + '\r\n';
		result += 'SUMMARY:' + this.event.summary + '\r\n';

		result += 'END:VEVENT\r\n';
		
		
		return result;
	}
	
}


module.exports = iCalEvent;