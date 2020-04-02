export const debug = (msg, ...data) => {	
	if(process.env.NODE_ENV !== 'production') {		
		const dateTime = new Date();			
		var stackTrace = (new Error()).stack; // Only tested in latest FF and Chrome		
		var callerName = stackTrace.replace(/^Error\s+/, ''); // Sanitize Chrome							
		callerName = callerName.split("\n")[1]; // 1st item is this, 2nd item is caller						
		callerName = callerName.replace(/^\s+at/, ''); // Sanitize Chrome				
		callerName = callerName.replace(/ \(.+\)$/, ''); // Sanitize Chrome		
		callerName = callerName.replace(/@.+/, ''); // Sanitize Firefox				

		const prefix = `[${dateTime.toLocaleString()}] ${callerName}: `;				
		if(typeof msg === 'object'){			
			// msg = JSON.stringify(msg);			
			console.log(prefix);
			console.log(msg,...data);
		}else{
			console.log(prefix + msg,...data);		
		}		
	}
}