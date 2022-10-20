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
            <div class="pageTitle m-2">
                <div class="xlargeText fw-bold"> Advanced Settings </div>
                <div class="versionSub"> Fill in the following advanced details </div>
            </div>
            <div class="contentPage">
            <div class="d-flex flex-row my-4">
                <div class="col-3">
                    <p class="d-flex justify-content-start m-3 largeText">
                        Applications
                    </p>
                </div>
                <div class="col-9">
                    <div class="d-flex flex-wrap">
                        <div v-for="application in Applications" :key="application.index" class="m-3 rounded d-flex align-items-center" style="width:200px; height:50px; background-color:#F5F5F5;">
                            <div class="px-3"> {{ application.App_Module }} - {{ application.Service_Code }} </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="d-flex flex-row my-4">
                <div class="col-3">
                    <p class="d-flex justify-content-start m-3 largeText">
                        Expiry in seconds
                    </p>
                </div>
                <div class="col-9">
                    <div class="d-flex flex-wrap">
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="number" 
                                :title="Err.RefreshExpiryInSeconds ? 'Invalid Time' : 'Provide time in seconds'" 
                                class="form-control" :class="{ 'is-invalid': Err.RefreshExpiryInSeconds }" 
                                id="refreshExpiry" 
                                v-model="Communication_Link.RefreshExpiryInSeconds" 
                                @focusout="validateInput('RefreshExpiryInSeconds')" 
                                placeholder="Name"
                                autocomplete="off"
                            >
                            <label for="refreshExpiry">Refresh Token</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="number" 
                                :title="Err.AccessExpiryInSeconds ? 'Invalid Time' : 'Provide time in seconds'" 
                                class="form-control" :class="{ 'is-invalid': Err.AccessExpiryInSeconds  }" 
                                id="accessExpiry" 
                                v-model="Communication_Link.AccessExpiryInSeconds" 
                                @focusout="validateInput('AccessExpiryInSeconds')" 
                                placeholder="Name"
                                autocomplete="off"
                            >
                            <label for="accessExpiry">Access Token</label>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="d-flex flex-row my-4">
                <div class="col-3">
                    <p class="d-flex justify-content-start m-3 largeText">
                        Socket IO
                    </p>
                </div>
                <div class="col-9">
                    <div class="d-flex flex-wrap">
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="text" 
                                :title="Err.origin ? 'Invalid cors origin' : 'Provide cors origin address'" 
                                class="form-control" :class="{ 'is-invalid': Err.origin }" 
                                id="corsOrigin" 
                                v-model="SocketIO.cors.origin" 
                                @focusout="validateInput('crosOrigin')" 
                                placeholder="Name"
                                autocomplete="off"
                            >
                            <label for="corsOrigin">Origin</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-row justify-content-between my-5">
                <button @click="goBack" class="col-2 btn btn-secondary m-3">Back</button>
                <!-- nextPage -->
                <button v-show="true" @click="changePage" class="col-2 btn btn-secondary m-3">Next</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>

import { ref, inject } from "vue";

export default {

    emits: ["updatePage"],

    setup(props, { emit }){

        // Inject
        const Applications = inject('Applications');
        const Communication_Link = inject('Communication_Link');
        const SocketIO = inject('SocketIO');

        // Varaible
        const nextPage = ref(true);

        // Error Variable
        const Err = ref({
            RefreshExpiryInSeconds: false,
            AccessExpiryInSeconds: false,
            origin: false
        });

        // Validate the user input
        const validateInput = async (inputType) => {
            switch (inputType) {
                case "RefreshExpiryInSeconds":
                    // Validate RefreshExpiryInSeconds
                    break;
                case "AccessExpiryInSeconds":
                    // Validate AccessExpiryInSeconds
                    break;
                case "origin":
                    // Validate origin
                    break;
                default:
                    break;
            }

            // If all the inputs are available next button
            if(Communication_Link.value.RefreshExpiryInSeconds != null && Communication_Link.value.RefreshExpiryInSeconds != ""           
            && Communication_Link.value.AccessExpiryInSeconds != null && Communication_Link.value.AccessExpiryInSeconds != ""
            && SocketIO.value.cors.origin != null && SocketIO.value.cors.origin != ""
            ){
                nextPage.value = true;
            } else{
                nextPage.value = false;
            }
        }

        // Navigate to previous page
        const changePage = async () => {
            emit("updatePage", "completeSetup")
        }

        // Navigate to next page
        const goBack = async () => {
            emit("updatePage", "userInfo")
        }

        return {
            Applications,
            Communication_Link,
            SocketIO,
            Err,
            validateInput,
            nextPage,
            goBack,
            changePage
        }

    }
}
</script>

<style lang="scss" scoped>
@import "./Style/STPWZ.scss";
</style>