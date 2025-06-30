using { cuid, managed } from '@sap/cds/common';

namespace auditLogSpace;

//--------------------------------------------------
// 👤 User Table: Stores login info (1 user → many uploads)
//--------------------------------------------------
entity Users : cuid, managed {
  username     : String(100);
  passwordHash : String;
  email        : String;
  lastLogin    : Timestamp;

  // One-to-many relationship: A user can upload many files
  uploads      : Composition of many AuditUploads on uploads.uploadedBy = $self;
}

//--------------------------------------------------
// 📁 AuditUploads Table: Metadata per uploaded CSV (1 upload → many log records)
//--------------------------------------------------
entity AuditUploads : cuid, managed {
  fileName     : String;
  uploadedBy   : Association to Users;
  recordCount  : Integer;
  status       : String enum { PENDING; SUCCESS; FAILED; };
  errorMessage : String;

  // One-to-many relationship: One upload has many logs
  logs         : Composition of many AuditLogsBackup on logs.upload = $self;
}

//--------------------------------------------------
// 📋 AuditLogsBackup Table: Actual parsed log data from uploaded CSV
//--------------------------------------------------
entity AuditLogsBackup : cuid {
  timestamp             : Timestamp;
  host                  : String;
  port                  : String;
  serviceName           : String;
  connectionId          : String;
  clientHost            : String;
  clientIp              : String;
  clientPid             : String;
  clientPort            : String;
  userName              : String;
  statementUserName     : String;
  applicationName       : String;
  applicationUserName   : String;
  xsApplicationUserName : String;
  auditPolicyName       : String;
  eventStatus           : String;
  eventLevel            : String;
  eventAction           : String;
  schemaName            : String;
  objectName            : String;
  privilegeName         : String;
  roleSchemaName        : String;
  roleName              : String;
  granteeSchemaName     : String;
  grantee               : String;
  grantable             : String;
  fileName              : String;
  section               : String;
  keyText               : String;
  prevValue             : String;
  value                 : String;
  statementString       : String;
  comment               : String;
  originDatabaseName    : String;
  originUserName        : String;

  // Foreign key: which upload this log came from
  upload : Association to AuditUploads;
}
