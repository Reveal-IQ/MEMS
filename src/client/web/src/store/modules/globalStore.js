/*
 ************************************
 *  Created By : Reveal IQ          *
 *  Author     : Sudheer            *
 *  Date       : 15 MAY 2021        *
 *  Version    : 0.1.0.00.05-1221   *
 ************************************
 */
const globalStore = {
	state: () => ({
		UserInfo: null,
		tablist: [],
		tabidList: [],
		ActiveApp: {
			App_Name: "",
			App_Code: "",
			App_Icon: "",
			TabCode: "",
		},
		appState: { USLGN: "Home" },
		globalNotifications: [],
	}),
	mutations: {
		// for changing appState value
		CHANGE_SERVICE_STATE(state, payload) {
			if (!payload.tabcode) {
				state.appState[payload.service] = payload.status;
			} else {
				// eslint-disable-next-line no-prototype-builtins
				if (!state.appState.hasOwnProperty(payload.service)) {
					state.appState[payload.service] = {};
				}
				state.appState[payload.service][payload.tabcode] = payload.status;
			}
		},
		UPDATE_USER_INFO(state, value) {
			state.UserInfo = value;
		},
		UPDATE_ACTIVE_APP(state, val) {
			state.ActiveApp = val;
		},
		RESET_ACTIVE_APP(state) {
			state.ActiveApp = state.tablist[0];
		},
		CREATE_TAB(state, tab) {
			state.tablist.push(tab);
			state.ActiveApp = tab;
		},
		// to close Opened Tabs
		CLOSE_TAB(state, app) {
			for (var i = 0; i < state.tablist.length; i++) {
				if (state.tablist[i].TabCode == app.TabCode) {
					state.tablist.splice(i, 1);
				}
			}
			// eslint-disable-next-line no-prototype-builtins
			if (state.appState[app.App_Code].hasOwnProperty(app.TabCode)) {
				delete state.appState[app.App_Code][app.TabCode];
			}
		},
		// to store tabid for creating unique tabid's everytime
		ADD_TABID(state, payload) {
			state.tabidList.push(payload);
		},
		// to Notify the User with notification message
		ADD_NOTIFICATION(state, payload) {
			state.globalNotifications.push(payload);
		},
		// to Remove the active notification message
		REMOVE_NOTIFICATION(state, payload) {
			var Index = state.globalNotifications.findIndex(
				(obj) => obj.messageCode === payload.messageCode
			);
			state.globalNotifications.splice(Index, 1);
		},
		// to Remove all the active notification messages
		RESET_GLOBAL_NOTIFICATIONS(state) {
			state.globalNotifications = [];
		},
	},
	actions: {
		// for changing appState value
		changeServiceState({ commit }, payload) {
			commit("CHANGE_SERVICE_STATE", payload);
			commit("RESET_GLOBAL_NOTIFICATIONS");
		},
		// for preserving user details
		UpdateUserInfo({ commit }, value) {
			commit("UPDATE_USER_INFO", value);
		},
		// to close Opened Tabs
		closeTab({ commit }, payload) {
			commit("CLOSE_TAB", payload);
			commit("RESET_ACTIVE_APP");
		},
		// to store tabid for creating unique tabid's everytime
		addTabid({ commit }, payload) {
			commit("ADD_TABID", payload);
		},
		// for opening tab
		createTab({ commit }, payload) {
			commit("CREATE_TAB", payload);
		},
		// for updating the active App when user selects app
		updateActiveTab({ commit }, payload) {
			commit("UPDATE_ACTIVE_APP", payload);
		},
		// for Adding and Removing Notifications
		publishNotification({ commit }, payload) {
			setTimeout(() => {
				commit("REMOVE_NOTIFICATION", payload);
			}, payload.messageExpiry);
			payload.messageExpiry = `${payload.messageExpiry / 1000}` + "s";
			commit("ADD_NOTIFICATION", payload);
		},
	},
};
export default globalStore;
