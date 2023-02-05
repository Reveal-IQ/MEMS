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
            <div class="d-flex flex-row justify-content-between m-2">
                <div>
                    <div class="xlargeText fw-bold"> User Information </div>
                    <div class="versionSub">Fill with admin user details </div>
                </div>
                <div class="bodyText mx-3 text-decoration-underline" style="cursor: pointer;" @click="clearForm">Clear Form</div>
            </div>
            <div class="contentPage">
            <div class="d-flex flex-row my-4">
                <div class="col-3">
                    <p class="d-flex justify-content-start m-3 largeText">
                        User Details
                    </p>
                </div>
                <div class="col-9">
                    <div class="d-flex flex-wrap">
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="text" 
                                :title="Err.User_First_Name ? 'Invalid First Name' : 'Enter First Name'" 
                                class="form-control" :class="{ 'is-invalid': Err.User_First_Name  }" 
                                id="firstName" 
                                v-model="User.User_First_Name" 
                                @focusout="validateInput('User_First_Name')" 
                                placeholder="Name"
                            >
                            <label for="firstName">First Name</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="text" 
                                :title="Err.User_Last_Name ? 'Invalid Last Name' : 'Enter Last Name'" 
                                class="form-control" :class="{ 'is-invalid': Err.User_Last_Name  }"
                                id="lastName"
                                v-model="User.User_Last_Name"
                                @focusout="validateInput('User_Last_Name')" 
                                placeholder="Name"
                            >
                            <label for="lastName">Last Name</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="text" 
                                :title="Err.User_Name ? 'Enter atleast 4 or more characters' : 'Enter User Name'" 
                                class="form-control" :class="{ 'is-invalid': Err.User_Name  }"
                                id="userName" 
                                v-model="User.User_Name" 
                                @focusout="validateInput('User_Name')" 
                                placeholder="username"
                                autocomplete="off"
                            >
                            <label for="userName">User Name</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="password" 
                                :title="Err.Password ? 'Needs atleast one of [0-9][*@$.][A-Z][a-z]' : 'Enter Password'" 
                                class="form-control" :class="{ 'is-invalid': Err.Password  }" 
                                id="password" 
                                v-model="userInfo.Password"
                                @focusout="validateInput('Password')" 
                                placeholder="Name"
                                autocomplete="off"
                            >
                            <label for="password">Password</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="text" 
                                :title="Err.Confirm_Password ? 'Does not match with Password' : 'Enter Password Again'" 
                                class="form-control" :class="{ 'is-invalid': Err.Confirm_Password  }" 
                                id="confirmPassword" 
                                v-model="userInfo.Confirm_Password" 
                                @focusout="validateInput('Confirm_Password')" 
                                placeholder="Name"
                                autocomplete="off"
                            >
                            <label for="confirmPassword">Confirm Password</label>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="d-flex flex-row my-4">
                <div class="col-3">
                    <p class="d-flex justify-content-start m-3 largeText">
                        Contact Details
                    </p>
                </div>
                <div class="col-9">
                    <div class="d-flex flex-wrap">
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="tel" 
                                class="form-control" 
                                id="phoneNumber" 
                                v-model="User.Contact_Phone_Number" 
                                @input="validateInput('Contact_Phone_Number')" 
                                placeholder="9876543210"
                            >
                            <label for="phoneNumber">Phone Number</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="text" 
                                class="form-control" 
                                id="emailAddress" 
                                v-model="User.User_Email" 
                                @input="validateInput('User_Email')" 
                                placeholder="abc@email.com"
                            >
                            <label for="emailAddress">Email Address</label>
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
const crypto = require("crypto");

import workingDay from "./STPWZ-WorkingDay.vue";

export default {

    components: {
        workingDay
    },

    emits: ["updatePage"],

    setup(props, { emit }){

        // Inject
        const userInfo = inject('userInfo');
        const User = inject('User');

        // Varaible
        const nextPage = ref(false);
        
        // Error Varaibles
        const Err = ref({
            User_First_Name: false,
            User_Last_Name: false,
            User_Name: false,
            Password: false,
            Confirm_Password: false,
            Contact_Phone_Number: false,
            User_Email: false
        })

        // Validate the user input
        const validateInput = async (inputType) => {
            // Valdate the input
            switch (inputType) {
                case "User_Name":
                    // Check if the length is greater than 4
                    if(!(User.value.User_Name.length >= 4)){
                        setErr(inputType);
                    } else {
                        removeErr(inputType);
                    }
                    break;
                case "Password":
                    // Validate Password check if the criteria is satisfied
                    if(userInfo.value.Password.length >= 6 && validatePassword(userInfo.value.Password)){
                        // Generating Hash Salt
                        User.value.Hash_Salt = crypto.randomBytes(8).toString("hex").toString();
                        // Hash and store it in the Password_Hash
                        User.value.Password_Hash = crypto.pbkdf2Sync(userInfo.value.Password, User.value.Hash_Salt, 1000, 64, `sha512`).toString(`hex`);
                        removeErr(inputType);
                    } else {
                        User.value.Password_Hash = null
                        setErr(inputType);
                    }
                    break;
                case "Confirm_Password":
                    // Compare with Password
                    if(userInfo.value.Password !== userInfo.value.Confirm_Password && userInfo.value.Password != null){
                        setErr(inputType);
                    } else {
                        removeErr(inputType);
                    }
                    break;
                default:
                    break;
            }

            // If all the inputs are available next button
            if(checkUserInput() && checkErr()){
                nextPage.value = true;
            } else{
                nextPage.value = false;
            }
        }

        // Check if the password is valid
        const validatePassword = (password) => {
            let valid = false
            if (/\d/.test(password) && /.{6,}/.test(password)
            && /[a-z]/.test(password) && /[A-Z]/.test(password)
            && /[!@#\$%\^&\*]/.test(password) && !/[~\+=`|{}:;!,.?\\/'"()\[\]-]/.test(password)){
                valid = true
            }
            return valid
        }

        // Set Error
        const setErr = (inputType) => {
            Err.value[inputType] = true
        }

        // Remove Error
        const removeErr = (inputType) => {
            Err.value[inputType] = false
        }

        // Check if the fields are empty
        const checkUserInput = () => {
            let result = true;
            for (const key in User.value) {
                if (User.value[key] === null || User.value[key] === "" ) {
                    result = false
                }
            }
            return result
        }

        // Check if there is an Error
        const checkErr = () => {
            let result = true;
            for (const key in Err.value) {
                if (Err.value[key]) {
                    result = false
                }
            }
            return result
        }

         // Navigate to previous page
        const goBack = async () => {
            emit("updatePage", "uploadLogic")
        }

        // Navigate to next page
        const changePage = async () => {
            emit("updatePage", "advancedSettings")
        }

        // Clear the user input
        const clearForm = async () => {
            userInfo.value.Password = null;
            userInfo.value.Confirm_Password = null;
            User.value.User_First_Name = null;
            User.value.User_Last_Name = null;
            User.value.User_Name = null;
            User.value.Password_Hash = null;
            User.value.Hash_Salt = null;
            User.value.Contact_Phone_Number = null;
            User.value.User_Email = null;
            Err.value.User_First_Name = false;
            Err.value.User_Last_Name = false;
            Err.value.User_Name = false;
            Err.value.Password = false;
            Err.value.Confirm_Password = false;
            Err.value.Contact_Phone_Number = false;
            Err.value.User_Email = false;
            nextPage.value = false;
        }

        return{
            User,
            userInfo,
            Err,
            validateInput,
            nextPage,
            changePage,
            goBack,
            clearForm
        }

    }
}
</script>

<style lang="scss" scoped>
@import "./Style/STPWZ.scss";
</style>