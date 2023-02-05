// Global variables
const Institute_Code = CONFIG.Database.Site_Database.Name;

module.exports.App_Info = {
    App_Name: "API Testing Tool",
    Service_Code: "TESTS",
    App_Module: "SEQUI",
    App_Display: true,
    App_Icon: "users",
    App_Version: "0.1.0",
    App_Date_Version: "05/17/2022",
    App_Status: "Active",
    App_DB_Roles: {
        role: "Tests_dbRole",
        privileges: [
            { resource: { db: "Site_DB", collection: "assets" }, actions: ["find", "insert", "update"] },
            { resource: { db: "Site_DB", collection: "facilities" }, actions: ["find", "insert", "update"] },
            { resource: { db: "Site_DB", collection: "manufacturers" }, actions: ["find", "insert", "update"] },
            { resource: { db: "Site_DB", collection: "equipment_models" }, actions: ["find", "insert", "update"] },
            { resource: { db: "Site_DB", collection: "vendors" }, actions: ["find", "insert", "update"] }
        ],
        roles: []
    },
    Version_Schema: "022621-V0.1"
}