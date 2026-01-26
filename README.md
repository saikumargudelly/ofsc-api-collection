# Oracle Field Service Cloud (OFSC) REST API - Postman Collection

[![Postman Collection](https://img.shields.io/badge/Postman-Collection-orange.svg)](https://www.postman.com/)
[![License](https://img.shields.io/badge/License-Educational-blue.svg)]()

A comprehensive Postman collection for Oracle Field Service Cloud (OFSC) REST APIs. This educational repository contains 150+ API endpoints organized into logical categories to help developers learn and interact with OFSC services.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Categories](#api-categories)
- [Usage Examples](#usage-examples)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [Educational Purpose](#educational-purpose)
- [Resources](#resources)

## 🎯 Overview

Oracle Field Service Cloud (OFSC) is a comprehensive field service management solution. This Postman collection provides a complete reference for the OFSC REST API, covering all major functional areas including capacity management, activity scheduling, resource management, inventory tracking, and more.

**Collection Version:** 2.1.0  
**Last Updated:** January 2026

## ✨ Features

- **150+ API Endpoints** covering all OFSC REST API capabilities
- **7 Major Categories** logically organized:
  - Capacity Management
  - Collaboration Tools
  - Core Operations
  - Metadata Management
  - OAuth2 Authentication
  - Parts Catalog
  - Statistics & Analytics
- **Pre-configured Environment** with 54+ variables for easy testing
- **Detailed Descriptions** for each endpoint explaining functionality and use cases
- **Request Examples** with sample payloads for POST/PATCH operations
- **Basic Authentication** setup included

## 📦 Prerequisites

- [Postman](https://www.postman.com/downloads/) (Desktop app or Web version)
- Oracle Field Service Cloud instance access
- Valid OFSC credentials (username and password)
- Basic understanding of REST APIs

## 🚀 Installation

### Option 1: Import from Repository

1. Clone this repository:
   ```bash
   git clone https://github.com/saikumargudelly/ofsc-api-postman-collection.git
   cd ofsc-api-postman-collection
   ```

2. Open Postman and click **Import**

3. Select the following files:
   - `Oracle Field Service Cloud (OFSC) REST API - Full Collection.postman_collection.json`
   - `OFSC Basic Environment -TEST.postman_environment.json`

### Option 2: Direct Import via URL

1. Open Postman
2. Click **Import** → **Link**
3. Paste the raw GitHub URL of the collection file
4. Click **Continue** and **Import**

## ⚙️ Configuration

### 1. Set Up Environment

After importing, select the **OFSC Basic Environment -TEST** from the environment dropdown in Postman.

### 2. Configure Required Variables

Update these essential variables in your environment:

| Variable | Description | Example |
|----------|-------------|---------|
| `base_url` | Your OFSC instance URL | `https://instance.ofsc.oracle.com/rest` |
| `username` | OFSC API username | `app_user@instance_id` |
| `password` | OFSC API password/secret key | `your_secret_key` |

### 3. Update Entity IDs

Based on your OFSC instance, update the following IDs:
- `activityId` - Activity identifier for testing
- `resourceId` - Resource identifier
- `inventoryId` - Inventory item ID
- Other entity-specific IDs as needed

## 📚 API Categories

### 1. Capacity (40+ endpoints)
Manage capacity, quotas, bookings, and availability.
- **Available Capacity**: View resource capacity for customer work
- **Booking**: Manage appointments and booking options
- **Booking Closing Schedule**: Control booking windows and statuses
- **Quota**: Manage time allocation for different work types (v1 & v2)

### 2. Collaboration (10+ endpoints)
Enable team communication and collaboration.
- **Address Book**: Manage contact information
- **Chats**: Start chats, send messages, manage participants

### 3. Core (80+ endpoints)
Core field service operations and data management.
- **Activities**: Complete activity lifecycle management
  - Activity actions (start, complete, cancel, suspend, move, etc.)
  - File properties
  - Inventories (customer, installed, deinstalled)
  - Links between activities
  - Required inventories and resource preferences
  - Submitted forms
  - Bulk operations
- **Events**: Webhook subscriptions and event management
- **Extracts**: Daily data extracts
- **Inventories**: Inventory management operations
- **Resources**: Resource management
  - Working hours and schedules
  - Work skills and skill groups
  - Work zones
  - Locations
  - Positions
- **Service Requests**: Service request management

### 4. Metadata (30+ endpoints)
Configure OFSC system metadata and definitions.
- **Activity Types**: Define activity configurations
- **Capacity Categories**: Configure capacity classifications
- **Plugins**: Manage system plugins
- **Properties**: Define custom fields and properties
- **Resource Types**: Configure resource classifications
- **Workskill Conditions**: Define skill-based routing rules
- **Workskills/Workskill Groups**: Manage skills taxonomy
- **Workzones**: Define geographic service areas

### 5. OAuth2 (2 endpoints)
Token-based authentication endpoints.
- Token generation
- Token refresh

### 6. Parts Catalog (10+ endpoints)
Manage parts and catalogs.
- Catalog management
- Item management
- Catalog items association

### 7. Statistics (5+ endpoints)
View and manage travel and performance statistics.
- Activity travel statistics
- Airline distance-based travel

## 💡 Usage Examples

### Example 1: Get an Activity

```http
GET {{base_url}}/rest/ofscCore/v1/activities/{{activityId}}
Authorization: Basic {{username}}:{{password}}
```

### Example 2: Create a New Activity

```http
POST {{base_url}}/rest/ofscCore/v1/activities
Content-Type: application/json

{
  "activityType": "INSTALL",
  "date": "2026-02-01",
  "duration": 60,
  "workSkills": ["plumbing"],
  "language": "en"
}
```

### Example 3: Get Available Capacity

```http
GET {{base_url}}/rest/ofscCapacity/v1/capacity?date=2026-02-01
Authorization: Basic {{username}}:{{password}}
```

## 🔑 Environment Variables

The collection uses 54+ environment variables for flexible testing:

**Core Configuration:**
- `base_url`, `username`, `password`

**Entity IDs:**
- `activityId`, `resourceId`, `inventoryId`, `chatId`, `subscriptionId`

**Labels & Classifications:**
- `propertyLabel`, `workSkill`, `workZone`, `label`, `apiLabel`

**Catalog Management:**
- `catalog`, `itemLabel`, `language`

**Scheduling:**
- `date`, `dailyExtractDate`, `scheduleItemId`

**And many more...**

## 🤝 Contributing

This is an educational resource. Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Add your changes (new endpoints, descriptions, examples)
4. Commit your changes (`git commit -m 'Add: New endpoint documentation'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Open a Pull Request

### Contribution Guidelines:
- Add detailed descriptions for new endpoints
- Include request/response examples
- Follow existing naming conventions
- Test all endpoints before committing

## 📖 Educational Purpose

This collection is created for **educational and learning purposes** to help developers:

- Understand OFSC REST API capabilities
- Learn field service management concepts
- Experiment with API integrations
- Build proof-of-concept applications
- Study API design patterns

**⚠️ Important Notes:**
- Always use test environments for learning
- Never commit real credentials to version control
- Follow Oracle's API usage policies
- Respect rate limits and quotas
- Use proper error handling in production code

## 📚 Resources

### Official Documentation
- [Oracle Field Service Cloud Documentation](https://docs.oracle.com/en/cloud/saas/field-service/)
- [OFSC REST API Reference](https://docs.oracle.com/en/cloud/saas/field-service/rest-api/)

### Learning Resources
- [Postman Learning Center](https://learning.postman.com/)
- [REST API Best Practices](https://restfulapi.net/)

### Community
- [Oracle Cloud Customer Connect](https://community.oracle.com/)
- [Stack Overflow - OFSC Tag](https://stackoverflow.com/questions/tagged/oracle-field-service)

## 📄 License

This project is created for educational purposes. Please refer to Oracle's licensing terms for OFSC usage.

## 🙋 Support

For questions or issues:
- Open an issue on GitHub
- Check Oracle's official documentation
- Consult Oracle Field Service Cloud community forums

## 🔄 Version History

- **v1.0.0** (January 2026) - Initial release with 150+ endpoints

---

**Disclaimer:** This collection is not officially maintained by Oracle. It is a community-driven educational resource. Always refer to official Oracle documentation for the most up-to-date API specifications.

**Made with ❤️ for the OFSC Developer Community**
