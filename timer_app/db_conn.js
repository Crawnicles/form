/*
Step 1: Set Up Your Azure Function App
Create a Function App in Azure:

Go to the Azure Portal.
Click on "Create a resource" > "Compute" > "Function App".
Follow the wizard to configure your function app. Choose a runtime stack that matches your preferred language (e.g., Node.js or .NET).
Install Azure Functions Core Tools (if you want to develop locally):

This toolset enables you to develop and test your Azure Functions on your local machine.
Follow the instructions at the official docs to install it.
Initialize a New Function Project Locally (optional):

Open a terminal or command prompt.
Navigate to the directory where you want to create the project.
Run func init and follow the prompts to set up your project.
Create an HTTP Trigger Function:

In your project directory, run func new.
Choose the "HTTP trigger" template.
Name your function (e.g., SubmitWorkOrder).
Step 2: Write Your Function Code
This example uses Node.js to create an HTTP-triggered function that connects to an Azure SQL Database. You'll need the mssql package to interact with SQL Server, so make sure to include it in your project dependencies.

Install Dependencies:

Run npm install mssql to install the SQL Server client for Node.js.
Function Code (SubmitWorkOrder/index.js):
*/




const sql = require('mssql');

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for Azure SQL Database
    trustServerCertificate: false, // change to true for local development / self-signed certs
  }
};

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  try {
    await sql.connect(sqlConfig);
    const { name, machine, date, workOrder, serialNumber, partNumber, quantity, notes, setupTime, machiningTime } = req.body;
    const result = await sql.query`INSERT INTO WorkOrders (Name, Machine, Date, WorkOrder, SerialNumber, PartNumber, Quantity, Notes, SetupTime, MachiningTime) VALUES (${name}, ${machine}, ${date}, ${workOrder}, ${serialNumber}, ${partNumber}, ${quantity}, ${notes}, ${setupTime}, ${machiningTime})`;
    context.res = {
      status: 200,
      body: "Work order submitted successfully"
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: `An error occurred: ${err}`
    };
  }
}
