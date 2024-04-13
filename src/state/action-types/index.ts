export enum ActionType {
    PROJECTS_LOAD_START = "projects_load_start",
    PROJECTS_LOAD_FAILURE = "projects_load_failure",
    PROJECTS_LOAD_SUCCESS = "projects_load_success",
    PROJECTS_CREATE_NEW =  "projects_create_new",
    PROJECTS_CHANGE_TITLE = "projects_change_title",
    PROJECTS_ADD_DESCR = "projects_add_descr",
    PROJECTS_DELETE = "projects_delete",

    MOVE_CELL = "move_cell",
    DELETE_CELL = "delete_cell",
    INSERT_CELL_AFTER = "insert_cell_after",
    UPDATE_CELL = "update_cell",


    BUNDLE_START = "bundle_start",
    BUNDLE_COMPLETE= "bundle_complete",


    USER_AUTH_START = "user_auth_start",
    USER_AUTH_COMPLETE = "user_auth_complete",
    USER_SIGNED_OUT = "user_signed_out",
    USER_CREDENTIAL_UPDATE_SUCESS = "user_credentials_update_success",
    REMOVE_NEW_USER_HELPER = "remove_new_user_helper",

    NOTIFICATION_ADD = "notification_add",
    NOTIFICATION_REMOVE = "notification_remove"
}