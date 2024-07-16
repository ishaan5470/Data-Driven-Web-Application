// prerequsite_node.js

const fs = require('fs');

// Function to generate a random name
function generateName(firstNames, lastNames) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
}

// Function to generate masked phone numbers
function maskPhoneNumber(phoneNumber) {
    const maskedNumber = `####-${phoneNumber.slice(-4)}`;
    return maskedNumber;
}

// Generate CSV file with user data
function generateCSVFile(filename, firstNames, lastNames, numUsers) {
    const header = "Email,Name,CreditScore,CreditLines,MaskedPhoneNumber\n";
    let data = header;
    for (let i = 1; i <= numUsers; i++) {
        const email = `user${i}@example.com`;
        const name = generateName(firstNames, lastNames);
        const creditScore = Math.floor(Math.random() * 351) + 500; // Random credit score between 500 and 850
        const creditLines = Math.floor(Math.random() * 5) + 1;     // Random credit lines between 1 and 5
        const phoneNumber = String(Math.floor(100000000 + Math.random() * 900000000)); // Random 9-digit phone number
        const maskedPhone = maskPhoneNumber(phoneNumber);
        data += `${email},${name},${creditScore},${creditLines},${maskedPhone}\n`;
    }
    fs.writeFileSync(filename, data);
    console.log("CSV file generated successfully.");
}

// Example usage
const firstNames = ["John", "Jane", "Michael", "Emily", "David"];
const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Williams"];
const numUsers = 200000;
const csvFilename = "user_data.csv";

generateCSVFile(csvFilename, firstNames, lastNames, numUsers);
