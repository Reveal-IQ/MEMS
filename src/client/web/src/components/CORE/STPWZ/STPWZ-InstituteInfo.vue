<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 01 SEP 2021        *
*  Version    : 0.1.0.01.18-0921   *
************************************
-->
<template>
    <div class="row justify-content-center">
        <div class="col col-lg-9 my-3 px-5">
            <div class="d-flex flex-row justify-content-between m-2">
                <div>
                    <div class="xlargeText fw-bold"> Institute Information </div>
                    <div class="versionSub"> Fill with institute details </div>
                </div>
                <div class="bodyText mx-3 text-decoration-underline" style="cursor: pointer;" @click="clearForm">Clear Form</div>
            </div>
            <div class="contentPage">
            <div class="d-flex flex-row my-4">
                <div class="col-3">
                    <p class="d-flex justify-content-start m-3 largeText">
                        Institute Details
                    </p>
                </div>
                <div class="col-9">
                    <div class="d-flex flex-wrap">
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="text" 
                                class="form-control" 
                                id="instituteName" 
                                v-model="Global_Definition.Institute_Name" 
                                @input="validateInput('Institute_Name')" 
                                placeholder="Institute Name"
                            >
                            <label for="instituteName">Name</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="text" 
                                class="form-control" 
                                id="instituteCode" 
                                v-model="Global_Definition.Institute_Code" 
                                @input="validateInput('Institute_Code')" 
                                placeholder="DMO"
                            >
                            <label for="instituteCode">Code</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                class="form-control" 
                                list="currencyOptions" 
                                id="currencyList" 
                                placeholder="Indian Rupee" 
                                v-model="instituteInfo.selectedCurrency.listName" 
                                @input="fetchCurrency"
                                autocomplete="off"
                            >
                            <datalist id="currencyOptions">
                                <option v-for="currency in currencyList" :key="currency.index" :value="currency.listName"></option>
                            </datalist>
                            <label for="currencyList">Currency</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                class="form-control" 
                                list="timezoneOptions" 
                                id="timezoneList" 
                                placeholder="Indian Standard Time" 
                                v-model="instituteInfo.selectedTimezone.listName" 
                                @input="fetchTimezone"
                                autocomplete="off"
                            >
                            <datalist id="timezoneOptions">
                                <option v-for="timezone in timezoneList" :key="timezone.index" :value="timezone.listName"></option>
                            </datalist>
                            <label for="timezoneList">Timezone</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="date" 
                                class="form-control" 
                                id="foundationDate" 
                                v-model="instituteInfo.foundationDate" 
                                @input="dateSelected" 
                                placeholder="2000-01-01"
                            >
                            <label for="foundationDate">Foundation Data</label>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="d-flex flex-row">
                <div class="col-3">
                    <p class="d-flex justify-content-start m-3 largeText">
                        Working Days
                    </p>
                </div>
                <div class="col-9">
                    <div class="d-flex flex-column pb-3">
                        <div v-for="(day, index) in Global_Definition.Working_Days" :key="index" class="col shadow-sm p-2 m-3 bg-body rounded">
                            <working-day :number="index" :workingDay="day" :numOfDays="Global_Definition.Working_Days.length" :days="days" @remove-working-day="removeWorkingDay" />
                        </div>
                        <button v-if="Global_Definition.Working_Days.length < 7" @click="addWorkingDay" class="col-6 col-md-4 col-xll-2 btn btn-info m-3">+ Add Day</button>
                    </div>
                </div>
            </div>
            <hr>
            <div class="d-flex flex-row">
                <div class="col-3">
                    <p class="d-flex justify-content-start m-3 largeText">
                        Contact Details
                    </p>
                </div>
                <div class="col-9">
                    <div class="d-flex flex-column">
                        <div class="d-flex">
                            <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                                <input 
                                    type="tel"
                                    class="form-control" 
                                    id="telephone" 
                                    v-model="Global_Definition.Contact_Telephone" 
                                    @input="validateInput('Contact_Telephone')" 
                                    placeholder="987654321"
                                >
                                <label for="telephone">Telephone</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="d-flex flex-row">
                <div class="col-3">
                    <p class="d-flex justify-content-start m-3 largeText">
                        Institute Address
                    </p>
                </div>
                <div class="col-9">
                    <div class="d-flex flex-wrap">
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                class="form-control" 
                                list="countryOptions" 
                                id="countryList" 
                                placeholder="Type to search..." 
                                v-model="instituteInfo.selectedCountry.listName" 
                                @input="fetchCountry"
                                autocomplete="off"
                            >
                            <datalist id="countryOptions">
                                <option v-for="country in countryList" :key="country.index" :value="country.listName"></option>
                            </datalist>
                            <label for="countryList">Country</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                class="form-control" 
                                list="stateOptions" 
                                id="stateList" 
                                placeholder="Type to search..." 
                                v-model="instituteInfo.selectedState.listName" 
                                @input="fetchState"
                                autocomplete="off"
                            >
                            <datalist id="stateOptions">
                                <option v-for="state in stateList" :key="state.index" :value="state.listName"></option>
                            </datalist>
                            <label for="stateList">State</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                class="form-control" 
                                list="districtOptions" 
                                id="districtList" 
                                placeholder="Type to search..." 
                                v-model="instituteInfo.selectedDistrict.listName" 
                                @input="fetchDistrict"
                                autocomplete="off"
                            >
                            <datalist id="districtOptions">
                                <option v-for="district in districtList" :key="district.index" :value="district.listName"></option>
                            </datalist>
                            <label for="districtList">District</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                class="form-control" 
                                list="mandalOptions" 
                                id="mandalList" 
                                placeholder="Type to search..." 
                                v-model="instituteInfo.selectedMandal.listName" 
                                @input="fetchMandal"
                                autocomplete="off"
                            >
                            <datalist id="mandalOptions">
                                <option v-for="mandal in mandalList" :key="mandal.index" :value="mandal.listName"></option>
                            </datalist>
                            <label for="mandalList">Mandal</label>
                        </div>
                        <div class="col-12 form-floating m-3">
                            <textarea 
                                class="form-control" 
                                placeholder="Leave a comment here" 
                                id="street" 
                                v-model="Global_Definition.Institute_Address.Street_Address" 
                                style="height: 100px; max-width: 630px;"
                                @input="validateInput('Street_Address')"
                            ></textarea>
                            <label for="street">Street</label>
                        </div>
                        <div class="col-12 col-sm-6 form-floating m-3" style="max-width: 300px">
                            <input 
                                type="text" 
                                disabled 
                                class="form-control" 
                                id="postalCode"
                                placeholder="PostalCode" 
                                v-model="Global_Definition.Institute_Address.Postal_Code"
                            >
                            <label for="postalCode">Postal Code</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-row justify-content-end">
                <!-- nextPage -->
                <button v-show="true" @click="changePage" class="col-2 btn btn-secondary m-3">Next</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>

import { ref, inject, onMounted } from "vue";
import { useStore } from "vuex";

import workingDay from "./STPWZ-WorkingDay.vue"

export default {
    components: {
        workingDay
    },

    emits: ["updatePage"],
    setup(props, { emit }){

        // Store variables
        const store = useStore();

        // Inject
        const instituteInfo = inject('instituteInfo');
        const Global_Definition = inject('Global_Definition');

        // Varaibles
        const workingDayInfo = ref({ Day: null, Hour_Open: null, Hour_Close: null });
        const days = ref([ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ]);
        const currencyList = ref(null);
        const timezoneList = ref(null);
        const countryList = ref(null);
        const stateList = ref(null);
        const districtList = ref(null);
        const mandalList = ref(null);
        const nextPage = ref(false);

        // Validate the selected date
        const dateSelected = async (event) => {
            instituteInfo.value.foundationDate = event.target.value;
            Global_Definition.value.Institute_Foundation_Date = new Date(instituteInfo.value.foundationDate).getTime();
            validateInput("Institute_Foundation_Date");
        }

        // Add Working Day to Working_Days
        const addWorkingDay = async () => {
            if(Global_Definition.value.Working_Days.length < 7){
                Global_Definition.value.Working_Days.push(JSON.parse(JSON.stringify(workingDayInfo.value)));
            }
        }

        const removeWorkingDay = async (index) => {
            if(Global_Definition.value.Working_Days.length > 1){
                // Find and remove the day info
                Global_Definition.value.Working_Days.splice(index, 1);
            }
        }

        // Fetch Currency
        const fetchCurrency = async (event) => {
            try{
                const selectedCurrency = event ? event.target.value : '';
                if (event && (!(event instanceof InputEvent) || event.inputType === 'insertReplacementText')) {
                    // determine if the value is in the datalist. If so, someone selected a value in the list!
                    instituteInfo.value.selectedCurrency = currencyList.value.find((currency) => {
                        return selectedCurrency === currency.listName;
                    });
                    Global_Definition.value.Default_Currency = instituteInfo.value.selectedCurrency.listCode;
                    validateInput("Default_Currency");
                } else {
                    Global_Definition.value.Default_Currency = null;
                    var req = {
                        Expiry: 20000,
                        Type: "REQUEST",
                        Request: {
                            Module: "CORE",
                            ServiceCode: "STPWZ",
                            API: "Fetch_Currency",
                            Search_Currency: selectedCurrency,
                        }
                    };
                    let res = await store.dispatch("sendHTTPReq", req);
                    if (res.Type === "RESPONSE") {
                        currencyList.value = res.Response.Currency_List;
                    } else {
                        console.log("Failed to Fetch Currency");
                    }
                }
            } catch(error){
                console.log(error)
            }
        }

        // Fetch Timezone
        const fetchTimezone = async (event) => {
            try{
                const selectedTimezone =  event ? event.target.value : '';
                if (event && (!(event instanceof InputEvent) || event.inputType === 'insertReplacementText')) {
                    // determine if the value is in the datalist. If so, someone selected a value in the list!
                    instituteInfo.value.selectedTimezone = timezoneList.value.find((timezone) => {
                        return selectedTimezone === timezone.listName;
                    });
                    Global_Definition.value.Default_Time_Zone = instituteInfo.value.selectedTimezone.listCode;
                    validateInput("Default_Time_Zone");
                } else {
                    Global_Definition.value.Default_Time_Zone = null;
                    var req = {
                        Expiry: 20000,
                        Type: "REQUEST",
                        Request: {
                            Module: "CORE",
                            ServiceCode: "STPWZ",
                            API: "Fetch_Timezone",
                            Search_Timezone: selectedTimezone,
                        }
                    };
                    let res = await store.dispatch("sendHTTPReq", req);
                    if (res.Type === "RESPONSE") {
                        timezoneList.value = res.Response.Timezone_List;
                    } else {
                        console.log("Failed to Fetch Timezone");
                    }
                }
            } catch(error){
                console.log(error)
            }
        }

        // Fetch Country
        const fetchCountry = async (event) => {
            try{
                const selectedCountry =  event ? event.target.value : '';
                if (event && (!(event instanceof InputEvent) || event.inputType === 'insertReplacementText')) {
                    // determine if the value is in the datalist. If so, someone selected a value in the list!
                    instituteInfo.value.selectedCountry = countryList.value.find((country) => {
                        return selectedCountry === country.listName;
                    });
                    Global_Definition.value.Institute_Address.Country = instituteInfo.value.selectedCountry.listCode;
                    validateInput("Country");
                    await fetchState();
                } else {
                    // Clear Country, State, District, Mandal, Postal Code
                    Global_Definition.value.Institute_Address.Country = null;
                    Global_Definition.value.Institute_Address.State = null;
                    instituteInfo.value.selectedState = { listName: null, listCode: null };
                    Global_Definition.value.Institute_Address.District = null;
                    instituteInfo.value.selectedDistrict = { listName: null, listCode: null };
                    Global_Definition.value.Institute_Address.Mandal = null;
                    instituteInfo.value.selectedMandal = { listName: null, listCode: null };
                    Global_Definition.value.Institute_Address.Postal_Code = null;
                    var req = {
                        Expiry: 20000,
                        Type: "REQUEST",
                        Request: {
                            Module: "CORE",
                            ServiceCode: "STPWZ",
                            API: "Fetch_Country",
                            Search_Country: selectedCountry
                        }
                    };
                    let res = await store.dispatch("sendHTTPReq", req);
                    if (res.Type === "RESPONSE") {
                        countryList.value = res.Response.Country_List;
                    } else {
                        console.log("Failed to Fetch Country");
                    }
                }
            } catch(error){
                console.log(error)
            }
        }

        // Fetch State
        const fetchState = async (event) => {
            try{
                const selectedState =  event ? event.target.value : '';
                // Need to check if Country is selected
                if (event && (!(event instanceof InputEvent) || event.inputType === 'insertReplacementText')) {
                    // determine if the value is in the datalist. If so, someone selected a value in the list!
                    instituteInfo.value.selectedState = stateList.value.find((state) => {
                        return selectedState === state.listName;
                    });
                    Global_Definition.value.Institute_Address.State = instituteInfo.value.selectedState.listCode;
                    validateInput("State");
                    await fetchDistrict();
                } else {
                    // Clear State, District, Mandal, Postal Code
                    Global_Definition.value.Institute_Address.State = null;
                    Global_Definition.value.Institute_Address.District = null;
                    instituteInfo.value.selectedDistrict = { listName: null, listCode: null };
                    Global_Definition.value.Institute_Address.Mandal = null;
                    instituteInfo.value.selectedMandal = { listName: null, listCode: null };
                    Global_Definition.value.Institute_Address.Postal_Code = null;
                    var req = {
                        Expiry: 20000,
                        Type: "REQUEST",
                        Request: {
                            Module: "CORE",
                            ServiceCode: "STPWZ",
                            API: "Fetch_State",
                            Country: Global_Definition.value.Institute_Address.Country,
                            Search_State: selectedState
                        }
                    };
                    let res = await store.dispatch("sendHTTPReq", req);
                    if (res.Type === "RESPONSE") {
                        stateList.value = res.Response.State_List;
                    } else {
                        console.log("Failed to Fetch State");
                    }
                }
            } catch(error){
                console.log(error)
            }
        }

        // Fetch District
        const fetchDistrict = async (event) => {
            try{
                const selectedDistrict =  event ? event.target.value : '';
                // Need to check if the District is selected
                if (event && (!(event instanceof InputEvent) || event.inputType === 'insertReplacementText')) {
                    // determine if the value is in the datalist. If so, someone selected a value in the list!
                    instituteInfo.value.selectedDistrict = districtList.value.find((district) => {
                        return selectedDistrict === district.listName;
                    });
                    Global_Definition.value.Institute_Address.District = instituteInfo.value.selectedDistrict.listCode;
                    validateInput("District");
                    await fetchMandal();
                } else {
                    // Clear District, Mandal, Postal Code
                    Global_Definition.value.Institute_Address.District = null;
                    Global_Definition.value.Institute_Address.Mandal = null;
                    instituteInfo.value.selectedMandal = { listName: null, listCode: null };
                    Global_Definition.value.Institute_Address.Postal_Code = null;
                    var req = {
                        Expiry: 20000,
                        Type: "REQUEST",
                        Request: {
                            Module: "CORE",
                            ServiceCode: "STPWZ",
                            API: "Fetch_District",
                            State: Global_Definition.value.Institute_Address.State,
                            Search_District: selectedDistrict
                        }
                    };
                    let res = await store.dispatch("sendHTTPReq", req);
                    if (res.Type === "RESPONSE") {
                        districtList.value = res.Response.District_List;
                    } else {
                        console.log("Failed to Fetch District");
                    }
                }
            } catch(error){
                console.log(error)
            }
        }
        
        // Fetch Mandal
        const fetchMandal = async (event) => {
            try{
                const selectedMandal =  event ? event.target.value : '';
                // Need to check if District is selected
                if (event && (!(event instanceof InputEvent) || event.inputType === 'insertReplacementText')) {
                    // determine if the value is in the datalist. If so, someone selected a value in the list!
                    instituteInfo.value.selectedMandal = mandalList.value.find((mandal) => {
                        return selectedMandal === mandal.listName;
                    });
                    Global_Definition.value.Institute_Address.Mandal = instituteInfo.value.selectedMandal.listCode;
                    validateInput("Mandal");
                    await fetchPostalCode();
                } else {
                    // Clear Mandal, Postal Code
                    Global_Definition.value.Institute_Address.Mandal = null;
                    Global_Definition.value.Institute_Address.Postal_Code = null;
                    var req = {
                        Expiry: 20000,
                        Type: "REQUEST",
                        Request: {
                            Module: "CORE",
                            ServiceCode: "STPWZ",
                            API: "Fetch_Mandal",
                            District: Global_Definition.value.Institute_Address.District,
                            Search_Mandal: selectedMandal
                        }
                    };
                    let res = await store.dispatch("sendHTTPReq", req);
                    if (res.Type === "RESPONSE") {
                        mandalList.value = res.Response.Mandal_List;
                    } else {
                        console.log("Failed to Fetch Mandal");
                    }
                }
            } catch(error){
                console.log(error)
            }
        }

        // Fetch Postal Code
        const fetchPostalCode = async () => {
            try{
                var req = {
                    Expiry: 20000,
                    Type: "REQUEST",
                    Request: {
                        Module: "CORE",
                        ServiceCode: "STPWZ",
                        API: "Fetch_Postal_Code",
                        District: Global_Definition.value.Institute_Address.District,
                        Mandal: Global_Definition.value.Institute_Address.Mandal
                    }
                };
                let res = await store.dispatch("sendHTTPReq", req);
                if (res.Type === "RESPONSE") {
                    Global_Definition.value.Institute_Address.Postal_Code = res.Response.Postal_Code;
                    validateInput("Postal_Code");
                } else {
                    console.log("Failed to Fetch PostalCode");
                }
            } catch(error){
                console.log(error)
            }
        }

        onMounted(async () => {
            await fetchCurrency();
            await fetchTimezone();
            await fetchCountry();
        })

        // Validate the user input
        const validateInput = async (inputType) => {
            switch (inputType) {
                case "Institute_Name":
                    // Validate Institute_Name
                    break;
                case "Institute_Code":
                    // Validate Institute_Code
                    break;
                case "Contact_Telephone":
                    // Validate Contact_Telephone
                    break;
                case "Default_Currency":
                    // Validate Default_Currency
                    break;
                case "Default_Time_Zone":
                    // Validate Default_Time_Zone
                    break;
                case "Institute_Foundation_Date":
                    // Validate Institute_Foundation_Date
                    break;
                case "Working_Days":
                    // Validate Working_Days
                    break;
                case "Country":
                    // Validate Country
                    break;
                case "State":
                    // Validate State
                    break;
                case "District":
                    // Validate District
                    break;
                case "Mandal":
                    // Validate Mandal
                    break;
                case "Street_Address":
                    // Validate Street_Address
                    break;
                case "Postal_Code":
                    // Validate Postal_Code
                    break;
                default:
                    break;
            }

            // If all the inputs are available next button
            if(checkGlobalDefinitionInput() 
            && Global_Definition.value.Institute_Address.Country != null && Global_Definition.value.Institute_Address.Country != ""
            && Global_Definition.value.Institute_Address.State != null && Global_Definition.value.Institute_Address.State != ""
            && Global_Definition.value.Institute_Address.District != null && Global_Definition.value.Institute_Address.District != ""
            && Global_Definition.value.Institute_Address.Mandal != null && Global_Definition.value.Institute_Address.Mandal != ""
            && Global_Definition.value.Institute_Address.Street_Address != null && Global_Definition.value.Institute_Address.Street_Address != ""
            && Global_Definition.value.Institute_Address.Postal_Code != null && Global_Definition.value.Institute_Address.Postal_Code != ""
            && Global_Definition.value.Working_Days.length >= 1
            ){
                nextPage.value = true;
            } else{
                nextPage.value = false;
            }
                
        }

        // Check if the fields are empty
        const checkGlobalDefinitionInput = () => {
            let result = true;
            for (const key in Global_Definition.value) {
                if (Global_Definition.value[key] === null || Global_Definition.value[key] === "" ) {
                    result = false
                }
            }
            return result
        }

        // Navigate to next page
        const changePage = async () => {
            emit("updatePage", "uploadLogic")
        }

        // Clear the user input
        const clearForm = async () => {
            currencyList.value = null;
            timezoneList.value = null;
            countryList.value = null;
            stateList.value = null;
            districtList.value = null;
            mandalList.value = null;

            instituteInfo.value.foundationDate = null;
            instituteInfo.value.selectedCurrency = { listName: null, listCode: null };
            instituteInfo.value.selectedTimezone = { listName: null, listCode: null };
            instituteInfo.value.selectedCountry = { listName: null, listCode: null };
            instituteInfo.value.selectedState = { listName: null, listCode: null };
            instituteInfo.value.selectedDistrict = { listName: null, listCode: null };
            instituteInfo.value.selectedMandal = { listName: null, listCode: null };

            Global_Definition.value.Institute_Code = null;
            Global_Definition.value.Institute_Name = null;
            Global_Definition.value.Default_Currency = null;
            Global_Definition.value.Default_Time_Zone = null;
            Global_Definition.value.Institute_Foundation_Date = null;
            Global_Definition.value.Working_Days = [{ Day: null, Hour_Open: null, Hour_Close: null }];
            Global_Definition.value.Contact_Telephone = null;
            Global_Definition.value.Institute_Address.Country = null;
            Global_Definition.value.Institute_Address.State = null;
            Global_Definition.value.Institute_Address.District= null;
            Global_Definition.value.Institute_Address.Mandal= null;
            Global_Definition.value.Institute_Address.Street_Address = null;
            Global_Definition.value.Institute_Address.Postal_Code = null;

            nextPage.value = false;
        }

        return  {
            instituteInfo,
            Global_Definition,
            workingDayInfo,
            days,
            currencyList,
            timezoneList,
            countryList,
            stateList,
            districtList,
            mandalList,
            dateSelected,
            validateInput,
            addWorkingDay,
            removeWorkingDay,
            fetchCurrency,
            fetchTimezone,
            fetchCountry,
            fetchState,
            fetchDistrict,
            fetchMandal,
            changePage,
            nextPage,
            clearForm
        }

    }
}
</script>

<style lang="scss" scoped>
@import "./Style/STPWZ.scss";
</style>