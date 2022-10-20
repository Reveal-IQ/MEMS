<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti K 	         *
*  Date       : 18 JUL 2022        *
*  Version    : 0.14.0	 	         *
************************************
-->
<template>
	<div class="table-container card shadow-2">
		 <table class="table table-striped table-hover table-borderless">
			<thead>
				<tr class=""><td> </td>
					<th v-for="(data, index) in columnData" :key="index" class="py-4">
						<tr>
							<td>
								{{ data.column }}
							</td>
							<td class="px-4 py-1">
								<font-awesome-icon
									v-if="arrowUp"
									icon="arrow-up"
									class="arrowIcon"
									@click="sortTable(data.sortType, 'asc', data.fieldName)"
								/>
								<font-awesome-icon
									v-if="arrowDown"
									icon="arrow-down"
									class="arrowIcon"
									@click="sortTable(data.sortType, 'dsc', data.fieldName)"
								/>
							</td>
						</tr>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(data, index) in tableData"
					:key="index"
					:style="'--color:' + hoverColor"
				>
					<td  class="checkBoxStyle">
						<input 
						  type="checkbox"
                          v-on:click="selectedRowData(index,data)" 
						             
						/>
					</td>


					<td v-for="(dataRow, index) in data" :key="index" class="RowData">
						{{ dataRow }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { ref, toRefs } from "vue";

export default {
	props: {
		columnData: {
			type: Array,
		},
		tableData: {
			type: Array,
		},
		hoverColor: {
			type: String,
			default: "#a6e9d5", // we can provide the default color for hover here
		},
	},
	setup(props) {
		const {tableData, columnData} = toRefs(props)
		const firstColumnFieldName = ref(columnData.value[0].fieldName);
		const firstColumnDataType = ref(columnData.value[0].sortType);
		const firstColumnSortDir = ref("asc");
		const arrowUp = ref(true);
		const arrowDown = ref(false);
		const selectedRow=ref([]);

		// sorting acsending / descending order logic
		function sortTable(dataType, sortingDir, fieldName) {
			if (dataType == "alpha" && sortingDir == "asc") {
				arrowUp.value = false;
				arrowDown.value = true;
				tableData.value.sort((a, b) => {
					let fa = a[`${fieldName}`].toLowerCase(),
						fb = b[`${fieldName}`].toLowerCase();
					if (fa < fb) {
						return 1;
					}
					if (fa > fb) {
						return -1;
					}
					return 0;
				});
			} else if (dataType == "alpha" && sortingDir == "dsc") {
				arrowDown.value = false;
				arrowUp.value = true;
				tableData.value.sort((a, b) => {
					let fa = a[`${fieldName}`].toLowerCase(),
						fb = b[`${fieldName}`].toLowerCase();
					if (fa < fb) {
						return -1;
					}
					if (fa > fb) {
						return 1;
					}
					return 0;
				});
			} else if (dataType == "numeric" && sortingDir == "asc") {
				arrowUp.value = false;
				arrowDown.value = true;
				tableData.value.sort((a, b) => {
					return a[`${fieldName}`] - b[`${fieldName}`];
				});
			} else if (dataType == "numeric" && sortingDir == "dsc") {
				arrowDown.value = false;
				arrowUp.value = true;
				tableData.value.sort((a, b) => {
					return b[`${fieldName}`] - a[`${fieldName}`];
				});
			} else if (dataType == "boolean" && sortingDir == "asc") {
				arrowUp.value = false;
				arrowDown.value = true;
				tableData.value.sort((a, b) => {
					if (a[`${fieldName}`] && !b[`${fieldName}`]) {
						return -1;
					} else if (!a[`${fieldName}`] && b[`${fieldName}`]) {
						return 1;
					} else {
						return 0;
					}
				});
			} else if (dataType == "boolean" && sortingDir == "dsc") {
				arrowDown.value = false;
				arrowUp.value = true;
				tableData.value.sort((a, b) => {
					if (a[`${fieldName}`] && !b[`${fieldName}`]) {
						return 1;
					} else if (!a[`${fieldName}`] && b[`${fieldName}`]) {
						return -1;
					} else {
						return 0;
					}
				});
			}
		}

		// resetting first column of the table in ascending order
		function resetTable() {
			var dataType = firstColumnDataType.value;
			var sortingDir = firstColumnSortDir.value;
			if (dataType == "alpha" && sortingDir == "asc") {
				arrowUp.value = false;
				arrowDown.value = true;
				tableData.value.sort((a, b) => {
					let fa = a[firstColumnFieldName.value].toLowerCase(),
						fb = b[firstColumnFieldName.value].toLowerCase();
					if (fa < fb) {
						return 1;
					}
					if (fa > fb) {
						return -1;
					}
					return 0;
				});
			} else if (dataType == "numeric" && sortingDir == "asc") {
				arrowUp.value = false;
				arrowDown.value = true;
				tableData.value.sort((a, b) => {
					return a[firstColumnFieldName.value] - b[firstColumnFieldName.value];
				});
			} else if (dataType == "boolean" && sortingDir == "asc") {
				arrowUp.value = false;
				arrowDown.value = true;
				tableData.value.sort((a, b) => {
					if (a[`${fieldName}`] && !b[`${fieldName}`]) {
						return -1;
					} else if (!a[`${fieldName}`] && b[`${fieldName}`]) {
						return 1;
					} else {
						return 0;
					}
				});
			}
		}

		function selectedRowData(index,data){
			selectedRow.value.push({index,data});
			console.log(selectedRow.value);
		}

		resetTable();
		return {
			tableData,
			columnData,
			sortTable,
			arrowUp,
			arrowDown,
			resetTable,
			selectedRow,
			selectedRowData
		};
	},
};
</script>

<style lang="scss" scoped>
@import "./../../scss/globalTable.scss";

.arrowIcon {
	font-size: 1.1em;
	color: #878787;
	opacity: 0.8;
}
.arrowIcon:hover {
	color: #878787;
	opacity: 1;
}
tr:hover {
	transition: all 0.5s ease;
	background-color: var(--color);
}
.table-container{
	height: auto;
	max-height: 58vh !important;
	max-width: 91vw !important;
	overflow-y: auto;
	overflow-x: auto;
}
.RegitemptyCheck{
  margin:0 0 0 10px;
  color: white;
  border: 1pt solid #BDC3C7;
  border-radius: 2pt;
}
.Regitticked{
  margin: 0 0 0 10px;
}

.RowData{
	padding-top: 17px !important;
	padding-bottom: 16px !important;
}
.checkBoxStyle{
	padding-top: 21px !important;
	padding-bottom: 21px !important;
}

</style>
