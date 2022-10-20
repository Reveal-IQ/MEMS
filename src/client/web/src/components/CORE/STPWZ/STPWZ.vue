<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 01 SEP 2021        *
*  Version    : 0.1.0.02.18-0921   *
************************************
-->
<template>
    <div class="container-fluid">
        <div class="row">
            <landing v-if="compState === 'landing'" />
            <div v-else class="row">
                <!-- Header -->
                <div class="d-flex flex-column flex-md-row justify-content-between title m-4">
                    <div class="d-flex flex-row">
                        <img class="mx-4" src="../../../assets/media/DeepBlueLogo.svg" style="width:150px; height: 30px;"/>
                        <div class="mx-4 headerText">Setup Wizard</div>
                    </div>
                    <div class="mx-4 bodyText" :presentTime="presentTime">{{ presentTime }}</div>
                </div>
                <!-- Body -->
                <div>
                    <keep-alive>
                        <db-connection v-if="compState === 'dbConnection'" @update-page="updatePage" />
                        <institute-info v-else-if="compState === 'instituteInfo'" @update-page="updatePage" />
                        <upload-logic v-else-if="compState === 'uploadLogic'" @update-page="updatePage" />
                        <user-info v-else-if="compState === 'userInfo'" @update-page="updatePage" />
                        <advanced-settings v-else-if="compState === 'advancedSettings'" @update-page="updatePage" />
                        <complete-setup v-else @update-page="updatePage" />
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { ref, provide } from "vue";

import landing from "./STPWZ-Landing.vue";
import dbConnection from "./STPWZ-DBConnection.vue";
import instituteInfo from "./STPWZ-InstituteInfo.vue";
import uploadLogic from "./STPWZ-UploadLogic.vue";
import userInfo from "./STPWZ-UserInfo.vue";
import completeSetup from "./STPWZ-CompleteSetup.vue";
import advancedSettings from './STPWZ-AdvancedSettings.vue';

export default {
    
    components: {
        landing,
        dbConnection,
        instituteInfo,
        uploadLogic,
        userInfo,
        completeSetup,
        advancedSettings
    },

    setup(){

        const compState = ref("landing"); // dbConnection, instituteInfo, uploadLogic, userInfo, advancedSettings, completeSetup
        const presentTime = ref(null);
       
        // To collect Database Connection Information
        const dbDetails = ref({
            Hostname: null,
            Port: null,
            Username: null,
            Password: null,
            tlsCertificateKeyFile: null,
            tlsCAFile: null,
            tlsCertificateKeyFilePwd: null
        });

        // To collect Institute Information
        const instituteInfo = ref({
            foundationDate: null,
            selectedCurrency: { listName: null, listCode: null },
            selectedTimezone: { listName: null, listCode: null },
            selectedCountry: { listName: null, listCode: null },
            selectedState: { listName: null, listCode: null },
            selectedDistrict: { listName: null, listCode: null },
            selectedMandal: { listName: null, listCode: null },
        });

        // To collect Institute Information
        const Global_Definition = ref({
            Institute_Code: null,
            Institute_Name: null,
            Default_Currency: null,
            Default_Time_Zone: null,
            Institute_Foundation_Date: null,
            Reveal_Install_Date: Date.now(),
            Working_Days: [{ Day: null, Hour_Open: null, Hour_Close: null }],
            Contact_Telephone: null,
            Institute_Address: {
                Country: null,
                State: null,
                District: null,
                Mandal: null,
                Street_Address: null,
                Postal_Code: null
            }
        })

        // To collect Upload Logic Information
        const uploadLogic = ref({
            Work_Flows: null,
            Workflow_File_Name: null,
            Workflow: null,
            Cost_Code_File_Name: null,
            Cost_Code: null
        });

        // To collect User Information
        const userInfo = ref({
            Password: null,
            Confirm_Password: null
        });

        // To collect User Information
        const User = ref({
            User_First_Name: null,
            User_Last_Name: null,
            User_Name: null,
            Password_Hash: null,
            Hash_Salt: null,
            Date_Time_Pwd_Set: Date.now(), 
            Date_Time_Pwd_Expiry: new Date().setDate(new Date().getDate() + 365),
            Contact_Phone_Number: null,
            User_Email: null,
            User_Group: "ADM",
            User_Department: "administration",
            ID_User: "RVL001",
            Flag_New_User: false,
            Version: "001"
        })

        // To display Application Information
        const Applications = ref([
            {
            App_Name: "Global API",
            App_Module: "GLOBAL",
            Service_Code: "GLOBL",
            App_Display: true,
            App_Icon: "users",
            App_Version: "0.1.0",
            App_Date_Version: "5/28/2022",
            App_Status: "Active",
            App_DB_Roles: {
            role: "GLOBL_dbRole",
            privileges: [
                {
                resource: { db: "Terminology", collection: "User_Group" },
                actions: ["find"],
                },
                {
                resource: { db: "Terminology", collection: "Geography" },
                actions: ["find"],
                },
            ],
            roles: [],
            },
            Version_Schema: "0.1.0",
            },
            {
                App_Name: "Patient Chart",
                Service_Code: "PTCHT",
                App_Module: "PRIMIS",
                App_Display: true,
                App_Icon: "clipboard-list",
                App_Version: "0.5.0.00.25",
                App_Date_Version: "2021/01/26",
                App_Status: "Active",
                App_DB_Roles: {
                role: "ADPNL_dbRole",
                privileges: [
                    {
                    resource: { db: "Site_DB", collection: "Registration" },
                    actions: ["find"],
                    },
                    {
                    resource: { db: "Site_DB", collection: "Visit" },
                    actions: ["find"],
                    },
                    {
                    resource: {
                        db: "Terminology",
                        collection: "Clinical_Descriptor",
                    },
                    actions: ["find"],
                    },
                    {
                    resource: { db: "Terminology", collection: "Drugs" },
                    actions: ["find"],
                    },
                    {
                    resource: { db: "Terminology", collection: "Drugs_Manufacturer" },
                    actions: ["find"],
                    },
                ],
                roles: [],
                },
                Version_Schema: "022621-V0.1",
            },    
            {
                App_Name: "Admin Panel",
                Service_Code: "ADPNL",
                App_Module: "ADMIN",
                App_Display: true,
                App_Icon: "users",
                App_Version: "0.4.3.03.18",
                App_Date_Version: "2020/11/23",
                App_Status: "Active",
                App_DB_Roles: {
                    role: "ADPNL_dbRole",
                    privileges: [
                        { resource: { db: "Site_DB", collection: "User" }, actions: [ "find", "update" ] },
                        { resource: { db: "Site_DB", collection: "App_Info" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "App_Access" }, actions: [ "find", "insert", "update" ] },
                        { resource: { db: "Site_DB", collection: "Availability" }, actions: [ "find", "insert", "update" ] },
                        { resource: { db: "Site_DB", collection: "Global_Definition" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "User_Group" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Geography" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Clinical_Descriptor" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Currency" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Time_Zone" }, actions: [ "find" ] }
                    ],
                    roles: []
                },
                Version_Schema: "022621-V0.1"
            },
            {
                App_Name: "Availability Manager",
                Service_Code: "AVLMG",
                App_Module: "CORE",
                App_Display: true,
                App_Icon: "hourglass-half",
                App_Version: "0.2.1.02.23",
                UI_Version: "0.2.1.01",
                App_Date_Version: "2021/01/26",
                App_Status: "Active",
                App_DB_Roles: {
                    role: "AVLMG_dbRole",
                    privileges: [
                        { resource: { db: "Site_DB", collection: "User" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Availability" }, actions: [ "find", "insert", "update" ] },
                        { resource: { db: "Terminology", collection: "User_Group" }, actions: [ "find" ] },
                    ],
                    roles: []
                },  
                Version_Schema: "022621-V0.1"
            },
            {
                App_Name: "Patient Record",
                Service_Code: "PTRCD",
                App_Module: "CORE",
                App_Display: true,
                App_Icon: "book-medical",
                App_Version: "0.4.1.01.22",
                UI_Version: "0.4.1.01",
                App_Date_Version: "2021/01/08",
                App_Status: "Active",
                App_DB_Roles: {
                    role: "PTRCD_dbRole",
                    privileges: [
                        { resource: { db: "Site_DB", collection: "User" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Availability" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Registration" }, actions: [ "find", "update" ] },
                        { resource: { db: "Site_DB", collection: "Visit" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Clinical_Descriptor" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Geography" }, actions: [ "find" ] },
                    ],
                    roles: []
                }, 
                Version_Schema: "022621-V0.1"
            },
            {
                App_Name: "Registration",
                Service_Code: "REGIT",
                App_Module: "CORE",
                App_Display: true,
                App_Icon: "user-plus",
                App_Version: "0.4.2.01.12",
                UI_Version: "0.4.2.01",
                App_Date_Version: "2021/02/02",
                App_Status: "Active",
                App_DB_Roles: {
                    role: "REGIT_dbRole",
                    privileges: [
                        { resource: { db: "Site_DB", collection: "App_Info" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Registration" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Global_Definition" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Clinical_Descriptor" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Geography" }, actions: [ "find" ] },
                    ],
                    roles: []
                },
                Version_Schema: "022621-V0.1"
            },
            {
                App_Name: "Scaffold",
                Service_Code: "SCFLD",
                App_Module: "CORE",
                App_Display: false,
                App_Icon: "Clone",
                App_Version: "0.6.8.00.09",
                App_Date_Version: "2021/04/24",
                App_Status: "Active",
                App_DB_Roles: {
                    role: "SCFLD_dbRole",
                    privileges: [
                        { resource: { db: "Site_DB", collection: "App_Info" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "App_Access" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "User" }, actions: [ "find", "update"  ] },
                        { resource: { db: "Site_DB", collection: "Media_Depot" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Global_Definition" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Geography" }, actions: [ "find" ] },
                    ],
                    roles: []
                },
                Version_Schema: "022621-V0.1"
            },
            {
                App_Name: "Universal Search",
                Service_Code: "UNSCH",
                App_Module: "CORE",
                App_Display: false,
                App_Icon: "search",
                App_Version: "0.4.1.03.10",
                UI_Version: "0.4.1.02",
                App_Date_Version: "2021/01/08",
                App_Status: "Active",
                App_DB_Roles: {
                    role: "UNSCH_dbRole",
                    privileges: [
                        { resource: { db: "Site_DB", collection: "Transaction" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Registration" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Geography" }, actions: [ "find" ] },
                    ],
                    roles: []
                },
                Version_Schema: "022621-V0.1"
            },
            {
                App_Name: "User Login",
                Service_Code: "USLGN",
                App_Module: "CURA",
                App_Display: false,
                App_Icon: "Clone",
                App_Version: "0.6.8.00.09",
                App_Date_Version: "2021/04/28",
                App_Status: "Active",
                App_DB_Roles: {
                    role: "USLGN_dbRole",
                    privileges: [
                        { resource: { db: "Site_DB", collection: "App_Info" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "App_Access" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "User" }, actions: [ "find", "update" ] },
                        { resource: { db: "Site_DB", collection: "Media_Depot" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Global_Definition" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Geography" }, actions: [ "find" ] },
                    ],
                    roles: []
                },
                Version_Schema: "022621-V0.1"
            },
            {
                App_Name: "Appointments",
                Service_Code: "APPTS",
                App_Module: "PRIMIS",
                App_Display: true,
                App_Icon: "calendar",
                App_Version: "0.4.3.02.16",
                UI_Version: "0.4.3.02",
                App_Date_Version: "2021/01/25",
                App_Status: "Active",
                App_DB_Roles: {
                    role: "APPTS_dbRole",
                    privileges: [
                        { resource: { db: "Site_DB", collection: "User" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Availability" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Transaction" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Registration" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Visit" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "User_Group" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Geography" }, actions: [ "find" ] },
                    ],
                    roles: []
                },
                Version_Schema: "022621-V0.1"
            },
            {
                App_Name: "Patient Check-In",
                Service_Code: "CHKIN",
                App_Module: "PRIMIS",
                App_Display: true,
                App_Icon: "hourglass-half",
                App_Version: "0.1.3.00.11",
                UI_Version: "0.1.3.00",
                App_Date_Version: "2020/11/23",
                App_Status: "Active",
                App_DB_Roles: {
                    role: "CHKIN_dbRole",
                    privileges: [
                        { resource: { db: "Site_DB", collection: "User" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Availability" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Transaction" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Registration" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Visit" }, actions: [ "find", "update" ] },
                        { resource: { db: "Terminology", collection: "User_Group" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Geography" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Clinical_Descriptor" }, actions: [ "find" ] },
                    ],
                    roles: []
                },
                Version_Schema: "022621-V0.1"
            },
            {
                App_Name: "Patient Que",
                Service_Code: "MYQUE",
                App_Module: "PRIMIS",
                App_Display: true,
                App_Icon: "hourglass-half",
                App_Version: "0.4.1.00.11",
                UI_Version: "0.4.1.00",
                App_Date_Version: "2020/11/17",
                App_Status: "Active",
                App_DB_Roles: {
                    role: "MYQUE_dbRole",
                    privileges: [
                        { resource: { db: "Site_DB", collection: "User" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Transaction" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Registration" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Visit" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "User_Group" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Geography" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Clinical_Descriptor" }, actions: [ "find" ] },
                    ],
                    roles: []
                },
                Version_Schema: "022621-V0.1"
            },
            {
                App_Name: "Patient Bills",
                Service_Code: "BILPT",
                App_Module: "REBUS",
                App_Display: true,
                App_Icon: "scroll",
                App_Version: "0.4.1.00.16",
                UI_Version: "0.4.1.00",
                App_Date_Version: "2021/01/30",
                App_Status: "Active",
                App_DB_Roles:  {
                    role: "BILPT_dbRole",
                    privileges: [
                        { resource: { db: "Site_DB", collection: "User" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Transaction" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Registration" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Visit" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Payment" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Currency" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Geography" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Clinical_Descriptor" }, actions: [ "find" ] },
                    ],
                    roles: []
                },
                Version_Schema: "022621-V0.1"
            },
            {
                App_Name: "Tests",
                Service_Code: "TESTS",
                App_Module: "SEQUI",
                App_Display: true,
                App_Icon: "scroll",
                App_Version: "0.3.1",
                App_Date_Version: "2020/07/14",
                App_Status: "Active",
                App_DB_Roles: {
                    role: "TESTS_dbRole",
                    privileges: [],
                    roles: []
                },
                Version_Schema: "022621-V0.1"
            },
            {
                App_Name: "Record Status Authority",
                Service_Code: "RSAUT",
                App_Module: "STATUS",
                App_Display: false,
                App_Icon: "N/A",
                App_Version: "0.0.1",
                UI_Version: "0.0.1",
                App_Date_Version: "2021/01/30",
                App_Status: "Active",
                App_DB_Roles:  {
                    role: "RSAUT_dbRole",
                    privileges: [
                        { resource: { db: "Site_DB", collection: "Workflow" }, actions: [ "find" ] },
                        { resource: { db: "Site_DB", collection: "Record_Schema" }, actions: [ "find", "remove" ] },
                        { resource: { db: "Site_DB", collection: "Registration" }, actions: [ "find", "insert", "remove" ] },
                        { resource: { db: "Site_DB", collection: "Global_Definition" }, actions: [ "find", "remove" ] },
                        { resource: { db: "Site_DB", collection: "Media_Depot" }, actions: [ "insert", "remove" ] },
                        { resource: { db: "Site_DB", collection: "Visit" }, actions: [ "find", "insert", "remove" ] },
                        { resource: { db: "Site_DB", collection: "Availability" }, actions: [ "find", "remove" ] },
                        { resource: { db: "Site_DB", collection: "Inclusion_Date" }, actions: [ "find", "remove" ] },
                        { resource: { db: "Site_DB", collection: "Que" }, actions: [ "find", "insert", "remove" ] },
                        { resource: { db: "Site_DB", collection: "DHR_Prescription" }, actions: [ "find", "insert", "update", "remove" ] },
                        { resource: { db: "Site_DB", collection: "Transaction" }, actions: [ "find", "insert", "remove" ] },
                        { resource: { db: "Site_DB", collection: "Cost_Code" }, actions: [ "find" ] },
                        { resource: { db: "Terminology", collection: "Clinical_Descriptor" }, actions: [ "find" ] },
                    ],
                    roles: []
                },
                Version_Schema: "022621-V0.1"
            }
        ])

        // Refresh and Access Token Expiry in Seconds
        const Communication_Link = ref({
            RefreshExpiryInSeconds: "86400",
            AccessExpiryInSeconds: "1800"
        })

        // Socket IO settings
        const SocketIO = ref({
            cors: {
                origin: "*"
            },
            serveClient: false,
            connectionTimeout: 10000,
            transports: [ "websocket" ],
            allowUpgrade: false
        })

        // Used to give Admin Panel Access to Admin User  
        const Admin_App_Access = ref({
            Service_Code: "ADPNL",
            Access_Code: null,
            Date_Time_Granted: Date.now(),
            Date_Time_Expiry: new Date().setDate(new Date().getDate() + 365),
            User_Licence: null,
            Access_Status: "Active",
            Version: "001",
            Version_Schema: "022621-V0.2"
        })

        // Used to send the information in Complete Setup API
        const Record_Schema = ref([
            {
                Record_Code: "DRG",
                ID_Order: "A unique ID to each order.",
                ID_Prescription: "A unique identify to match prescription in DHR",
                ID_Patient: "The unique patient identifier",
                ID_Visit: "The workorder ID of the patient visit associated to this prescription",
                ID_Consultant: "The reference ID of the consultant",
                Consultant_Name: "The Name of the consultant",
                Order: [
                    {
                        ID_Medication: "Unique ID for each prescribed medication",
                        Drug_Code: "A unique number that identifies each variant of a drug",
                        Drug_Composition: "The chemical composition of drug",
                        Drug_Brand_Name: "Name of branded drugs",
                        Drug_Delivery: "The code for the form of drug delivery",
                        Drug_Dose: "Drug dose",
                        Drug_Dose_Unit: "Drug dose units",
                        Drug_Unit_Cost_Currency: "Currency type",
                        Drug_Unit_Cost: "The cost for one unit of drug",
                        Cost: "The cost for the prescribed quanity of drug.",
                        Drug_Specialty: "The clinical specialty this medication is targeted towards",
                        Drug_Manufacturer: "A unique number that identifies the manufacturer of the medication",
                        Drug_Manufacturer_Name: "The name of the manufacturer",
                        Prescribed_Quantity: "The Total quantity of the drug issued to the Patient by the consultant"
                    }
                ],
                Creation_Date_Time: "The date and time this record was created",
                ID_User: "The ID of the user who generated this record",
                Version_Schema: "011921-V0.1"
            },
            {
                Record_Code: "PAY",
                ID_Patient: "Patient's UUID",
                ID_Record: "ID_Patient or ID_Work_Order or ID_Que or ID_Prescription",
                ID_Transaction: "Unique ID for each line item",
                ID_User: "Initaited User",
                ID_Payment: "The ID of the payment order",
                Item_Price: "The cost of the line item",
                Item_Currency: "The cost of the line item",
                Creation_Date_Time: "Generated Date Time",
                Record_Status: "The cost of the line item",
                Transaction_Status: "The cost of the line item",
                Item_Currency: "The cost of the line item",
                Item_Description: "Reference the Cost_Code Collection.", 
                Item_Name: "The name of the fee that will appear on the patient billing receipt", 
                Item_Display: "Cost of this order, if it is different from the reference costcode", 
                Logic_ID: "Used to look up descriptions and value of the order",
                Version_Schema: "010621-V0.4"
            },
            {
                Record_Code: "PCP",
                ID_Patient: "Patient ID",
                ID_Visit: "Visit ID",
                ID_Consultant: "Consultant ID",
                ID_Prescription: "Order ID",
                ID_Medication: "ID_Medication",
                Creation_Date_Time: "The date and time this record was created",
                ID_User: "The ID of the user who generated this record",
                Drug: {
                    Code: "Drug Code",
                    Quantity: "Total Quantity of the drug",
                    Drug_Manufacturer: "A unique number that identifies the manufacturer of the medication",
                    Regime: [
                        {
                            Start_Date: "Start Date",
                            End_Date: "End Date",
                            Option_SOS: "True/False  if Saviour Drug or Medicine selected as true. This means the medication can be taken as required, and no end-date will be selected",
                            Option_Till_Review: "True/False if Till_Review selected as true, the end date is set to the next visit date.",
                            Duration: "The no of days",
                            Schedule: "Daily/Monthly/Weekly/Yearly",
                            Frequency: "Frequency is applicable for Schedule options Monthly/Weekly/Yearly",
                            Direction: {
                                AM: {
                                    Instructions: "Patient instruction codes were selected",
                                    Quantity: "The number of drug units that need to be taken by the patient."
                                },
                                NOON: {
                                    Instructions: "Patient instruction codes were selected",
                                    Quantity: "The number of drug units that need to be taken by the patient."
                                },
                                PM: {
                                    Instructions: "Patient instruction codes were selected",
                                    Quantity: "The number of drug units that need to be taken by the patient."
                                }
                            },
                            Note: "A note issued by the physcian for this regime for the drug"
                        }
                    ]
                },
                Status_Active: true,
                Read_Only: true,
                Record_Version: "001",
                Version_Schema: "012021-V0.4"
            },
            {
                Record_Code: "QUE",
                ID_Order: "WKORD",
                ID_Consultant: "The ID of the consultant",
                Visit_Date: "EPOCH",
                ID_Que: "EPOCH TIME",
                Que_Number: "BLOCKNO-PATIENTNO",
                ID_User: "Initiated User ID",
                Creation_Date_Time: "Created Date",
                Record_Version: "001",
                Version_Schema: "121020-V0.1"
            },
            {
                Record_Code: "RGT",
                ID_Institute: "Patient Institute ID",
                ID_Patient: "Patient Universal Unique ID",
                Patient_Name_First: "First Name",
                Patient_Name_Middle: "Middle Name",
                Patient_Name_Last: "Last Name",
                Patient_Date_Birth: "Date of Birth",
                Patient_Age: "The patient's numeric age",
                Patient_Sex: "The patient's sex",
                Patient_Address_Country_Code: "The country code of the patient's address",
                Patient_Address_State_Code: "The state code of the patient's address",
                Patient_Address_District_Code: "The district code of the patient's address",
                Patient_Address_City_Code: "The city code of the patient's address",
                Patient_Address_Division_Code: "The division code of the patient's address",
                Patient_Address: "Street Adress",
                Patient_Address_Postal_Code: "Pincode",
                Patient_Demographic_Email: "Email",
                Patient_Demographic_Landline: "Landline Number",
                Patient_Demographic_Mobile: "Mobile Number",
                Patient_Profile: "Profile Picture",
                Patient_Identification_Aadar: "Aadhaar Number",
                Registration_Type: "Onsite or Virtual",
                Registration_Institute: "Registration Institute Code",
                Patient_Clinical_Blood_Group: "Blood Group Code",
                Creation_Date_Time: "Date of document creation",
                Patient_Emergency_Contacts: "Emergency contacts information",
                Record_Version: "001",
                Version_Schema: "2020.10-V0.4"
            },
            {
                Record_Code: "VST",
                Visit_Type: "VISIT or REVISIT",
                ID_Visit: "Visit ID",
                ID_Order: "Same as Visit ID",
                ID_Patient: "Patient UUID",
                Creation_Date_Time: "Date Created",
                Checkin_Location: "ONSITE or VIRTUAL",
                Visit_Date: "Date Visited",
                Visit_Block_ID: "Block ID for the visit",
                ID_User: "User ID",
                ID_Consultant: "Consultant ID",
                Institute_Code: "Institute Code",
                Record_Version: "001",
                Patient_Triage: "URGENT or NORMAL or PRIORITY",
                Version_Schema: "121020-V0.1"
            },
            {
                Record_Code: "DOC",
                Doc: "Media File",
                ID_Patient: "Pateint ID",
                Type: "Type of document",
                ID: "ID of the Document",
                Expiry_Date: "Document Expiry Date"
            }
        ]);

        // Updates the component States to dbConnection
        setTimeout(() => {
            compState.value = "dbConnection"
        }, 1500);

        // Handles update-page event
        const updatePage = (page) => {
            compState.value = page;
        };

        // Display Date and Time
        const getTime = () => {
          var date = new Date();
          let month = date.toLocaleString("default", { month: "long" });
          var days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          var amOrPm = date.getHours() < 12 ? "AM" : "PM";
          var hour = date.getHours() % 12 || 12;
          var minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
          presentTime.value =
            days[date.getDay()] +
            ", " +
            month +
            " " +
            date.getDate() +
            ", " +
            date.getFullYear() +
            " | " +
            " " +
            hour +
            ":" +
            minutes +
            " " +
            amOrPm;
        };

        getTime();

        // Update Time every 10 seconds
        setInterval(() => {
            getTime();
        }, 10000);

        // Provide 
        provide('dbDetails', dbDetails);
        provide('instituteInfo', instituteInfo);
        provide('Global_Definition', Global_Definition);
        provide('uploadLogic', uploadLogic);
        provide('userInfo', userInfo);
        provide('User', User);
        provide('Applications', Applications);
        provide('Communication_Link', Communication_Link);
        provide('SocketIO', SocketIO);
        provide('Admin_App_Access', Admin_App_Access);
        provide('Record_Schema', Record_Schema);

        return {
            compState,
            updatePage,
            presentTime
        }

    }
}
</script>

<style lang="scss" scoped>
@import "./Style/STPWZ.scss";
@import "../../GLOBAL/Styles/font-style.scss";
</style>