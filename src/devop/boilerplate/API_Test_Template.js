/*
******************************************************
*  Comapny              : Reveal IQ                  *
*  Last Edit Author     : Akshay Puli                *
*  App Name             : TEMPLATE APITEST APP       *
*  Last Edit			: 05/18/2022    		     *  
*  Version              : 0.1.3 		             *
******************************************************
*/

//Include API for test
//API TEST UNIT
const ATU = require('./API_Template.js');
const { MongoClient } = require("mongodb");

//Create Request Packet
var req = {
    ID: "001",

}

//Create dbClient
uri = 'mongodb://localhost:27017'
var db = new MongoClient(uri);


//Establish DB Connection
try {
    let dbClient = DBconnect(db);
    console.log("DB Connection established")

    //Test API
    console.log("Test Request Packet: %j", req);

    //Select API to Test
    ATU.Temp_API1(req,dbClient)
    .then((res) => { console.log("Test Response Packet: %j", res)})

} catch (error) {
    console.log("Error with API" + error)
}


async function DBconnect(db) {
    try {
        let dbClient = await db.connect();
        console.log("DB Connection established")
        return dbClient
    }catch(error){
        console.log("Error with DB connection" + error)
    }
    
    
  }