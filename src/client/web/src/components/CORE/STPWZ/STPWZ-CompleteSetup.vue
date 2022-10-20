<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 01 SEP 2021        *
*  Version    : 0.1.0.01.17-0921   *
************************************
-->
<template>
    <div class="row justify-content-center">
        <div class="col col-lg-9 my-3 px-5">
            <div v-if="!status" class="pageTitle m-2">
                <div class="xlargeText fw-bold"> Complete Setup </div>
                <div class="versionSub"> Click button to complete the setup process </div>
            </div>
            <div class="contentPage">
                <div v-if="!status">
                    <div class="row my-4">
                        <div class="col-12 d-flex justify-content-end m-3">
                            <div style="color: rgba(230, 126, 34, 1); cursor: pointer;" @click="changePage('instituteInfo')">
                                <font-awesome-icon
                                    icon="pencil-alt"
                                    size="1x"
                                />
                                <span class="mx-3 text-decoration-underline">Edit</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <p class="d-flex justify-content-start m-3 fw-bolder">
                                Institute Information
                            </p>
                        </div>
                        <div class="col-9">
                            <div class="d-flex flex-wrap">
                                <div class="col-10 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 630px">
                                    <div class="fw-bold">Name</div>
                                    <div> {{ Global_Definition.Institute_Name }} </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">Foundation Date</div>
                                    <div> {{ instituteInfo.foundationDate }} </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">Telephone</div>
                                    <div> {{ Global_Definition.Contact_Telephone }} </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">Currency</div>
                                    <div> {{ instituteInfo.selectedCurrency.listName }} </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">Time Zone</div>
                                    <div> {{ instituteInfo.selectedTimezone.listName }} </div>
                                </div>
                                <div class="col-10 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 630px">
                                    <div class="fw-bold">Working Days</div>
                                    <div class="row">
                                        <div class="col">Day</div>
                                        <div class="col">Opening</div>
                                        <div class="col">Closing</div>
                                    </div>
                                    <hr class="mx-1">
                                    <div v-for="workingDay in Global_Definition.Working_Days" :key="workingDay.index">
                                        <div class="row"> 
                                            <div class="col"> {{ workingDay.Day }} </div>
                                            <div class="col"> {{ workingDay.Hour_Open }} </div>
                                            <div class="col"> {{ workingDay.Hour_Close }} </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">Country</div>
                                    <div> {{ instituteInfo.selectedCountry.listName }} </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">State</div>
                                    <div> {{ instituteInfo.selectedState.listName }} </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">District</div>
                                    <div> {{ instituteInfo.selectedDistrict.listName }} </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">Mandal</div>
                                    <div> {{ instituteInfo.selectedMandal.listName }} </div>
                                </div>
                                <div class="col-10 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 630px">
                                    <div class="fw-bold">Street</div>
                                    <div> {{ Global_Definition.Institute_Address.Street_Address }} </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">Postal Code</div>
                                    <div> {{ Global_Definition.Institute_Address.Postal_Code }} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row my-4">
                        <div class="col-12 d-flex justify-content-end m-3" >
                            <div style="color: rgba(230, 126, 34, 1); cursor: pointer;" @click="changePage('uploadLogic')">
                                <font-awesome-icon
                                    icon="pencil-alt"
                                    size="1x"
                                />
                                <span class="mx-3 text-decoration-underline">Edit</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <p class="d-flex justify-content-start m-3 fw-bolder">
                                Uploaded Documents
                            </p>
                        </div>
                        <div class="col-9">
                            <div class="d-flex flex-column">
                                <div class="col-10 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 630px">
                                    <div> {{ uploadLogic.Workflow_File_Name }} </div>
                                </div>
                                <div class="col-10 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 630px">
                                    <div> {{ uploadLogic.Cost_Code_File_Name }} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row my-4">
                        <div class="col-12 d-flex justify-content-end m-3">
                            <div style="color: rgba(230, 126, 34, 1); cursor: pointer;" @click="changePage('userInfo')">
                                <font-awesome-icon
                                    icon="pencil-alt"
                                    size="1x"
                                />
                                <span class="mx-3 text-decoration-underline">Edit</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <p class="d-flex justify-content-start m-3 fw-bolder">
                                User Information
                            </p>
                        </div>
                        <div class="col-9">
                            <div class="d-flex flex-wrap">
                                <div class="col-10 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 630px">
                                    <div class="fw-bold">Full Name</div>
                                    <div> {{ User.User_Name_First }} {{ User.User_Name_Last }} </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">User Name</div>
                                    <div> {{ User.User_Name }} </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">Password</div>
                                    <div> {{ userInfo.Password }} </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">Phone Number</div>
                                    <div> {{ User.Contact_Phone_Number }} </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">Email</div>
                                    <div> {{ User.User_Email }} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row my-4">
                        <div class="col-12 d-flex justify-content-end m-3" >
                            <div style="color: rgba(230, 126, 34, 1); cursor: pointer;" @click="changePage('advancedSettings')">
                                <font-awesome-icon
                                    icon="pencil-alt"
                                    size="1x"
                                />
                                <span class="mx-3 text-decoration-underline">Edit</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <p class="d-flex justify-content-start m-3 fw-bolder">
                                Applications
                            </p>
                        </div>
                        <div class="col-9">
                            <div class="d-flex flex-column">
                                <div class="d-flex flex-wrap">
                                    <div v-for="app in Applications" :key="app.index" class="col-4 col-md-2 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 150px">
                                        <div class="fw-bold">{{ app.App_Module }}</div>
                                        <div>{{ app.Service_Code }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <p class="d-flex justify-content-start m-3 fw-bolder">
                                Expiry In Seconds
                            </p>
                        </div>
                        <div class="col-9">
                            <div class="d-flex flex-wrap">
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">Refresh Token</div>
                                    <div> {{ Communication_Link.RefreshExpiryInSeconds }} </div>
                                </div>
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">Access Token</div>
                                    <div> {{ Communication_Link.AccessExpiryInSeconds }} </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <p class="d-flex justify-content-start m-3 fw-bolder">
                                SocketIO
                            </p>
                        </div>
                        <div class="col-9">
                            <div class="d-flex flex-wrap">
                                <div class="col-10 col-md-5 shadow-sm p-3 m-3 bg-body rounded" style="max-width: 300px">
                                    <div class="fw-bold">Origin</div>
                                    <div> {{ SocketIO.cors.origin }} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="my-5">
                    <div v-if="!status" class="d-flex flex-row justify-content-center">
                        <button @click="completeSetup" class="col-3 btn btn-success py-2">Complete Setup</button>
                    </div>
                    <div v-else-if="status == 'loading'">
                        Setting up Reveal Instance...
                    </div>
                    <div v-else-if="status == 'failed'">
                        Failed to setup, contact support. 
                    </div>
                    <div v-else-if="status == 'success'">
                        Successfully created your New Reveal Instance, redirecting you to login page...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { ref, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {

    emits: ["updatePage"],

    setup(props, { emit }){

        // Store
        const store = useStore();

        // Router
        const router = useRouter();

        // Varaible
        const status = ref(null); // loading, failed, success
        const timeoutId = ref(null);
        const intervalId = ref(null);
        
        // Inject
        const dbDetails = inject('dbDetails');
        const instituteInfo = inject('instituteInfo');
        const Global_Definition = inject('Global_Definition');
        const uploadLogic = inject('uploadLogic');
        const userInfo = inject('userInfo');
        const User = inject('User');
        const Applications = inject('Applications');
        const Communication_Link = inject('Communication_Link');
        const SocketIO = inject('SocketIO');
        const Admin_App_Access = inject('Admin_App_Access');
        const Record_Schema = inject('Record_Schema');

        // To add DB role name and Site Code 
        const updateDbRoles = async () => {
            let appPromises = Applications.value.map(app => {
                
                // Create DB Role Name dyanamically based on Institute_Code and Service_Code
                app.App_DB_Roles.role = `${Global_Definition.value.Institute_Code}_${app.Service_Code}_dbRole`;
                
                // Replace Site_DB with Institute_Code within each privilage
                if(app.App_DB_Roles.privileges.length){
                    app.App_DB_Roles.privileges.forEach(role => {
                        if(role.resource.db === "Site_DB"){
                            role.resource.db = Global_Definition.value.Institute_Code
                        }
                    });
                }
            })
            Promise.all(appPromises);

            // Update ID_User and ID_User_Granted with ID_User generated in User Info
            Admin_App_Access.value.ID_User = User.value.ID_User;
            Admin_App_Access.value.ID_User_Granted = User.value.ID_User;
        }

        // Send Complete Setup API request
        const completeSetup = async () => {
            try {
                status.value = "loading";
                
                await updateDbRoles();

                // Create request packet
                var req = {
                    Expiry: 20000,
                    Type: "REQUEST",
                    Request: {
                        Module: "CORE",
                        ServiceCode: "STPWZ",
                        API: "Complete_Setup",
                        Database: {
                            Site_Database: {
                                Name: Global_Definition.value.Institute_Code,
                                Username: `admin-DR-${Global_Definition.value.Institute_Code}`,
                                Password: `admin-DR-${Global_Definition.value.Institute_Code}`,
                                Collections: {
                                    Global_Definition: [ Global_Definition.value ],
                                    //Workflow: uploadLogic.value.Workflow,
                                    //Cost_Code: uploadLogic.value.Cost_Code,
                                    User: [ User.value ],
                                    App_Access: [ Admin_App_Access.value ],
                                    Record_Schema: Record_Schema.value,
                                }
                            },
                        },
                        Config: {
                            Applications: Applications.value,
                            SocketIO: SocketIO.value,
                            Communication_Link: Communication_Link.value,
                            Work_Flows: uploadLogic.value.Work_Flows
                        }
                    }
                };

                // Wait for 1 min before to stop checking RCU status and display fail message
                timeoutId.value = setTimeout(() => {
                    clearInterval(intervalId.value);
                    status.value = "failed"
                }, 60000);

                // Check the RCU state every 5 sec
                intervalId.value = setInterval(() => {
                    checkStatus()
                }, 5000);
                
                store.dispatch("sendHTTPReq", req);

            } catch (error) {
                console.log(error);
            }
        }

        // Check RCU State
        const checkStatus = async () => {
            var instinit = {
                Expiry: 20000,
                Type: "REQUEST",
                Request: {
                    Module: "RCU",
                    ServiceCode: "Status",
                    API: "Get_Status",
                },
            };
            let res = await store.dispatch("sendHTTPReq", instinit);

            if (res.Type === "RESPONSE") {
                // If the state is Active then display success message and redirect to User Login page
                if(res.Response.State === "Active"){
                    status.value = "success"
                    clearInterval(intervalId.value);
                    clearTimeout(timeoutId.value);
                    setTimeout(() => {
                        router.push({ name: "USLGN" });
                    }, 3000);
                }
            } else {
                console.log("Unable to retrive RCU Status");
            }
        }

        // Navigate to selected page to edit
        const changePage = async (page) => {
            emit("updatePage", page)
        }

        return {
            completeSetup,
            dbDetails,
            instituteInfo,
            Global_Definition,
            uploadLogic,
            userInfo,
            User,
            Applications,
            Communication_Link,
            SocketIO,
            status,
            changePage
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./Style/STPWZ.scss";
</style>