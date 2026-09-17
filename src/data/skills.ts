export interface SkillCategory {
    category: string;
    items: string[];
}

export const skills: SkillCategory[] = [
    {
        category: "Programming",
        items: [
            "LabVIEW (FPGA, Real-Time, GOOP)",
            "C#",
            "MATLAB/Simulink",
            "C",
            "Fortran",
            "JavaScript",
        ],
    },
    {
        category: "Frameworks & Architecture",
        items: [
            "WPF",
            "MVVM",
            "Entity Framework",
            "Clean Architecture",
            "NI Actor Framework",
            "Blazor",
            "React.js",
            "Bootstrap",
        ],
    },
    {
        category: "Tools & Platforms",
        items: ["SQL Server", "TestStand", "Azure Pipelines", "Docker", "Git"],
    },
    {
        category: "Interfaces & Protocols",
        items: [
            "TCP/IP",
            "OPC/UA",
            "CAN",
            "gRPC",
            "MQTT",
            "SPI",
            "RS-232",
            "Bluetooth",
            "HTTPS",
            "FTP",
        ],
    },
    {
        category: "Domain",
        items: [
            "Control Theory",
            "Signal Processing",
            "System Identification",
            "Hardware-in-the-Loop Testing",
            "Sensor Fusion",
            "Sensor Systems",
            "Embedded Systems",
            "Electronics",
            "Robotic Path Planning",
            "Machine Learning",
        ],
    },
    {
        category: "Ways of Working",
        items: ["Requirements Engineering", "Code Review", "SAFe", "Kanban"],
    },
    {
        category: "Spoken Languages",
        items: ["Swedish (Native)", "English (Professional)"],
    },
];
