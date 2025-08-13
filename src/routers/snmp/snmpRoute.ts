/**
 * SNMP route
 */

const express = require('express');
const app = express();

// Simple IP address validation using regular expression
const isValidIP = (ip) => {
	const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	return regex.test(ip);
};

// Route to handle /snmp/:ipAddress
app.get('/snmp/:ipAddress', (req, res) => {
const ipAddress = req.params.ipAddress;

// Validate IP address format
if (!isValidIP(ipAddress)) {
return res.status(400).send('Invalid IP address format.');
}

// Process the IP address (e.g., querying SNMP, etc.)
res.send(`SNMP request received for IP: ${ipAddress}`);
});

// Start the server
app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});

