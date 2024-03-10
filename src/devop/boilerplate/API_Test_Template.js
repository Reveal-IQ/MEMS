/*
******************************************************
*  Comapny              : Reveal IQ                  *
*  Last Edit Author     : Akshay Puli                *
*  App Name             : TEMPLATE API TEST APP      *
*  Last Edit			: 04/02/2023    		     *  
*  Version              : 0.2.0 		             *
******************************************************
*/

//Include API for test
//API TEST UNIT
const ATU = require('./API_Template.js');
const { MongoClient } = require("mongodb");

//Create Request Packet
var req = {
    ID: "001",
    ServiceCode: "TEST",
    API: "TEST_API_NAME",
    Institute_Code: "DMO"

}

//Create dbClient
uri = 'mongodb://localhost:27017'
var db = new MongoClient(uri);


//Establish DB Connection
try {
    //Establish DB Connection
    let dbclient = db.connect()
        .then( //Test API
            (dbClient) => {
                console.log("DB Connection established.")
                console.log("Test Request Packet: %j", req);

                //Select API to Test
                ATU.Temp_API1(req, dbClient)
                    .then((res) => { console.log("Test Response Packet: %j", res) })
            }
        )
} catch (error) {
    console.log("Error with API" + error)
}