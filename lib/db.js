import { neon } from "@neondatabase/serverless";

function getSQL() {
  return neon(process.env.DATABASE_URL);
}

export async function getResumesForUser(userId) {
  const sql = getSQL();
  const rows = await sql`
    SELECT id, title, created_at, updated_at
    FROM resumes
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
  `;
  return rows;
}

export async function getResumeById(id, userId) {
  const sql = getSQL();
  const rows = await sql`
    SELECT * FROM resumes
    WHERE id = ${id} AND user_id = ${userId}
  `;
  return rows[0] || null;
}

export async function createResume(userId, title, formData) {
  const sql = getSQL();
  const rows = await sql`
    INSERT INTO resumes (user_id, title, form_data)
    VALUES (${userId}, ${title}, ${JSON.stringify(formData)})
    RETURNING *
  `;
  return rows[0];
}

export async function updateResume(id, userId, title, formData) {
  const sql = getSQL();
  const rows = await sql`
    UPDATE resumes
    SET title = ${title},
        form_data = ${JSON.stringify(formData)},
        updated_at = NOW()
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteResume(id, userId) {
  const sql = getSQL();
  await sql`
    DELETE FROM resumes
    WHERE id = ${id} AND user_id = ${userId}
  `;
}
