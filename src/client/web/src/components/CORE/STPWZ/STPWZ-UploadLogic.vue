<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 01 SEP 2021        *
*  Version    : 0.1.0.02.19-0921   *
************************************
-->
<template>
    <div class="row justify-content-center">
        <div class="col col-lg-9 my-3 px-5">
            <div class="d-flex flex-row justify-content-between m-2">
                <div>
                    <div class="xlargeText fw-bold"> Upload Workflow and Cost Code </div>
                    <div class="versionSub"> Upload workflow logic and cost code documents </div>
                </div>
                <div class="bodyText mx-3 text-decoration-underline" style="cursor: pointer;" @click="clearForm">Clear Form</div>
            </div>
            <div class="contentPage">
                <!-- Logic upload -->
                <div class="d-flex flex-row my-4">
                    <div class="col-3">
                        <p class="d-flex justify-content-start m-3 largeText">
                            Workflow Logic
                        </p>
                    </div>
                    <div class="col-9">
                        <div class="d-flex">
                            <div class="input-group m-3">
                                <label class="input-group-text" for="workflowLogic">Upload</label>
                                <input type="file" class="form-control" ref="workflowLogic" id="workflowLogic" @input="uploadWorkflowFile">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Cost Code Upload -->
                <div class="d-flex flex-row my-4">
                    <div class="col-3">
                        <p class="d-flex justify-content-start m-3 largeText">
                            Cost Code
                        </p>
                    </div>
                    <div class="col-9">
                        <div class="d-flex">
                            <div class="input-group m-3">
                                <label class="input-group-text" for="costCode">Upload</label>
                                <input type="file" class="form-control" ref="costCode" id="costCode" @input="uploadCostCodeFile">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Navigation Buttons -->
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
import xlsx from "xlsx";

export default {

    emits: ["updatePage"],

    setup(props, { emit }){

        // Inject
        const uploadLogic = inject('uploadLogic');

        // Varaibles
        const workflowLogic = ref(null);
        const costCode = ref(null);
        const nextPage = ref(false);

        // Read the Workflow file
        const uploadWorkflowFile = async (e) => {
            try {
                // Get the details of selected file
                let selectedFile = e.target.files[0]

                // Convert the excel file to json
                if(selectedFile){
                    uploadLogic.value.Workflow_File_Name = selectedFile.name; // Get file name
                    
                    let reader = new FileReader(); // Create reader object to read the excel file
                    
                    // Convert the dinary data to JSON using xlsx
                    reader.onload = (event) => {
                        let data = event.target.result;
                        
                        // Parse the excel file in binary to workbook in JSON format
                        const workbook = xlsx.read(data, {
                            type: "binary"
                        });

                        var jsondata = [] // To store all the logics
                        var names = [] // To store all the workflow names

                        // Convert data in each sheet to JSON
                        workbook.SheetNames.forEach( sheetName => {
                            names = names.concat(sheetName);
                            let rowObject = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
                            rowObject.map(logic => logic["Workflow"] = sheetName); // Add Workflow property to each logic present in rawObject
                            jsondata = jsondata.concat(rowObject);
                        });
                        uploadLogic.value.Work_Flows = names;
                        uploadLogic.value.Workflow = jsondata;
                        validateInput("Workflow");
                    }
                    reader.onerror = function (ex) {
                        console.log(ex)
                    }

                    // Convert the excel file to binary
                    reader.readAsBinaryString(selectedFile);
                }
            } catch (error) {
                console.log(error);
            }
        }

        // Read the Cost Code file
        const uploadCostCodeFile = async (e) => {
            try {
                // Get the details of selected file
                let selectedFile = e.target.files[0]

                // Convert the excel file to json
                if(selectedFile){
                    uploadLogic.value.Cost_Code_File_Name = selectedFile.name; // Get file name
                    
                    let reader = new FileReader();  // Create reader object to read the excel file

                    // Convert the binary data to JSON using xlsx
                    reader.onload = (event) => {
                        let data = event.target.result;

                        // Parse the excel file in binary to workbook in JSON format
                        const workbook = xlsx.read(data, {
                            type: "binary"
                        });

                        var jsondata = [] // To store all the cost codes

                        // Convert data in each sheet to JSON
                        workbook.SheetNames.forEach( sheetName => {
                            let rowObject = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
                            jsondata = jsondata.concat(rowObject);
                        });
                        uploadLogic.value.Cost_Code = jsondata;
                        validateInput("Cost_Code");
                    }
                    reader.onerror = function (ex) {
                        console.log(ex)
                    }

                    // Convert the excel file to binary
                    reader.readAsBinaryString(selectedFile);
                } 
            } catch (error) {
                console.log(error);
            }
        }

        // Validate the user input
        const validateInput = async (inputType) => {
            switch (inputType) {
                case "Workflow":
                    // Validate Workflow
                    try {
                        uploadLogic.value.Workflow.forEach(logic => {
                            // Convert Prerequisites from String to an Array of strings
                            if(logic.hasOwnProperty("Prerequisites")){
                                logic.Prerequisites = logic.Prerequisites.includes(",") ? logic.Prerequisites.split(',').map(key => key.trim()): [logic.Prerequisites.trim()];
                            }
                            if(logic.hasOwnProperty("Trigger")){
                                let trigger = logic.Trigger.split(':');
                                logic.Trigger = {}; // Create Trigger object
                                if(trigger[0].trim() == "Action"){
                                    logic.Trigger["Action"] = trigger[1].trim(); // Trigger.Action = "Action_Method_Name"
                                } else if(trigger[0].trim() == "Logic_ID"){
                                    logic.Trigger["Logic_ID"] = trigger[1].includes(",") ? trigger[1].split(',').map(key => key.trim()): [trigger[1].trim()]; // Trigger.Logic_ID = [ "Logic_ID", ... ]
                                }
                            }
                        });
                    } catch (error) {
                        // Handle error
                        alert("Failed to upload Workflow, please check and try again.");
                        clearForm();
                    }
                    break;
                case "Cost_Code":
                    // Validate Cost_Code
                    break;
                default:
                    break;
            }

            // If all the inputs are available next button
            if(checkLogicInput()){
                nextPage.value = true;
            } else {
                nextPage.value = false;
            }
        }

        // Check if the fields are empty
        const checkLogicInput = () => {
            let result = true;
            for (const key in uploadLogic.value) {
                if (uploadLogic.value[key] === null || uploadLogic.value[key] === "" ) {
                    result = false;
                }
            }
            return result;
        }

        // Navigate to previous page
        const goBack = async () => {
            emit("updatePage", "instituteInfo")
        }
        
        // Navigate to next page
        const changePage = async () => {
            emit("updatePage", "userInfo")
        }

        // Clear the user input
        const clearForm = async () => {
            uploadLogic.value.Work_Flows = null;
            uploadLogic.value.Workflow_File_Name = null;
            uploadLogic.value.Workflow = null;
            uploadLogic.value.Cost_Code_File_Name = null;
            uploadLogic.value.Cost_Code = null;
            workflowLogic.value.type ='text';
            workflowLogic.value.type ='file';
            costCode.value.type ='text';
            costCode.value.type ='file';
            nextPage.value = false;
        }

        return{
            uploadLogic,
            uploadWorkflowFile,
            uploadCostCodeFile,
            goBack,
            changePage,
            nextPage,
            workflowLogic,
            costCode,
            clearForm
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./Style/STPWZ.scss";
</style>