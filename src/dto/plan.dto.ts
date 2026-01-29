// src/dto/plan.dto.ts
export interface PlanDTO {
  teacherId: number;
  institutionCode: string;

  area: string;
  grade: string;
  period: string;
  academicYear: number;

  pedagogicalPurpose: string;
  activities: string;
  evaluationStrategy?: string;
  didacticResources?: string;

  inclusiveFocus?: boolean;
  diversityNotes?: string;

  usesTechnology?: boolean;
  technologyType?: string;

  evidenceType?: string;
  evidenceReference?: string;

  createdMode: 'OFFLINE' | 'ONLINE';
}
