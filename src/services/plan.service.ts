// src/services/plan.service.ts
import { pool } from '../config/database';
import { PlanDTO } from '../dto/plan.dto';

export async function createPlan(plan: PlanDTO) {
  const query = `
    INSERT INTO plans (
      teacher_id,
      institution_code,
      area,
      grade,
      period,
      academic_year,
      pedagogical_purpose,
      activities,
      evaluation_strategy,
      didactic_resources,
      inclusive_focus,
      diversity_notes,
      uses_technology,
      technology_type,
      evidence_type,
      evidence_reference,
      created_mode
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
      $11,$12,$13,$14,$15,$16,$17
    )
    RETURNING id
  `;

  const values = [
    plan.teacherId,
    plan.institutionCode,
    plan.area,
    plan.grade,
    plan.period,
    plan.academicYear,
    plan.pedagogicalPurpose,
    plan.activities,
    plan.evaluationStrategy ?? null,
    plan.didacticResources ?? null,
    plan.inclusiveFocus ?? false,
    plan.diversityNotes ?? null,
    plan.usesTechnology ?? false,
    plan.technologyType ?? null,
    plan.evidenceType ?? null,
    plan.evidenceReference ?? null,
    plan.createdMode
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}
