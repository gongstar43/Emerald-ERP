// معايير إدارة المشاريع الدولية (PMBOK 7th, PRINCE2, ISO 21500, Agile/Scrum)

export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical';
export type TaskStatus = 'not-started' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type ResourceType = 'human' | 'equipment' | 'material' | 'financial';

// PMBOK Knowledge Areas
export enum PMBOKKnowledgeArea {
  INTEGRATION = 'integration',           // إدارة تكامل المشروع
  SCOPE = 'scope',                       // إدارة نطاق المشروع
  SCHEDULE = 'schedule',                 // إدارة الجدول الزمني
  COST = 'cost',                         // إدارة التكاليف
  QUALITY = 'quality',                   // إدارة الجودة
  RESOURCES = 'resources',               // إدارة الموارد
  COMMUNICATIONS = 'communications',     // إدارة الاتصالات
  RISK = 'risk',                         // إدارة المخاطر
  PROCUREMENT = 'procurement',           // إدارة المشتريات
  STAKEHOLDER = 'stakeholder',           // إدارة أصحاب المصلحة
}

// PMBOK Process Groups
export enum PMBOKProcessGroup {
  INITIATING = 'initiating',             // البدء
  PLANNING = 'planning',                 // التخطيط
  EXECUTING = 'executing',               // التنفيذ
  MONITORING = 'monitoring',             // المراقبة والتحكم
  CLOSING = 'closing',                   // الإغلاق
}

// Agile/Scrum
export type SprintStatus = 'planned' | 'active' | 'completed';
export type StoryPointScale = 1 | 2 | 3 | 5 | 8 | 13 | 21;

export interface Project {
  id: string;
  projectCode: string;
  projectName: string;
  projectNameAr: string;
  
  // Classification
  type: 'internal' | 'external' | 'research' | 'development' | 'maintenance';
  category: string;
  
  // PMBOK - Project Charter
  charter: ProjectCharter;
  
  // Scope (PMBOK Scope Management)
  scope: ProjectScope;
  
  // Schedule (PMBOK Schedule Management)
  startDate: string;
  endDate: string;
  plannedDuration: number;
  actualDuration?: number;
  
  // Budget (PMBOK Cost Management)
  budget: ProjectBudget;
  
  // Status
  status: ProjectStatus;
  priority: ProjectPriority;
  healthStatus: 'on-track' | 'at-risk' | 'off-track';
  
  // Progress
  progressPercentage: number;
  
  // Methodology
  methodology: 'waterfall' | 'agile' | 'hybrid' | 'prince2';
  
  // Team (PMBOK Resource Management)
  projectManager: string;
  projectSponsor: string;
  team: ProjectTeamMember[];
  
  // Stakeholders (PMBOK Stakeholder Management)
  stakeholders: Stakeholder[];
  
  // Customer
  customerId?: string;
  customerName?: string;
  contractValue?: number;
  
  // Location
  location?: string;
  
  // Documents
  attachments: ProjectDocument[];
  
  // Approvals
  approvedBy?: string;
  approvedAt?: string;
  
  // Baseline
  baselineSet: boolean;
  baselineDate?: string;
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCharter {
  // Project Purpose
  purpose: string;
  objectives: string[];
  justification: string;
  
  // High-level Requirements
  requirements: string[];
  
  // Success Criteria
  successCriteria: string[];
  
  // High-level Risks
  risks: string[];
  
  // Constraints
  constraints: string[];
  
  // Assumptions
  assumptions: string[];
  
  // Authority
  projectManagerAuthority: string;
  
  // Approval
  approvedBy: string;
  approvalDate: string;
}

export interface ProjectScope {
  // Scope Statement
  scopeStatement: string;
  
  // Deliverables
  deliverables: Deliverable[];
  
  // Acceptance Criteria
  acceptanceCriteria: string[];
  
  // Exclusions
  exclusions: string[];
  
  // Boundaries
  boundaries: string;
  
  // WBS (Work Breakdown Structure)
  wbs: WBSElement[];
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'accepted' | 'rejected';
  acceptanceCriteria: string[];
  responsible: string;
  completionDate?: string;
  acceptedBy?: string;
  acceptanceDate?: string;
}

export interface WBSElement {
  id: string;
  code: string;
  name: string;
  description: string;
  level: number;
  parentId?: string;
  
  // Work Package
  isWorkPackage: boolean;
  estimatedHours?: number;
  estimatedCost?: number;
  
  // Assignment
  responsible?: string;
}

export interface ProjectBudget {
  // Planned Budget
  plannedCost: number;
  
  // Cost Breakdown
  laborCost: number;
  materialCost: number;
  equipmentCost: number;
  subcontractorCost: number;
  overheadCost: number;
  contingencyReserve: number;
  managementReserve: number;
  
  // Actual Costs (Earned Value Management)
  actualCost: number;
  committedCost: number;
  
  // Revenue (for external projects)
  contractValue?: number;
  billedAmount?: number;
  receivedAmount?: number;
  
  // EVM Metrics
  plannedValue: number;
  earnedValue: number;
  costVariance: number;
  scheduleVariance: number;
  costPerformanceIndex: number;
  schedulePerformanceIndex: number;
  estimateAtCompletion: number;
  estimateToComplete: number;
  varianceAtCompletion: number;
}

export interface ProjectTeamMember {
  userId: string;
  userName: string;
  role: string;
  
  // Assignment
  assignmentType: 'full-time' | 'part-time' | 'contractor';
  allocationPercentage: number;
  
  // Rates
  hourlyRate?: number;
  dailyRate?: number;
  
  // Period
  startDate: string;
  endDate?: string;
  
  // Responsibilities
  responsibilities: string[];
  
  // Authority Level
  authorityLevel: 'view' | 'contribute' | 'manage' | 'admin';
}

export interface Stakeholder {
  id: string;
  name: string;
  organization?: string;
  role: string;
  
  // Classification
  type: 'internal' | 'external';
  category: 'sponsor' | 'customer' | 'team' | 'supplier' | 'regulator' | 'end-user' | 'other';
  
  // Influence & Interest (PMBOK Stakeholder Management)
  influence: 'low' | 'medium' | 'high';
  interest: 'low' | 'medium' | 'high';
  
  // Engagement
  currentEngagement: 'unaware' | 'resistant' | 'neutral' | 'supportive' | 'leading';
  desiredEngagement: 'unaware' | 'resistant' | 'neutral' | 'supportive' | 'leading';
  
  // Communication
  communicationPreference: string;
  communicationFrequency: string;
  
  // Contact
  email?: string;
  phone?: string;
  
  // Requirements
  requirements: string[];
  expectations: string[];
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: 'charter' | 'plan' | 'report' | 'specification' | 'design' | 'contract' | 'other';
  category: string;
  version: string;
  
  fileUrl: string;
  fileSize: number;
  
  status: 'draft' | 'review' | 'approved' | 'obsolete';
  
  uploadedBy: string;
  uploadedAt: string;
  
  approvedBy?: string;
  approvedAt?: string;
}

export interface Task {
  id: string;
  taskNumber: string;
  taskName: string;
  description: string;
  
  // Project
  projectId: string;
  projectName: string;
  
  // WBS
  wbsElementId?: string;
  
  // Parent-Child
  parentTaskId?: string;
  hasSubtasks: boolean;
  
  // Type
  type: 'task' | 'milestone' | 'phase';
  
  // Schedule (PMBOK Schedule Management)
  startDate: string;
  endDate: string;
  duration: number;
  durationUnit: 'hours' | 'days' | 'weeks';
  
  // Baseline
  baselineStartDate?: string;
  baselineEndDate?: string;
  baselineDuration?: number;
  
  // Actual
  actualStartDate?: string;
  actualEndDate?: string;
  actualDuration?: number;
  
  // Progress
  progressPercentage: number;
  
  // Effort
  estimatedHours: number;
  actualHours: number;
  remainingHours: number;
  
  // Dependencies (Critical Path Method)
  predecessors: TaskDependency[];
  successors: TaskDependency[];
  
  // Critical Path
  isCritical: boolean;
  float: number; // Total Float/Slack
  
  // Assignment
  assignedTo: string[];
  responsiblePerson: string;
  
  // Priority & Status
  priority: TaskPriority;
  status: TaskStatus;
  
  // Cost
  estimatedCost: number;
  actualCost: number;
  
  // Quality
  qualityStandard?: string;
  acceptanceCriteria?: string[];
  
  // Agile (if applicable)
  storyPoints?: StoryPointScale;
  sprintId?: string;
  epic?: string;
  
  // Tags
  tags: string[];
  
  // Comments
  comments: TaskComment[];
  
  // Attachments
  attachments: string[];
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskDependency {
  taskId: string;
  taskName: string;
  dependencyType: 'FS' | 'SS' | 'FF' | 'SF'; // Finish-to-Start, Start-to-Start, Finish-to-Finish, Start-to-Finish
  lag: number; // in days (can be negative for lead time)
}

export interface TaskComment {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt: string;
}

export interface Milestone {
  id: string;
  milestoneName: string;
  description: string;
  
  projectId: string;
  
  // Date
  plannedDate: string;
  actualDate?: string;
  
  // Status
  status: 'pending' | 'achieved' | 'missed' | 'cancelled';
  
  // Deliverables
  deliverables: string[];
  
  // Approval
  requiresApproval: boolean;
  approvedBy?: string;
  approvalDate?: string;
  
  createdAt: string;
}

export interface ProjectRisk {
  id: string;
  riskNumber: string;
  
  projectId: string;
  
  // Identification (PMBOK Risk Management)
  riskTitle: string;
  riskDescription: string;
  category: 'technical' | 'external' | 'organizational' | 'project-management';
  
  // Analysis
  probability: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
  impact: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
  
  // Quantitative
  probabilityPercentage: number;
  impactCost?: number;
  impactSchedule?: number; // in days
  
  // Score
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  
  // Response Strategy
  responseStrategy: 'avoid' | 'mitigate' | 'transfer' | 'accept';
  responseActions: string[];
  
  // Assignment
  owner: string;
  
  // Status
  status: 'identified' | 'assessed' | 'responded' | 'monitored' | 'closed';
  
  // Trigger
  trigger?: string;
  
  // Contingency
  contingencyPlan?: string;
  contingencyBudget?: number;
  
  // Actual Occurrence
  occurred: boolean;
  occurrenceDate?: string;
  actualImpact?: string;
  
  identifiedBy: string;
  identifiedAt: string;
  updatedAt: string;
}

export interface ProjectIssue {
  id: string;
  issueNumber: string;
  
  projectId: string;
  
  // Issue
  issueTitle: string;
  issueDescription: string;
  category: 'technical' | 'resource' | 'schedule' | 'budget' | 'quality' | 'scope' | 'other';
  
  // Severity
  severity: 'low' | 'medium' | 'high' | 'critical';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Impact
  impactArea: string[];
  impactDescription: string;
  
  // Assignment
  reportedBy: string;
  assignedTo: string;
  
  // Resolution
  status: 'open' | 'in-progress' | 'resolved' | 'closed' | 'wont-fix';
  resolutionPlan?: string;
  resolution?: string;
  
  // Dates
  reportedDate: string;
  targetResolutionDate?: string;
  actualResolutionDate?: string;
  
  // Escalation
  escalated: boolean;
  escalatedTo?: string;
  escalationDate?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface ChangeRequest {
  id: string;
  changeNumber: string;
  
  projectId: string;
  
  // Change
  changeTitle: string;
  changeDescription: string;
  changeReason: string;
  changeType: 'scope' | 'schedule' | 'cost' | 'quality' | 'resource' | 'other';
  
  // Impact Analysis
  scopeImpact?: string;
  scheduleImpact?: number; // days
  costImpact?: number;
  qualityImpact?: string;
  riskImpact?: string;
  
  // Benefits
  benefits: string;
  
  // Alternatives
  alternatives?: string;
  
  // Urgency
  urgency: 'low' | 'medium' | 'high' | 'critical';
  
  // Status
  status: 'submitted' | 'under-review' | 'approved' | 'rejected' | 'implemented' | 'cancelled';
  
  // Approval
  approvals: ChangeApproval[];
  
  // Implementation
  implementationPlan?: string;
  implementationDate?: string;
  
  requestedBy: string;
  requestedAt: string;
  updatedAt: string;
}

export interface ChangeApproval {
  approverRole: string;
  approverId?: string;
  approverName?: string;
  decision?: 'approved' | 'rejected' | 'conditional';
  comments?: string;
  approvalDate?: string;
}

// Agile/Scrum Specific
export interface Sprint {
  id: string;
  sprintNumber: number;
  sprintName: string;
  
  projectId: string;
  
  // Duration
  startDate: string;
  endDate: string;
  duration: number; // typically 2 weeks
  
  // Goal
  goal: string;
  
  // Capacity
  teamCapacity: number; // story points
  
  // Status
  status: SprintStatus;
  
  // Metrics
  plannedStoryPoints: number;
  completedStoryPoints: number;
  velocity: number;
  
  // Retrospective
  retrospective?: SprintRetrospective;
  
  createdAt: string;
}

export interface SprintRetrospective {
  whatWentWell: string[];
  whatCouldImprove: string[];
  actionItems: string[];
  conductedBy: string;
  conductedAt: string;
}

export interface UserStory {
  id: string;
  storyNumber: string;
  
  projectId: string;
  sprintId?: string;
  epicId?: string;
  
  // Story
  title: string;
  asA: string; // As a [user type]
  iWant: string; // I want [goal]
  soThat: string; // So that [benefit]
  
  // Estimation
  storyPoints: StoryPointScale;
  
  // Acceptance Criteria
  acceptanceCriteria: string[];
  
  // Priority (MoSCoW)
  priority: 'must-have' | 'should-have' | 'could-have' | 'wont-have';
  
  // Status
  status: 'backlog' | 'ready' | 'in-progress' | 'review' | 'done';
  
  // Assignment
  assignedTo?: string;
  
  // Tasks
  tasks: string[]; // Task IDs
  
  createdBy: string;
  createdAt: string;
}

// Project Analytics (PMBOK Performance Domain)
export class ProjectAnalytics {
  // Earned Value Management
  static calculateEVM(
    plannedValue: number,
    earnedValue: number,
    actualCost: number,
    budgetAtCompletion: number
  ): {
    cv: number;
    sv: number;
    cpi: number;
    spi: number;
    eac: number;
    etc: number;
    vac: number;
    tcpi: number;
  } {
    const cv = earnedValue - actualCost; // Cost Variance
    const sv = earnedValue - plannedValue; // Schedule Variance
    const cpi = earnedValue / (actualCost || 1); // Cost Performance Index
    const spi = earnedValue / (plannedValue || 1); // Schedule Performance Index
    const eac = budgetAtCompletion / cpi; // Estimate at Completion
    const etc = eac - actualCost; // Estimate to Complete
    const vac = budgetAtCompletion - eac; // Variance at Completion
    const tcpi = (budgetAtCompletion - earnedValue) / (budgetAtCompletion - actualCost); // To-Complete Performance Index
    
    return { cv, sv, cpi, spi, eac, etc, vac, tcpi };
  }
  
  // Critical Path Method
  static calculateCriticalPath(tasks: Task[]): string[] {
    // Simplified - assumes tasks have forward/backward pass calculated
    return tasks.filter(task => task.isCritical).map(task => task.id);
  }
  
  // Resource Utilization
  static calculateResourceUtilization(
    plannedHours: number,
    actualHours: number,
    availableHours: number
  ): {
    utilizationRate: number;
    efficiency: number;
  } {
    const utilizationRate = (actualHours / availableHours) * 100;
    const efficiency = (plannedHours / actualHours) * 100;
    
    return { utilizationRate, efficiency };
  }
  
  // Schedule Performance
  static calculateSchedulePerformance(
    plannedEndDate: Date,
    actualEndDate: Date,
    today: Date
  ): {
    variance: number; // days
    onSchedule: boolean;
  } {
    const variance = Math.ceil((actualEndDate.getTime() - plannedEndDate.getTime()) / (1000 * 60 * 60 * 24));
    const onSchedule = actualEndDate <= plannedEndDate;
    
    return { variance, onSchedule };
  }
  
  // Agile Velocity
  static calculateVelocity(sprints: Sprint[]): number {
    if (sprints.length === 0) return 0;
    
    const totalCompleted = sprints.reduce((sum, sprint) => sum + sprint.completedStoryPoints, 0);
    return totalCompleted / sprints.length;
  }
  
  // Sprint Burndown
  static calculateBurndown(
    totalStoryPoints: number,
    completedStoryPoints: number,
    sprintDays: number,
    currentDay: number
  ): {
    ideal: number;
    actual: number;
    remaining: number;
  } {
    const dailyIdeal = totalStoryPoints / sprintDays;
    const ideal = totalStoryPoints - (dailyIdeal * currentDay);
    const actual = totalStoryPoints - completedStoryPoints;
    const remaining = completedStoryPoints;
    
    return { ideal, actual, remaining };
  }
}

// Project Performance Metrics
export interface ProjectMetrics {
  projectId: string;
  period: string;
  
  // Schedule
  plannedProgress: number;
  actualProgress: number;
  scheduleVariance: number;
  spi: number;
  
  // Cost
  plannedCost: number;
  actualCost: number;
  costVariance: number;
  cpi: number;
  
  // EVM
  plannedValue: number;
  earnedValue: number;
  eac: number;
  etc: number;
  vac: number;
  
  // Resources
  resourceUtilization: number;
  
  // Quality
  defectDensity: number;
  reworkPercentage: number;
  
  // Risks & Issues
  activeRisks: number;
  openIssues: number;
  
  // Stakeholder
  stakeholderSatisfaction: number;
  
  // Team
  teamMorale: number;
  teamVelocity?: number; // for Agile
}
