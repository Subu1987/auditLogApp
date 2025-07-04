sap.ui.define([
  "sap/m/Dialog",
  "sap/m/VBox",
  "sap/m/Button",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/ui/unified/FileUploader"
], function (Dialog, VBox, Button, MessageToast, MessageBox, FileUploader) {
  "use strict";

  return {
    _uploadDialog: null,
    _selectedFile: null,
    _fileBase64: null,

    onUploadPress: function () {
      const that = this;

      function onFileChange(oEvent) {
        const oFile = oEvent.getParameter("files")[0];
        if (!oFile) return;

        // 🚫 Optional: Limit file size to 5MB
        if (oFile.size > 5 * 1024 * 1024) {
          MessageBox.warning("⚠️ File too large. Please upload files under 5MB.");
          return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
          try {
            const base64String = e.target.result.split(",")[1]; // strip data URL prefix
            that._fileBase64 = base64String;
            that._selectedFile = oFile;

            MessageToast.show("📁 File selected: " + oFile.name);
          } catch (err) {
            MessageBox.error("❌ Error reading file: " + err.message);
          }
        };

        reader.readAsDataURL(oFile); // ✅ Safe way to get base64
      }

      async function onConfirmUpload() {
        if (!that._selectedFile || !that._fileBase64) {
          MessageToast.show("⚠️ Please select a file first.");
          return;
        }

        try {
          const response = await fetch("/odata/v4/audit/uploadAuditLog", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              fileName: that._selectedFile.name,
              file: that._fileBase64
            })
          });

          const result = await response.json();

          if (response.ok) {
            MessageToast.show(result.status || "✅ Upload complete");

            // console.log("Refreshing table for AuditLogsBackup");
            // that.extensionAPI.refresh("AuditLogsBackup");

            // // Get the Fiori Elements List Report view and refresh it
            // const oTable = this.base.getView().byId("fe::table::AuditLogsBackup");
            // if (oTable && oTable.getBinding("items")) {
            //   oTable.getBinding("items").refresh();
            // } else {
            //   // fallback to model refresh
            //   this.base.getView().getModel().refresh(true);
            // }

          } else {
            MessageBox.error("❌ Upload failed: " + result.error?.message || "Unknown error.");
          }
        } catch (err) {
          MessageBox.error("❌ Upload error: " + err.message);
        }

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
