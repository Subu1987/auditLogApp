sap.ui.define([
  "sap/m/Dialog",
  "sap/m/VBox",
  "sap/m/Button",
  "sap/m/MessageToast",
  "sap/ui/unified/FileUploader"
], function (Dialog, VBox, Button, MessageToast, FileUploader) {
  "use strict";

  return {
    _uploadDialog: null,
    _selectedFile: null,

    onUploadPress: function () {
      const that = this;

      function onFileChange(oEvent) {
        const oFile = oEvent.getParameter("files")[0];
        if (oFile) {
          that._selectedFile = oFile;
          MessageToast.show("📁 File selected: " + oFile.name);
        }
      }

      async function onConfirmUpload() {
        if (!that._selectedFile) {
          MessageToast.show("Please select a file.");
          return;
        }

        const file = that._selectedFile;
        const reader = new FileReader();

        reader.onload = async function (e) {
          const base64Data = e.target.result.split(",")[1];

          try {
            const response = await fetch("/odata/v4/audit/uploadAuditLog", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                fileName: file.name,
                file: base64Data
              })
            });

            const result = await response.json();

            if (response.ok) {
              MessageToast.show(result.status || "✅ Upload complete");
            } else {
              MessageToast.show("❌ Upload failed: " + result.error?.message);
            }
          } catch (err) {
            MessageToast.show("❌ Error: " + err.message);
          }
        };

        reader.readAsDataURL(file); // Converts file to base64
        that._uploadDialog.close();
      }

      function onCloseDialog() {
        that._uploadDialog.close();
      }

      if (!that._uploadDialog) {
        that._uploadDialog = new Dialog({
          title: "Upload Audit File",
          draggable: true,
          resizable: true,
          contentWidth: "400px",
          contentHeight: "200px",
          content: [
            new VBox({
              class: "sapUiSmallMargin",
              items: [
                new FileUploader({
                  name: "uploadFile",
                  width: "100%",
                  fileType: ["csv", "xlsx"],
                  placeholder: "Choose a file...",
                  uploadOnChange: false,
                  useMultipart: false,
                  change: onFileChange
                })
              ]
            })
          ],
          beginButton: new Button({
            text: "Upload",
            type: "Emphasized",
            press: onConfirmUpload
          }),
          endButton: new Button({
            text: "Cancel",
            press: onCloseDialog
          })
        });
      }

      that._uploadDialog.open();
    }
  };
});
