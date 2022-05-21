"use strict";
 
/**
 * Get unique error field name
 */
const uniqueMessage = error => {
    let output;
    console.log(error.message);
    try {
        let fieldName = error.message.substring(
            error.message.lastIndexOf("index:")+7,
            error.message.lastIndexOf("_1")
        );
        console.log(fieldName);
        output =
            fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1) +
            " already exists";
    } catch (ex) {
        output = "Unique field already exists";
    }
 
    return output;
};
 
/**
 * Get the erroror message from error object
 */
export const errorHandler = error => {
    let message = "";
 
    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default:
                message = "Something went wrong";
        }
    } else {
        message = error._message;
    }

    return message;
};