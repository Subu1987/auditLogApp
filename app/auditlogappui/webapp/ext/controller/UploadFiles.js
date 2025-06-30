sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (MessageToast, Fragment) {
    "use strict";

    return {
        onUploadPress: function () {
            // Initialize dialog promise if needed
            if (!this._pUploadDialog) {
                this._pUploadDialog = Fragment.load({
                    name: "com.infocus.auditlogappui.ext.fragment.UploadDialog",
                    controller: this
                }).then(function(oDialog) {
                    // Store dialog reference
                    this._uploadDialog = oDialog;
                    
                    // Programmatically attach event handlers
                    this._attachDialogEvents(oDialog);
                    
                    return oDialog;
                }.bind(this));
            }
            
            // Open dialog
            this._pUploadDialog.then(function(oDialog) {
                oDialog.open();
            });
        },

        // Centralized event attachment method
        _attachDialogEvents: function(oDialog) {
            // Get buttons from dialog structure
            const cancelButton = oDialog.getEndButton();
            const uploadButton = oDialog.getBeginButton();
            const fileUploader = oDialog.getContent()[0].getItems()[0];
            
            // Attach event handlers programmatically
            cancelButton.attachPress(this.onCancelPress.bind(this));
            uploadButton.attachPress(this.onFileUpload.bind(this));
            fileUploader.attachChange(this.onFileSelected.bind(this));
            
            // Add afterClose handler
            oDialog.attachAfterClose(function() {
                oDialog.destroy();
                this._uploadDialog = null;
                this._pUploadDialog = null;
            }.bind(this));
        },

        onCancelPress: function() {
            MessageToast.show("Cancel button pressed!");
            if (this._uploadDialog) {
                this._uploadDialog.close();
            }
        },

        onFileUpload: function() {
            if (!this._uploadDialog) return;
            
            const fileUploader = this._uploadDialog.getContent()[0].getItems()[0];
            
            if (!fileUploader.getValue()) {
                MessageToast.show("Please select a file first");
                return;
            }
            
            // Add your upload logic here
            MessageToast.show("Uploading file...");
            fileUploader.upload();
        },

        onFileSelected: function(oEvent) {
            MessageToast.show("File selected: " + oEvent.getParameter("name"));
        }
    };
});