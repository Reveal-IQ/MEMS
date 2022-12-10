<template>
  <div class="container-fluid" style="max-height:100vh;overflow-y:scroll;">
    <div class="row mx-auto my-3" style="max-width:600px">
      <div class="col-10 input-group my-4">
        <input type="file" class="form-control" ref="inputYamlFile" id="inputYamlFile" @change="onFileChange">
        <label class="input-group-text" for="inputYamlFile">Upload YAML File</label>
      </div>
      <div class="row">
        <div class="col" align="center">
          <button type="button" class="btn btn-danger" @click="clear()">Clear</button>
        </div>
        <div class="col" align="center">
          <button type="button" class="btn btn-primary" @click="sendAllReq()">Send All</button>
        </div>
        <div class="col" align="center">
          <button type="button" class="btn btn-success" @click="printWindow()">Print</button>
        </div>
      </div>
    </div>
    <div class="row" id="section-to-print">
      <div class="file pt-2 mx-auto" style="max-width: 100vw;">
        <table class="table table-bordered caption-top" v-for="(service, serviceCode) in yamlFile" :key="service.index">
          <caption>{{ serviceCode }}</caption>
          <thead>
            <tr>
              <th scope="col" v-for="field in fielddata" :key="field.index">{{ field }}</th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="(test, testCode) in service" :key="test.index">
              <th scope="row" class="sno py-3"> {{ testCode.slice(5) }} </th>
              <td class="testInfo" style="min-width: 150px; max-width: 20vw;"> 
                <div class="testName py-2"> 
                  <b>Name:</b> {{ test.TESTNAME }} 
                </div>
                <div class="testDescription py-2"> 
                  <b>Description:</b> {{ test.DESCRIPTION }} 
                </div>
                <div v-if="test.RESPONSE">
                  <div class="duration py-2"> 
                    <b>Duration:</b> {{ test.DURATION }} ms
                  </div>
                  <div class="result py-2" style="user-select: none;"> 
                    <b>Result:</b>
                    <span v-if="test.USERVERIFY" style="cursor: pointer;">
                      <span class="text-success mx-2 font-weight-bolder" v-on:click="test.RESULT = false" v-if="test.RESULT"> <b>PASS</b> </span>                
                      <span class="text-danger mx-2 font-weight-bolder" v-on:click="test.RESULT = true" v-else-if="test.RESULT === false"> <b>FAIL</b> </span>
                      <font-awesome-icon icon="question" class="mx-2" v-on:click="test.RESULT = true" v-else style="font-size:18px; color:orange;"/>
                    </span>
                    <span v-else>
                      <span class="text-success mx-2 font-weight-bolder" v-on:click="test.USERVERIFY = true" v-if="compareRes(JSON.parse(JSON.stringify(test.OUTPUT)), JSON.parse(JSON.stringify(test.RESPONSE)))"> <b>PASS</b> </span>
                      <span v-else style="cursor: pointer;">
                        <span class="text-success mx-2 font-weight-bolder" v-on:click="test.RESULT = false" v-if="test.RESULT"> <b>PASS</b> </span>                
                        <span class="text-danger mx-2 font-weight-bolder" v-on:click="test.RESULT = true" v-else-if="test.RESULT === false"> <b>FAIL</b> </span>
                        <font-awesome-icon icon="question" class="mx-2" v-on:click="test.RESULT = true" v-else style="font-size:18px; color:orange;"/>
                      </span>
                    </span>
                  </div>
                </div>
              </td>
              <td class="request" style="min-width: 250px; max-width: 25vw">
                <div> 
                  <pre> {{ resolveMedia(test, "INPUT") }} </pre>
                    <div v-if="test.INPUTMEDIA">
                      <div v-for="image in test.INPUTMEDIA" :key="image.index">
                        <span> {{ image.name }}: </span> <img :src="image.src" class="mx-2" style="margin:7vh 0 6vh 0; border-radius:50%; height:5vh; width:5vh; background:#C4C4C4;"/>
                      </div>
                    </div> 
                </div>
              </td>
              <td class="expResponse" style="min-width: 250px; max-width: 25vw">
                <div>
                  <pre> {{ resolveMedia(test, "OUTPUT") }} </pre>
                    <div v-for="image in test.OUTPUTMEDIA" :key="image.index">
                      <span> {{ image.name }}: </span> <img :src="image.src" class="mx-2" style="margin:7vh 0 6vh 0; border-radius:50%; height:5vh; width:5vh; background:#C4C4C4;"/>
                    </div>
                </div>
              </td>
              <td class="actResponse" style="min-width: 250px; max-width: 25vw"> 
                <div v-if="!test.RESPONSE">
                  <button type="button" class="btn btn-secondary" @click="sendReq(serviceCode, testCode)">Send</button>
                </div>
                <div v-else>
                <pre> {{ resolveMedia(test, "RESPONSE") }} </pre>
                  <div v-for="image in test.RESPONSEMEDIA" :key="image.index">
                    <span> {{ image.name }}: </span> <img :src="image.src" class="mx-2" style="margin:7vh 0 6vh 0; border-radius:50%; height:5vh; width:5vh; background:#C4C4C4;"/>
                  </div> 
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import yaml  from 'js-yaml';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faQuestion } from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faQuestion);

export default {
    name: 'TESTS',
    data() {
      return {
        fielddata:['SNO', 'Information', 'Request', 'Expected Response', 'Actual Response'],
        yamlFile:null,
        file:null,
      }
    },
    created(){
      document.title = "API Test Tool"
    },
  methods:{
    ...mapActions(['sendHTTPReq', 'createConnection', 'sendSocketReq']),

    onFileChange(e) {
        this.file = e.target.files[0]; //e.target.files
        var reader = new FileReader();
        reader.onload = (e) => {
            this.yamlFile = yaml.safeLoad(e.target.result); //e.target.result
            console.log(this.yamlFile);
            console.log(JSON.stringify(this.yamlFile, null, 4));
        }
        reader.readAsText(this.file);
    },

    // To send all the request
    async sendAllReq(){
      try{
          for (const serviceCode in this.yamlFile) {
            console.log(serviceCode)
            for (const testCode in this.yamlFile[serviceCode]) {
              if(this.yamlFile[serviceCode][testCode].ACTION === "HTTP") this.handleHTTPReq(this.yamlFile[serviceCode][testCode])
              else if(this.yamlFile[serviceCode][testCode].ACTION === "WS") this.handleSocketReq(this.yamlFile[serviceCode][testCode])
              else this.handleOtherReq(this.yamlFile[serviceCode][testCode]);
            }
          }
        } catch(err){
            console.log("Error in sendAllReq: ", err)
        }
    },

    // To send request of given service code
    async sendServiceReq(serviceCode){
        try{
          for (const testCode in this.yamlFile[serviceCode]) {
            if(this.yamlFile[serviceCode][testCode].ACTION === "HTTP") this.handleHTTPReq(this.yamlFile[serviceCode][testCode])
            else if(this.yamlFile[serviceCode][testCode].ACTION === "WS") this.handleSocketReq(this.yamlFile[serviceCode][testCode])
            else this.handleOtherReq(this.yamlFile[serviceCode][testCode]);
          }
        } catch(err){
            console.log("Error in sendServiceReq: ", err)
        }
    },

    //

    // To process request
    async sendReq(serviceCode, testCode){
        try{
            if(this.yamlFile[serviceCode][testCode].ACTION === "HTTP") this.handleHTTPReq(this.yamlFile[serviceCode][testCode])
            else if(this.yamlFile[serviceCode][testCode].ACTION === "WS") this.handleSocketReq(this.yamlFile[serviceCode][testCode])
            else this.handleOtherReq(this.yamlFile[serviceCode][testCode]);
        } catch(err){
            console.log("Error in sendReq: ", err)
        }
    },

    // To send HTTP request
    async handleHTTPReq(test){
        // Send request packet
        let res = await this.sendHTTPReq(test.INPUT);

        // Handle respone packet
        test.RESPONSE = res;
        test.DURATION = Date.now() - parseInt(test.INPUT.DateTime);
    },

    // To send Socket request
    async handleSocketReq(test){
        console.log("Test Req packet -->" + JSON.stringify(test.INPUT, undefined ,4))
        // Send request packet
        this.sendSocketReq({
          data: test.INPUT, 
          callback: (res) => { // Handle respone packet
            test.RESPONSE = res;
            test.DURATION = Date.now() - parseInt(test.INPUT.DateTime);
          }
        })
        
    },

    async handleOtherReq(test){
      // Send request packet
      let datatime = JSON.parse(JSON.stringify(Date.now()));
      this[test.ACTION]({
        data: test.INPUT,
        callback: (res) => { // Handle respone packet
          test.RESPONSE = res;
          test.DURATION = JSON.parse(JSON.stringify(Date.now() - datatime));
        }
      });
    },

    // Clear the Yaml File
    clear(){
      this.$refs.inputYamlFile.value = '';
      Object.assign(this.$data, this.$options.data.call(this));
    },

    printWindow(){
        window.print()
    },

    // To compare the Expected Packet with Response Packet
    compareRes(expRes, actRes){
      try{
        console.log("Check Result", expRes, actRes);

        // Compare each field present of Expected response packet with the Actual Response packet
        const expResKeys = Object.keys(expRes);

        for (let resKey of expResKeys) {
            if (expRes[resKey] !== actRes[resKey]) {
                if(typeof expRes[resKey] == "object" && typeof actRes[resKey] == "object") {
                    if(!this.compareRes(expRes[resKey], actRes[resKey])) {
                        console.log(expRes[resKey], actRes[resKey])
                        return false;
                    }
                } 
                else {
                    console.log(expRes[resKey], actRes[resKey])
                    return false;
                }
            }
        }

        return true;

      } catch(err){
        console.log("Error in Result Check: ", err)
        return false
      }
    },

    // Add Image tags to the Image data to dispaly images at their places
    resolveMedia(test, field){
      console.log("Resolve Media of: ", test, field)
      console.log([field])
      console.log(test.MEDIA.hasOwnProperty([field]))
      if(test.MEDIA && test.MEDIA.hasOwnProperty([field])) {
        test[`${field}MEDIA`] = [];
        // Screen through each Key present in the field
        // Screen through each nested key present in the Object and Array of objects
        // If you find the fields that are provided in MEDIA then replace it with an Image.
        var testObjCopy = JSON.parse(JSON.stringify(test[field]))
        var mediaCount = 0;
        this.findProperty(test, testObjCopy, field, mediaCount);
        console.log("Response : ", testObjCopy)
        return testObjCopy;
      } else{
        return JSON.parse(JSON.stringify(test[field]));
      }
    },

    async findProperty (test, testObjCopy, field, mediaCount){
        let mediaPromises = Object.keys(testObjCopy).map(async (key) => {
          if(typeof testObjCopy[key] === 'object'){
            console.log('key: '+ key + ', value: '+ testObjCopy[key]);
            await this.findProperty(test, testObjCopy[key], field, mediaCount)
          } else if(test.MEDIA[field].includes(key)){
            mediaCount ++;

            test[`${field}MEDIA`].push({
              name: `Image ${mediaCount}`,
              src: testObjCopy[key]
            });

            testObjCopy[key] = `Image ${mediaCount}`;
          }
        })
        await Promise.all(mediaPromises);
        return testObjCopy
    }

  },

  computed: mapState(["tabCode","ActiveApp"]),
}
</script>

<style>

@media print {
  body * {
    visibility: hidden;
  }
  #section-to-print, #section-to-print * {
    visibility: visible;
  }
  #section-to-print {
    position: absolute;
    left: 0;
    top: 0;
  }
  thead { display: table-row-group;}
  tfoot { display: table-row-group; }
  tr { page-break-inside: avoid; }
}
.container-fluid::-webkit-scrollbar {
  display: none;
}

pre {
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
</style>