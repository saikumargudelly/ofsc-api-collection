# Oracle Field Service REST API Collection

[![Release](https://img.shields.io/badge/Release-26D-0A85EA?style=flat-square)](https://github.com/saikumargudelly/ofsc-api-collection/releases/tag/v26D)
[![API Coverage](https://img.shields.io/badge/Coverage-100%25%20(253%20Endpoints)-brightgreen?style=flat-square)](https://docs.oracle.com/en/cloud/saas/field-service/cxfsc/rest-endpoints.html)
[![Postman Schema](https://img.shields.io/badge/Postman-v2.1.0-FF6C37?style=flat-square&logo=postman&logoColor=white)](https://schema.getpostman.com/json/collection/v2.1.0/collection.json)
[![License](https://img.shields.io/badge/License-MIT-gray?style=flat-square)](LICENSE)

A complete, production-aligned Postman collection for the Oracle Field Service (OFS) REST APIs, synchronized with Oracle Field Service Update **26D** (API Specification `2026.07.29`).

---

### Quick Download

[![Download Postman Collection](https://img.shields.io/badge/Download-Postman_Collection-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://raw.githubusercontent.com/saikumargudelly/ofsc-api-collection/main/api.postman_collection.json)
[![Download Environment](https://img.shields.io/badge/Download-Environment_Template-007ACC?style=for-the-badge&logo=postman&logoColor=white)](https://raw.githubusercontent.com/saikumargudelly/ofsc-api-collection/main/test.postman_environment.json)

| Artifact | File | Direct Download |
| :--- | :--- | :--- |
| **API Collection** | `api.postman_collection.json` | [Download Collection JSON](https://raw.githubusercontent.com/saikumargudelly/ofsc-api-collection/main/api.postman_collection.json) |
| **Environment Template** | `test.postman_environment.json` | [Download Environment JSON](https://raw.githubusercontent.com/saikumargudelly/ofsc-api-collection/main/test.postman_environment.json) |

---

## Overview

This repository provides full REST API coverage (253 official operations across 171 paths, organized into 260 curated Postman requests) for Oracle Field Service. It includes complete schema documentation, standardized environment variables, parameter schemas, and pre-built sample request bodies.

### Key Capabilities

- **100% Endpoint Parity:** Covers all endpoints specified in the official [Oracle Field Service REST Endpoints Reference](https://docs.oracle.com/en/cloud/saas/field-service/cxfsc/rest-endpoints.html).
- **Latest API Updates:** Includes Shifts, Link Templates, Activity Type Groups, Routing Runs & Reports, Routing Plans v2, and External Files Info.
- **Dual Authentication Support:** Supports both HTTP Basic Authentication and OAuth 2.0 token service (RFC 6749 compliant v2 endpoints).
- **Pre-configured Environment:** Includes 58+ variables covering authentication, entity IDs, date ranges, and common query parameters.

---

## Getting Started

### 1. Import into Postman

1. Download [`api.postman_collection.json`](https://raw.githubusercontent.com/saikumargudelly/ofsc-api-collection/main/api.postman_collection.json) and [`test.postman_environment.json`](https://raw.githubusercontent.com/saikumargudelly/ofsc-api-collection/main/test.postman_environment.json).
2. Open Postman, click **Import** (top left), and drag-and-drop both files.
3. In the environment dropdown (top right), select **`OFSC Basic Environment -TEST`**.

### 2. Configure Environment

Set the following baseline variables in your Postman environment:

| Variable | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `base_url` | String | OFSC instance root URL | `https://your-instance.ofsc.oracle.com` |
| `username` | String | API user login in format `login@instance` | `user@company_instance` |
| `password` | Secret | API user password or authentication key | `••••••••••••` |

Additional context variables (`activityId`, `resourceId`, `inventoryId`, `date`, `profileLabel`, etc.) can be populated as needed for specific workflows.

---

## API Module Coverage

The collection is organized into 8 functional modules matching Oracle Field Service architecture:

| Module | Scope / Key Capabilities |
| :--- | :--- |
| **Capacity** | Quota calculation (v1 & v2), activity booking options, booking closing schedules, booking statuses, booking field dependencies. |
| **Collaboration** | Chat management, real-time message exchange, participant invitations, address book directory. |
| **Core** | Activities, resources, resource trees/descendants, inventories, external file attachments, service requests, event subscriptions, daily extracts, users. |
| **Metadata** | Activity types, activity type groups, properties, enumeration lists, plugins, link templates, shifts, work skills, work zones, capacity areas, form definitions. |
| **Routing** | Routing profiles, resource buckets, routing plan import/export (v1 & v2), routing run execution and reports. |
| **OAuth2** | Token acquisition service (v2 RFC 6749 compliant `access_token` and legacy v1 endpoint). |
| **Parts Catalog** | Catalogs, item schemas, and parts search/inventory synchronization. |
| **Statistics** | Activity duration statistics, travel statistics, airline distance-based travel configuration. |

---

## Authentication

### Basic Authentication
Configure your credentials at the collection or environment level using `username` and `password`. The collection uses HTTP Basic Authentication headers by default for REST v1 endpoints.

### OAuth 2.0
For environments requiring OAuth 2.0:
1. Execute `OAuth2 > Token Service > Get an access token` (`POST /rest/oauthTokenService/v2/token`).
2. Use the returned `access_token` as a Bearer token in subsequent requests.

---

## Repository Structure

```
├── README.md                      # Repository documentation
├── api.postman_collection.json    # Complete OFSC REST API Postman Collection (v2.1.0)
└── test.postman_environment.json  # Environment template with variables
```

---

## Contributing

Contributions, bug reports, and updates are welcome. To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/improvement`).
3. Commit your changes (`git commit -m 'feat: update endpoint definition'`).
4. Push to the branch (`git push origin feature/improvement`).
5. Open a Pull Request.

---

## Disclaimer

Oracle and Oracle Field Service are registered trademarks of Oracle Corporation and/or its affiliates. This repository is an independent community resource and is not officially affiliated with, maintained, or endorsed by Oracle Corporation.
