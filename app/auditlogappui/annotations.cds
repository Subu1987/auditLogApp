using AuditService as service from '../../srv/auditService';
annotate service.AuditLogsBackup with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'timestamp',
                Value : timestamp,
            },
            {
                $Type : 'UI.DataField',
                Label : 'host',
                Value : host,
            },
            {
                $Type : 'UI.DataField',
                Label : 'port',
                Value : port,
            },
            {
                $Type : 'UI.DataField',
                Label : 'serviceName',
                Value : serviceName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'connectionId',
                Value : connectionId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'clientHost',
                Value : clientHost,
            },
            {
                $Type : 'UI.DataField',
                Label : 'clientIp',
                Value : clientIp,
            },
            {
                $Type : 'UI.DataField',
                Label : 'clientPid',
                Value : clientPid,
            },
            {
                $Type : 'UI.DataField',
                Label : 'clientPort',
                Value : clientPort,
            },
            {
                $Type : 'UI.DataField',
                Label : 'userName',
                Value : userName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'statementUserName',
                Value : statementUserName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'applicationName',
                Value : applicationName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'applicationUserName',
                Value : applicationUserName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'xsApplicationUserName',
                Value : xsApplicationUserName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'auditPolicyName',
                Value : auditPolicyName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'eventStatus',
                Value : eventStatus,
            },
            {
                $Type : 'UI.DataField',
                Label : 'eventLevel',
                Value : eventLevel,
            },
            {
                $Type : 'UI.DataField',
                Label : 'eventAction',
                Value : eventAction,
            },
            {
                $Type : 'UI.DataField',
                Label : 'schemaName',
                Value : schemaName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'objectName',
                Value : objectName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'privilegeName',
                Value : privilegeName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'roleSchemaName',
                Value : roleSchemaName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'roleName',
                Value : roleName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'granteeSchemaName',
                Value : granteeSchemaName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'grantee',
                Value : grantee,
            },
            {
                $Type : 'UI.DataField',
                Label : 'grantable',
                Value : grantable,
            },
            {
                $Type : 'UI.DataField',
                Label : 'fileName',
                Value : fileName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'section',
                Value : section,
            },
            {
                $Type : 'UI.DataField',
                Label : 'keyText',
                Value : keyText,
            },
            {
                $Type : 'UI.DataField',
                Label : 'prevValue',
                Value : prevValue,
            },
            {
                $Type : 'UI.DataField',
                Label : 'value',
                Value : value,
            },
            {
                $Type : 'UI.DataField',
                Label : 'statementString',
                Value : statementString,
            },
            {
                $Type : 'UI.DataField',
                Label : 'comment',
                Value : comment,
            },
            {
                $Type : 'UI.DataField',
                Label : 'originDatabaseName',
                Value : originDatabaseName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'originUserName',
                Value : originUserName,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'timestamp',
            Value : timestamp,
        },
        {
            $Type : 'UI.DataField',
            Label : 'host',
            Value : host,
        },
        {
            $Type : 'UI.DataField',
            Label : 'port',
            Value : port,
        },
        {
            $Type : 'UI.DataField',
            Label : 'serviceName',
            Value : serviceName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'connectionId',
            Value : connectionId,
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View',
    },
);

annotate service.AuditLogsBackup with {
    upload @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'AuditUploads',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : upload_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'fileName',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'recordCount',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'status',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'errorMessage',
            },
        ],
    }
};

