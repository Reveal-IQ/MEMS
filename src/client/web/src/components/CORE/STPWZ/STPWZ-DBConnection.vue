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
      <div v-if="connectionStatus === null || connectionStatus === 'connect'">
        <!-- Page Title -->
        <div class="d-flex flex-row justify-content-between m-2">
          <div>
            <div class="xlargeText fw-bold">Database Connection</div>
            <div class="versionSub">
              Configure database connection credentials
            </div>
          </div>
          <div
            class="bodyText mx-3 text-decoration-underline"
            style="cursor: pointer"
            @click="clearForm"
          >
            Clear Form
          </div>
        </div>
        <!-- Body -->
        <div class="contentPage">
          <!-- Host Details -->
          <div class="d-flex flex-row my-4">
            <div class="col-3">
              <p class="d-flex justify-content-start m-3 largeText">
                Host Details
              </p>
            </div>
            <div class="col-9">
              <div class="d-flex flex-wrap">
                <div
                  class="col-10 col-sm-6 form-floating m-3"
                  style="max-width: 300px"
                >
                  <input
                    type="text"
                    class="form-control"
                    id="host"
                    v-model="dbDetails.Hostname"
                    @focusout="validateInput('Hostname')"
                    placeholder="localhost"
                  />
                  <label for="host">Hostname</label>
                </div>
                <div
                  class="col-10 col-sm-6 form-floating m-3"
                  style="max-width: 300px"
                >
                  <input
                    type="text"
                    class="form-control"
                    id="port"
                    v-model="dbDetails.Port"
                    @focusout="validateInput('Port')"
                    placeholder="6060"
                  />
                  <label for="port">Port</label>
                </div>
                <div
                  class="col-10 col-sm-6 form-floating m-3"
                  style="max-width: 300px"
                >
                  <input
                    type="text"
                    class="form-control"
                    id="uname"
                    v-model="dbDetails.Username"
                    @focusout="validateInput('Username')"
                    placeholder="username"
                  />
                  <label for="uname">Username</label>
                </div>
                <div
                  class="col-10 col-sm-6 form-floating m-3"
                  style="max-width: 300px"
                >
                  <input
                    type="text"
                    class="form-control"
                    id="pass"
                    v-model="dbDetails.Password"
                    @focusout="validateInput('Password')"
                    placeholder="password"
                  />
                  <label for="pass">Password</label>
                </div>
              </div>

              <!--Enable Security-->
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                />
                <label class="form-check-label" for="flexSwitchCheckChecked"
                  >Enable DB Secuirty</label
                >
                
              </div>
            </div>
          </div>

          <hr />
          <!-- Certificate Authority -->
          <div class="d-flex flex-row my-4">
            <div class="col-3">
              <p class="d-flex justify-content-start m-3 largeText">
                Certificate Authority
              </p>
            </div>
            <div class="col-9">
              <div class="d-flex">
                <div class="input-group m-3">
                  <label class="input-group-text" for="caFile">Upload</label>
                  <input
                    type="file"
                    class="form-control"
                    ref="caFile"
                    id="caFile"
                    @input="uploadTLSCAFile"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Client Certificate and Private Key -->
          <div class="d-flex flex-row my-4">
            <div class="col-3">
              <p class="d-flex justify-content-start m-3 largeText">
                Client Certificate and Private Key
              </p>
            </div>
            <div class="col-9">
              <div class="d-flex">
                <div class="input-group m-3">
                  <label class="input-group-text" for="tlsCertKeyFile"
                    >Upload</label
                  >
                  <input
                    type="file"
                    class="form-control"
                    ref="tlsCertKeyFile"
                    id="tlsCertKeyFile"
                    @input="uploadTLSCertificateKeyFile"
                  />
                </div>
              </div>
              <div
                class="col-10 col-sm-6 form-floating m-3"
                style="max-width: 300px"
              >
                <input
                  type="text"
                  class="form-control"
                  id="keyPass"
                  v-model="dbDetails.tlsCertificateKeyFilePwd"
                  @input="validateInput('tlsCertificateKeyFilePwd')"
                  placeholder="password"
                />
                <label for="keyPass">Client Key Password</label>
              </div>
            </div>
          </div>
          <div
            v-if="connectionStatus === 'connect'"
            class="d-flex flex-row justify-content-center my-5"
          >
            <button
              @click="establishConnection"
              class="col-4 p-2 btn btn-success"
            >
              Connect To Database
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="connectionStatus === 'connecting'"
        class="d-flex flex-row justify-content-start my-5"
      >
        <span class="headerText"> Connecting to Database </span>
        <span class="m-1 px-3">
          <font-awesome-icon
            icon="spinner"
            class="headerText fa-spin"
            size="1x"
          />
        </span>
      </div>
      <div
        v-if="connectionStatus === 'connected'"
        class="d-flex flex-row justify-content-start my-5"
      >
        <span class="headerText"> Successfully Connected to Database </span>
        <span class="m-1 px-3">
          <font-awesome-icon
            icon="check-circle"
            class="headerText"
            style="color: green"
            size="1x"
          />
        </span>
      </div>
      <div
        v-if="connectionStatus === 'failed'"
        class="d-flex flex-row justify-content-start my-5"
      >
        <span class="headerText">
          Failed to Establish Database Connection
        </span>
        <span class="m-1 px-3">
          <font-awesome-icon
            icon="exclamation-circle"
            class="headerText"
            style="color: orange"
            size="1x"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { useStore } from "vuex";

export default {
  emits: ["updatePage"],
  setup(props, { emit }) {
    // Store
    const store = useStore();

    // Inject
    const dbDetails = inject("dbDetails");

    // Varaibles
    const caFile = ref(null);
    const tlsCertKeyFile = ref(null);
    const connectionStatus = ref(null); // connect, connecting, connected

    // Validate the user input
    const validateInput = async (inputType) => {
      switch (inputType) {
        case "Hostname":
          // Validate Hostname
          break;
        case "Port":
          // Validate Port
          break;
        case "Username":
          // Validate Username
          break;
        case "Password":
          // Validate Password
          break;
        case "tlsCAFile":
          // Validate tlsCAFile
          break;
        case "tlsCertificateKeyFile":
          // Validate tlsCertificateKeyFile
          break;
        case "tlsCertificateKeyFilePwd":
          // Validate tlsCertificateKeyFilePwd
          break;
        default:
          break;
      }

      // If all the inputs are available then enable connection button
      if (
        dbDetails.value.Hostname != null &&
        dbDetails.value.Hostname != "" &&
        dbDetails.value.Port != null &&
        dbDetails.value.Port != "" &&
        dbDetails.value.Username != null &&
        dbDetails.value.Username != "" &&
        dbDetails.value.Password != null &&
        dbDetails.value.Password != ""
        /*&& dbDetails.value.tlsCertificateKeyFile != null && dbDetails.value.tlsCertificateKeyFile != ""
            && dbDetails.value.tlsCAFile != null && dbDetails.value.tlsCAFile != ""*/
      ) {
        connectionStatus.value = "connect";
      } else {
        connectionStatus.value = null;
      }
    };

    // Read the Certificate Authority file
    const uploadTLSCAFile = async (e) => {
      let selectedFile = e.target.files[0];
      if (selectedFile) {
        let reader = new FileReader();
        reader.onload = (event) => {
          dbDetails.value.tlsCAFile = event.target.result;
          validateInput("tlsCAFile");
        };
        reader.readAsText(selectedFile);
      }
    };

    // Read the Client Certificate Key file
    const uploadTLSCertificateKeyFile = async (e) => {
      let selectedFile = e.target.files[0];
      if (selectedFile) {
        let reader = new FileReader();
        reader.onload = (event) => {
          dbDetails.value.tlsCertificateKeyFile = event.target.result;
          validateInput("tlsCertificateKeyFile");
        };
        reader.readAsText(selectedFile);
      }
    };

    // To Establish Database Connection
    const establishConnection = async () => {
      // Update the connection status to connecting
      connectionStatus.value = "connecting";

      // Construct request packet
      var req = {
        Expiry: 20000,
        Type: "REQUEST",
        Request: {
          Module: "CORE",
          ServiceCode: "STPWZ",
          API: "Establish_DB_Connection",
          Hostname: dbDetails.value.Hostname,
          Port: dbDetails.value.Port,
          Username: dbDetails.value.Username,
          Password: dbDetails.value.Password,
          tlsCertificateKeyFile: dbDetails.value.tlsCertificateKeyFile,
          tlsCAFile: dbDetails.value.tlsCAFile,
          ...(dbDetails.value.tlsCertificateKeyFilePwd &&
            dbDetails.value.tlsCertificateKeyFilePwd != null && {
              tlsCertificateKeyFilePwd:
                dbDetails.value.tlsCertificateKeyFilePwd,
            }),
        },
      };

      // Send Request
      let res = await store.dispatch("sendHTTPReq", req);

      // Handle Response
      if (
        res.Type === "RESPONSE" &&
        res.Response.Connection === "Established"
      ) {
        connectionStatus.value = "connected"; // Update the connection status to connected
        setTimeout(() => {
          emit("updatePage", "instituteInfo"); // Update the component state to instituteInfo
        }, 1000);
      } else {
        connectionStatus.value = "failed"; // Update the connection status to failed
      }
    };

    // Clear the user input
    const clearForm = () => {
      connectionStatus.value = null;
      dbDetails.value.Hostname = null;
      dbDetails.value.Port = null;
      dbDetails.value.Username = null;
      dbDetails.value.Password = null;
      dbDetails.value.tlsCertificateKeyFile = null;
      dbDetails.value.tlsCAFile = null;
      dbDetails.value.tlsCertificateKeyFilePwd = null;
      caFile.value.type = "text";
      caFile.value.type = "file";
      tlsCertKeyFile.value.type = "text";
      tlsCertKeyFile.value.type = "file";
    };

    return {
      dbDetails,
      validateInput,
      establishConnection,
      uploadTLSCAFile,
      uploadTLSCertificateKeyFile,
      connectionStatus,
      caFile,
      tlsCertKeyFile,
      clearForm,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./Style/STPWZ.scss";
</style>