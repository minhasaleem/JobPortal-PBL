# Job Portal System - Data Flow Diagrams (DFD)

The following diagrams illustrate how data flows between external entities (Job Seekers, Recruiters, Admins), various structural processes, and the database elements within your system.

## Level 0: Context Diagram
The Level 0 DFD provides a high-level overview of the entire system as a single entity and shows the main interactions with external users.

```mermaid
graph LR
    %% External Entities
    JS(("Job Seeker"))
    REC(("Recruiter"))
    ADM(("Admin"))
    
    %% Main System Process
    SYS["Job Portal System"]

    %% Data Flows
    JS -- "Profile Data, Resumes, Applications" --> SYS
    SYS -- "Job Postings, Application Status" --> JS

    REC -- "Company Profile, Job Postings, Status Updates" --> SYS
    SYS -- "Applicant Resumes, App Listings" --> REC

    ADM -- "Login Request" --> SYS
    SYS -- "Platform Analytics (Total Users, Jobs, Applications)" --> ADM

    classDef system fill:#4f46e5,stroke:#312e81,stroke-width:2px,color:#fff;
    class SYS system;
```

---

## Level 1: Process Diagram
The Level 1 DFD breaks the central system down into its primary sub-processes, exposing how they interact with the distinct databases (Data Stores).

```mermaid
graph TD
    %% External Entities
    Seeker(("Job Seeker"))
    Company(("Recruiter"))
    Admin(("Admin"))

    %% Processes (Rounded boxes)
    P1("1.0\nAuthentication\n& Profiles")
    P2("2.0\nJob\nManagement")
    P3("3.0\nApplication\nProcessing")
    P4("4.0\nAdmin\nAnalytics")

    %% Data Stores (Cylinder format)
    D1[("D1: Users DB")]
    D2[("D2: Companies DB")]
    D3[("D3: Jobs DB")]
    D4[("D4: Applications DB")]

    %% Authentication & Profile Flows
    Seeker -- "Google Auth / Profile Info" --> P1
    Company -- "Recruiter Credentials" --> P1
    P1 -- "Read/Write User Data" --> D1
    P1 -- "Read/Write Company Info" --> D2

    %% Job Management Flows
    Company -- "Submit Job / Edit Visibility" --> P2
    P2 -- "Store/Update Job Details" --> D3
    D3 -- "Fetch Available Jobs" --> P2
    P2 -- "View Job Listings" --> Seeker

    %% Application Processing Flows
    Seeker -- "Submit application (Resume)" --> P3
    P3 -- "Store Application State" --> D4
    D4 -- "Retrieve App Details" --> P3
    P3 -- "View Applicants" --> Company
    Company -- "Update Job Status (Accept/Reject)" --> P3
    P3 -- "Notify Job Seeker" --> Seeker

    %% Admin Analytics Flow
    Admin -- "Request Portal Metrics" --> P4
    D1 -. "Total users" .-> P4
    D2 -. "Total recruiters" .-> P4
    D3 -. "Total jobs posted" .-> P4
    D4 -. "Total applications submitted" .-> P4
    P4 -- "Compile & Send Dashboard Data" --> Admin

    %% Styling
    classDef process fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff;
    classDef datastore fill:#f59e0b,stroke:#b45309,stroke-width:2px,color:#fff;
    
    class P1,P2,P3,P4 process;
    class D1,D2,D3,D4 datastore;
```

### Diagram Components:
- **Circles (`( )`)**: External Entities (The people directly interacting with the system).
- **Boxes with rounded edges`: Processes (Functions or tasks that the system executes, translating input to output data).
- **Cylinders (`[( )]`)**: Data Stores (MongoDB Collections holding persistent data).
- **Arrows (`-->`)**: Data flow depicting the path and descriptive payload info transferring across nodes.
