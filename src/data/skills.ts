export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: 'Programming',
    items: ['C#', 'LabVIEW', 'MATLAB', 'C', 'JavaScript', 'Fortran'],
  },
  {
    category: 'Software & Tools',
    items: ['Microsoft SQL', 'Entity Framework', 'Git', 'Docker', 'Azure Pipelines', 'TestStand'],
  },
  {
    category: 'Frameworks & Architecture',
    items: ['WPF', 'MVVM', 'Clean Architecture', 'Blazor', 'React.js', 'Bootstrap', 'NI Actor Framework', 'SAFe'],
  },
  {
    category: 'Communication Protocols',
    items: ['TCP/IP', 'OPC/UA', 'gRPC', 'HTTPS', 'RS-232', 'SPI', 'CAN', 'MQTT', 'Serial Communication', 'FTP'],
  },
  {
    category: 'Domain',
    items: [
      'Signal Processing',
      'Control Theory',
      'Electronics',
      'Embedded Systems',
      'Machine Learning',
      'System Identification',
      'Robotic Path Planning',
      'Sensor Systems',
      'Sensor Fusion',
    ],
  },
  {
    category: 'Languages',
    items: ['Swedish (Native)', 'English (Professional)'],
  },
];
