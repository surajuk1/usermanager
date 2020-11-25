define({ "api": [
  {
    "type": "post",
    "url": "/v1/buildings/add",
    "title": "Add Building",
    "description": "<p>Add Building</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "building_name",
            "description": "Building Name"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "location",
            "description": "Building Location"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "latitude",
            "description": "Building Latitude"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "longitude",
            "description": "Building Longitude"
          }
        ]
      }
    },
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{\n  \"status\": true,\n  \"success\": \"create_building_success\",\n  \"success_message\": \"Building created successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP 403\n{\n \"status\": false,\n \"error\": \"create_building_failed\",\n \"message\": \"Failed to create Building\"\n}",
          "type": "json"
        },
        {
          "title": "Validation Message:",
          "content": "HTTP 403\n{\n \"status\": false,\n \"error\": \"building_name\",\n \"message\": \"\\\"building_name\\\" is required\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Buildings",
    "filename": "server/controllers/buildings.js",
    "groupTitle": "Buildings",
    "name": "PostV1AddBuilding"
  },
  {
    "type": "get",
    "url": "/v1/buildings",
    "title": "List Buildings",
    "description": "<p>List Buildings</p>",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{\n    \"data\": [\n        {\n            \"id\": \"1\",\n            \"building_name\": \"Cantera Apartments\",\n            \"location\": \"10555 Spice Lane, Houston, Texas\",\n            \"latitude\": \"29.6859043\",\n            \"longitude\": \"-95.565490\",\n            \"created_at\": \"2020-04-13 14:50:24\",\n            \"updated_at\": \"2020-04-13 15:26:16\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP 403\n{\n \"status\": false,\n \"error\": \"failed_to_list_building\",\n \"message\": \"Failed to list Buildings\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Buildings",
    "filename": "server/controllers/buildings.js",
    "groupTitle": "Buildings",
    "name": "GetV1ListBuildings"
  },
  {
    "type": "post",
    "url": "/v1/banks/add",
    "title": "Add Bank",
    "description": "<p>Add Bank</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "user_id",
            "description": "User ID"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "name",
            "description": "Bank Name"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "account_no",
            "description": "Bank Account Number"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "account_type",
            "description": "Bank Account Type"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "ifsc_code",
            "description": "IFSC Code"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "additional_details",
            "description": "Additional Details"
          },
          {
            "group": "Parameter",
            "type": "enum",
            "optional": true,
            "field": "status",
            "description": "Status"
          }
        ]
      }
    },
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{\n  \"status\": true,\n  \"success\": \"create_bank_success\",\n  \"success_message\": \"Bank created successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP 403\n{\n \"status\": false,\n \"error\": \"create_bank_failed\",\n \"message\": \"Failed to create Bank\"\n}",
          "type": "json"
        },
        {
          "title": "Validation Message:",
          "content": "HTTP 403\n{\n \"status\": false,\n \"error\": \"user_id\",\n \"message\": \"\\\"user_id\\\" is required\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Banks",
    "filename": "server/controllers/banks.js",
    "groupTitle": "Banks",
    "name": "PostV1AddBank"
  },
  {
    "type": "get",
    "url": "/v1/banks",
    "title": "List Banks",
    "description": "<p>List Banks</p>",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{\n    \"data\": [\n        {\n            \"id\": \"1\",\n            \"user_id\": \"101\",\n            \"name\": \"Federal Bank\",\n            \"account_no\": \"601876234519\",\n            \"ifsc_code\": \"FDRL0001617\",\n            \"account_type\": \"2\",\n            \"additional_details\": \"Kazhakuttom Branch\",\n            \"status\": \"E\",\n            \"created_at\": \"2020-04-13 14:50:24\",\n            \"updated_at\": \"2020-04-13 15:26:16\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP 403\n{\n \"status\": false,\n \"error\": \"failed_to_list_banks\",\n \"message\": \"Failed to list Banks\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Banks",
    "filename": "server/controllers/banks.js",
    "groupTitle": "Banks",
    "name": "GetV1ListBanks"
  },
  {
    "type": "get",
    "url": "/v1/settings",
    "title": "List System Settings",
    "description": "<p>List System Settings</p>",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{\n    \"data\": [\n        {\n            \"id\": \"1\",\n            \"bank_charge_mode\": \"F\",\n            \"bank_charges\": \"25.00\",\n            \"service_charge_mode\": \"F\",\n            \"service_charges\": \"10.00\",\n            \"currency_code\": \"INR\",\n            \"created_at\": \"2020-04-13 14:50:24\",\n            \"updated_at\": \"2020-04-13 15:26:16\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP 403\n{\n \"status\": false,\n \"error\": \"failed_to_list_system_settings\",\n \"message\": \"Failed to list System Settings\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "System Settings",
    "filename": "server/controllers/settings.js",
    "groupTitle": "System Settings",
    "name": "GetV1ListSystemSettings"
  },
  {
    "type": "post",
    "url": "/v1/rent/add",
    "title": "Add Rent",
    "description": "<p>Add Rent</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "contract_id",
            "description": "Contract ID"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "rent_date_time",
            "description": "Rent Period"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "rent_amount",
            "description": "Rent Amount"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "bank_charge",
            "description": "Bank Charge"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "service_charge",
            "description": "Service Charge"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "total_rent",
            "description": "Total Rent"
          },
          {
            "group": "Parameter",
            "type": "enum",
            "optional": true,
            "field": "status",
            "description": "Status"
          }
        ]
      }
    },
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{\n  \"status\": true,\n  \"success\": \"create_rent_success\",\n  \"success_message\": \"Rent created successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP 403\n{\n \"status\": false,\n \"error\": \"create_rent_failed\",\n \"message\": \"Failed to create Rent\"\n}",
          "type": "json"
        },
        {
          "title": "Validation Message:",
          "content": "HTTP 403\n{\n \"status\": false,\n \"error\": \"contract_id\",\n \"message\": \"\\\"contract_id\\\" is required\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Rent",
    "filename": "server/controllers/rent.js",
    "groupTitle": "Rent",
    "name": "PostV1AddRent"
  },
  {
    "type": "get",
    "url": "/v1/rent_period",
    "title": "Get Rent Period",
    "description": "<p>Get Rent Period</p>",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{\n    \"data\": [\n        {\n            \"id\": \"1\",\n            \"title\": \"Rent for the Month April\",\n            \"value\": \"25,000\",\n            \"status\": \"MONTHLY\",\n            \"created_at\": \"2020-04-13 14:50:24\",\n            \"updated_at\": \"2020-04-13 15:26:16\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP 403\n{\n \"status\": false,\n \"error\": \"failed_to_list_rent_period\",\n \"message\": \"Failed to list Rent Period\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Rent",
    "filename": "server/controllers/rent_period.js",
    "groupTitle": "Rent",
    "name": "GetV1RentPeriod"
  },
   {
    "type": "post",
    "url": "/v1/properties/add",
    "title": "Add Property",
    "description": "<p>Add Property</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "user_id",
            "description": "User ID"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "house_number",
            "description": "House Number"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "building_id",
            "description": "Building ID"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "Property Description"
          },
          {
            "group": "Parameter",
            "type": "decimal",
            "optional": false,
            "field": "rent_amount",
            "description": "Rent Amount"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "rent_period_id",
            "description": "Rent Period ID"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "rent_day_date",
            "description": "Rent Period"
          },
          {
            "group": "Parameter",
            "type": "enum",
            "optional": true,
            "field": "status",
            "description": "Status"
          }
        ]
      }
    },
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 OK\n{\n  \"status\": true,\n  \"success\": \"create_property_success\",\n  \"success_message\": \"Property created successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP 403\n{\n \"status\": false,\n \"error\": \"create_property_failed\",\n \"message\": \"Failed to create Property\"\n}",
          "type": "json"
        },
        {
          "title": "Validation Message:",
          "content": "HTTP 403\n{\n \"status\": false,\n \"error\": \"user_id\",\n \"message\": \"\\\"user_id\\\" is required\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "Properties",
    "filename": "server/controllers/properties.js",
    "groupTitle": "Properties",
    "name": "PostV1AddProperty"
  }
] });
