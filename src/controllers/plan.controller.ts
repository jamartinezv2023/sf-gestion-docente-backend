// src/controllers/plan.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { pool } from '../config/database';

export async function createPlanController(
  req: AuthRequest,
  res: Response
) {
  try {
    const teacherId = req.user!.id;

    const {
      area,
      grade,
      period,
      academic_year,
      pedagogical_purpose,
      activities,
      evaluation_strategy,
      uses_technology,
      technology_type
    } = req.body;

    const result = await pool.query(
      `
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
        uses_technology,
        technology_type,
        created_mode
      )
      VALUES (
        $1,
        'SF-PALMIRA',
        $2, $3, $4, $5,
        $6, $7, $8,
        $9, $10,
        'ONLINE'
      )
      RETURNING id
      `,
      [
        teacherId,
        area,
        grade,
        period,
        academic_year,
        pedagogical_purpose,
        activities,
        evaluation_strategy,
        uses_technology,
        technology_type
      ]
    );

    return res.status(201).json({
      status: 'OK',
      mode: 'ONLINE',
      plan_id: result.rows[0].id
    });

  } catch (error: any) {
    return res.status(500).json({
      status: 'ERROR',
      message: error.message
    });
  }
}
