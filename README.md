# Oracle Field Service REST API Collection

[![Release](https://img.shields.io/badge/Release-26D-0A85EA?style=flat-square)](https://github.com/saikumargudelly/ofsc-api-collection/releases/tag/v26D)
[![API Coverage](https://img.shields.io/badge/Coverage-100%25%20(253%20Endpoints)-brightgreen?style=flat-square)](https://docs.oracle.com/en/cloud/saas/field-service/cxfsc/rest-endpoints.html)
[![Postman Schema](https://img.shields.io/badge/Postman-v2.1.0-FF6C37?style=flat-square&logo=postman&logoColor=white)](https://schema.getpostman.com/json/collection/v2.1.0/collection.json)
[![License](https://img.shields.io/badge/License-MIT-gray?style=flat-square)](LICENSE)

Production-aligned Postman collection providing 100% complete coverage (253 official operations across 171 paths; 260 requests) for Oracle Field Service Update **26D** (API Spec `2026.07.29`).

---

## Downloads

[![Download Collection](https://img.shields.io/badge/Download-Postman_Collection-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://github.com/saikumargudelly/ofsc-api-collection/releases/latest/download/ofsc.postman_collection.json)
[![Download Environment](https://img.shields.io/badge/Download-Environment_Template-007ACC?style=for-the-badge&logo=postman&logoColor=white)](https://github.com/saikumargudelly/ofsc-api-collection/releases/latest/download/ofsc.postman_environment.json)

---

## Quick Start

1. **Import:** Download [`ofsc.postman_collection.json`](https://github.com/saikumargudelly/ofsc-api-collection/releases/latest/download/ofsc.postman_collection.json) and [`ofsc.postman_environment.json`](https://github.com/saikumargudelly/ofsc-api-collection/releases/latest/download/ofsc.postman_environment.json), then import both into Postman.
2. **Select Environment:** Choose `OFSC Basic Environment -TEST`.
3. **Configure Credentials:**

| Variable | Description | Example |
| :--- | :--- | :--- |
| `base_url` | Instance root URL | `https://your-instance.ofsc.oracle.com` |
| `username` | API user login | `user@company_instance` |
| `password` | API password / key | `••••••••••••` |

*Supports both HTTP Basic Authentication (default) and OAuth 2.0 (`POST /rest/oauthTokenService/v2/token`).*

---

## API Coverage

| Domain | Key Capabilities |
| :--- | :--- |
| **Capacity** | Quota (v1 & v2), activity booking options, closing schedules, booking statuses, booking field dependencies. |
| **Collaboration** | Chats, real-time messaging, participant invitations, address book. |
| **Core** | Activities, resources, hierarchies, inventories, external file attachments, service requests, events, daily extracts, users. |
| **Metadata** | Activity types & groups, properties, enumeration lists, plugins, link templates, shifts, work skills, work zones, capacity areas, forms. |
| **Routing** | Routing profiles, resource buckets, routing plan import/export (v1 & v2), routing run reports. |
| **OAuth2** | RFC 6749 compliant token service (v2) and legacy token endpoint (v1). |
| **Parts Catalog** | Catalogs, item schemas, parts search, inventory sync. |
| **Statistics** | Activity duration, travel stats, airline distance analytics. |

---

## Plugin Framework

For developing, scaffolding, and deploying custom plugins, refer to the [Oracle Field Service Plugin Template](https://github.com/saikumargudelly/oracle-field-service-plugin-template).

---

## License & Disclaimer

This project is licensed under the MIT License. Oracle and Oracle Field Service are registered trademarks of Oracle Corporation. This repository is an independent community resource and is not affiliated with or endorsed by Oracle.
