const express = require('express');
const cors = require('cors');
const { createClient } = require('@libsql/client');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// 1. Guardar o actualizar la investigación
app.post('/api/investigation', async (req, res) => {
  const { id, user_id, title, sections, permission_token, share_role } = req.body;
  const docId = id || uuidv4();
  
  try {
    // Si la petición viene con un token de compartir, verificamos si tiene permiso de edición
    if (permission_token) {
      const checkToken = await db.execute({
        sql: 'SELECT share_role FROM investigations WHERE id = ? AND share_token = ?',
        args: [docId, permission_token]
      });

      if (checkToken.rows.length > 0 && checkToken.rows[0].share_role === 'view_comment') {
        return res.status(403).json({ error: 'Permiso denegado: El enlace es de solo lectura y comentarios.' });
      }
    }

    await db.execute({
      sql: `INSERT INTO investigations (id, user_id, title, sections, share_token, share_role) 
            VALUES (?, ?, ?, ?, ?, ?) 
            ON CONFLICT(id) DO UPDATE SET 
              title=excluded.title, 
              sections=excluded.sections, 
              share_token=COALESCE(excluded.share_token, share_token),
              share_role=COALESCE(excluded.share_role, share_role),
              updated_at=CURRENT_TIMESTAMP`,
      args: [
        docId, 
        user_id || 'pedro-valverde', 
        title, 
        JSON.stringify(sections), 
        permission_token || null, 
        share_role || 'edit'
      ]
    });

    res.json({ status: 'exito', id: docId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Obtener investigación por ID y verificar su rol de acceso
app.get('/api/investigation/:id', async (req, res) => {
  const token = req.query.token;

  try {
    const result = await db.execute({
      sql: 'SELECT * FROM investigations WHERE id = ?',
      args: [req.params.id]
    });

    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    
    let row = result.rows[0];
    row.sections = JSON.parse(row.sections);

    // Si viene token, determinamos el rol asignado al enlace
    let currentRole = 'edit'; // Rol por defecto si eres el propietario local
    if (token && row.share_token === token) {
      currentRole = row.share_role;
    }

    res.json({ ...row, user_access_role: currentRole });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en http://localhost:${PORT}`));