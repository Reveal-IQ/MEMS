const fs = require("fs");
const { MongoClient } = require("mongodb");
const dirTree = require("directory-tree");


const initDB = async (insertDemo,dbName,LocalDB) => {


	console.log("Connecting to DB..");

	try {

		//Obtain Database Client Connection
		var dbClient = await dbConnection(LocalDB);
		await dbClient.connect();
		console.log("I100: DB Connection Successful");

		//Terminology DB
		console.log("I101: Inserting Terminology DB collections");
		const TerminologyCol = dirTree("./Terminology/", {
			extensions: /\.json$/,
		});
		//Insert Terminology Collections
		await insertCollection(TerminologyCol, dbClient,'Terminology')

		//Insert DemoDB
		if (insertDemo) {
			//Demo DB
			console.log("I101: Inserting DMO Site DB collections");
			const DemoCol = dirTree("./DemoDB/", {
				extensions: /\.json$/,
			});
			//Insert Terminology Collections
			await insertCollection(DemoCol, dbClient,dbName)
		}

	} catch (error) {
		console.log("E100: Error with db connection" + error);


	} finally {
		// closing DB connection
		dbClient.close();
	}
};

const dbConnection = async (LocalDB) => {

	//DB Setting
	dbUrl = 'localhost'
	dbPort = '3030'
	dbUsername = 'DBadmin'
	dbPassword = 'Admin@123'

	//SSL Certificate Location (Place certificates in cert directory)
	tlsCA = '../DMODB01/certs/DBchain.pem'//Certificate Authority Chain of Trust 
	tlsCrt = '../DMODB01/certs/DMODB01v7.pem'//User Certificate File = certficate + pvt
	tlsPvtPass = encodeURIComponent('559b%3SutGZH@&&bqVn*') //Private Key Password

	//Generate the URI for DB Connection
	console.log('Connectiong to DB..')

	if(LocalDB){
		//For Unsecure DB, Uncomment the following URI. 
	    uri = 'mongodb://localhost:3030'
	}else{
		// Connect to RevealDB
		uri = 'mongodb://' + dbUsername + ':' + dbPassword + '@' + dbUrl + ':' + dbPort + '/?authSource=admin&readPreference=primary&appname=dbConfigTool&directConnection=true&tls=true&tlsCertificateKeyFile=' + tlsCrt + '&tlsCertificateKeyFilePassword=' + tlsPvtPass + '&tlsCAFile=' + tlsCA
	}
	

    // Connect to MongoDB
		var dbClient = new MongoClient(uri);
	

	return dbClient
}

const insertCollection = async (collections, dbClient,dbName) => {

	// creating database with Terminology name
	const database = dbClient.db(dbName);

	// creating collection by looping through the file structure
	for (let i = 0; i < collections.children.length; i++) {

		// reading the each Json file in the file structure
		const data = await fs.readFileSync(collections.children[i].path, "utf8");

		// converting that string into the JSON 
		const obj = JSON.parse(`${data}`);

		// we extracting the key values of the JSON object
		let keys = Object.keys(obj);

		// creating collection on Name of Each file exists in the Terminology Folder
		const collectionName = database.collection(keys[0]); // keys[0] is the 'string' which represents collection name    

		// Extracting Array of JSON data by using the Keys index
		let arrayOfRecords = obj[keys[0]];

		// inserting records into the specific collection
		try {
			await collectionName.insertMany(arrayOfRecords, { ordered: false });
			console.log("Created " + keys[0] + " >>")
		} catch (error) {
			console.log(error)
		}
		
		
	}

}

//Initialise the DB 
let Load_Demo_DB = false;
let DB_Name = "DMO"; // Provide Local DB_Name to load data
let LocalDB = true; // To connect to Local DB Make this value as TRUE
initDB(Load_Demo_DB,DB_Name,LocalDB);
