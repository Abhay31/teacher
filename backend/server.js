const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3307,
  user: "root",
  password: "",
  database: "teacher_db",
  charset: "utf8mb4",
});

db.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + db.threadId);
});

const secret = "your_jwt_secret_key";

const upload = multer({ dest: "uploads/" });

// Retrieve Pages Data (GET)

app.get("/api/signup", (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

app.get("/api/signup/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM user WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("No user found.");
    }
    res.status(200).send(results[0]);
  });
});

app.get("/api/categorya", (req, res) => {
  const sql = "SELECT * FROM masterA";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

app.get("/api/categoryb", (req, res) => {
  const sql = "SELECT * FROM masterB";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

app.get("/api/school", (req, res) => {
  const { school_name, district, taluka, talukaName, pincode, udise_no } =
    req.query;

  let sql = "SELECT * FROM school WHERE 1=1";
  const params = [];

  if (school_name) {
    sql += " AND school_name LIKE ?";
    params.push(`%${school_name}%`);
  }
  if (district) {
    sql += " AND district LIKE ?";
    params.push(`%${district}%`);
  }
  if (taluka) {
    sql += " AND taluka LIKE ?";
    params.push(taluka);
  }
  if (talukaName) {
    sql += " AND talukaName LIKE ?";
    params.push(`%${talukaName}%`);
  }
  if (pincode) {
    sql += " AND pincode LIKE ?";
    params.push(`%${pincode}%`);
  }
  if (udise_no) {
    sql += " AND udise_no LIKE ?";
    params.push(`%${udise_no}%`);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

app.get("/api/school/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM school WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("No school found.");
    }
    res.status(200).send(results[0]);
  });
});

app.get("/api/teacher", async (req, res) => {
  try {
    const conn = db.promise();

    const teacherQuery = `
      SELECT t.*, td.state AS taluka_state, td.code AS taluka_code, td.name AS taluka_name,
        ae.university AS acad_university, ae.degree AS acad_degree, ae.specialization AS acad_specialization, ae.city AS acad_city, ae.start_date AS acad_start_date, ae.end_date AS acad_end_date,
        me.university AS main_university, me.degree AS main_degree, me.specialization AS main_specialization, me.city AS main_city, me.start_date AS main_start_date, me.end_date AS main_end_date
      FROM teacher t
      LEFT JOIN TalukaData td ON t.pranno = td.employee_pranno
      LEFT JOIN AcadEducations ae ON t.pranno = ae.employee_pranno
      LEFT JOIN MainEducations me ON t.pranno = me.employee_pranno
    `;

    const [rows] = await conn.query(teacherQuery);

    // Transform the result to group related data
    const teachers = rows.reduce((acc, row) => {
      const {
        pranno,
        empname,
        fname,
        mname,
        dob,
        gender,
        mobile,
        salaryid,
        aadharno,
        panno,
        marital,
        dateofapp,
        address,
        heightFeet,
        heightInches,
        marks,
        caste,
        appcaste,
        udise,
        schname,
        schooljoin,
        photo,
        teachingsubtype,
        teachingmedium,
        awardDescription,
        otherAwardReason,
        punishmentDescription,
        otherPunishmentReason,
        taluka_state,
        taluka_code,
        taluka_name,
        acad_university,
        acad_degree,
        acad_specialization,
        acad_city,
        acad_start_date,
        acad_end_date,
        main_university,
        main_degree,
        main_specialization,
        main_city,
        main_start_date,
        main_end_date,
      } = row;

      if (!acc[pranno]) {
        acc[pranno] = {
          pranno,
          empname,
          fname,
          mname,
          dob,
          gender,
          mobile,
          salaryid,
          aadharno,
          panno,
          marital,
          dateofapp,
          address,
          heightFeet,
          heightInches,
          marks,
          caste,
          appcaste,
          udise,
          schname,
          schooljoin,
          photo,
          teachingsubtype,
          teachingmedium,
          awardDescription,
          otherAwardReason,
          punishmentDescription,
          otherPunishmentReason,
          talukaData: [],
          acadeducations: [],
          maineducations: [],
        };
      }

      if (taluka_state && taluka_code && taluka_name) {
        acc[pranno].talukaData.push({
          state: taluka_state,
          code: taluka_code,
          name: taluka_name,
        });
      }

      if (acad_university && acad_degree) {
        acc[pranno].acadeducations.push({
          university: acad_university,
          degree: acad_degree,
          specialization: acad_specialization,
          city: acad_city,
          start_date: acad_start_date,
          end_date: acad_end_date,
        });
      }

      if (main_university && main_degree) {
        acc[pranno].maineducations.push({
          university: main_university,
          degree: main_degree,
          specialization: main_specialization,
          city: main_city,
          start_date: main_start_date,
          end_date: main_end_date,
        });
      }

      return acc;
    }, {});

    res.status(200).send(Object.values(teachers));
  } catch (err) {
    console.error("Error fetching teacher data:", err);
    res
      .status(500)
      .send({ error: "Error fetching teacher data", details: err.message });
  }
});

app.get("/api/teacher/:pranno", async (req, res) => {
  const { pranno } = req.params;

  try {
    const conn = db.promise();

    const teacherQuery = `
      SELECT t.*, td.state AS taluka_state, td.code AS taluka_code, td.name AS taluka_name,
        ae.university AS acad_university, ae.degree AS acad_degree, ae.specialization AS acad_specialization, ae.city AS acad_city, ae.start_date AS acad_start_date, ae.end_date AS acad_end_date, ae.cgpa AS acad_cgpa,
        me.university AS main_university, me.degree AS main_degree, me.specialization AS main_specialization, me.city AS main_city, me.start_date AS main_start_date, me.end_date AS main_end_date, me.cgpa AS main_cgpa
      FROM teacher t
      LEFT JOIN TalukaData td ON t.pranno = td.employee_pranno
      LEFT JOIN AcadEducations ae ON t.pranno = ae.employee_pranno
      LEFT JOIN MainEducations me ON t.pranno = me.employee_pranno
      WHERE t.pranno = ?
    `;

    const [rows] = await conn.query(teacherQuery, [pranno]);

    if (rows.length === 0) {
      return res.status(404).send("No teacher found.");
    }

    // Transform the result to group related data
    const teacherData = rows.reduce((acc, row) => {
      const {
        pranno,
        empname,
        fname,
        mname,
        dob,
        gender,
        mobile,
        salaryid,
        aadharno,
        panno,
        marital,
        dateofapp,
        address,
        heightFeet,
        heightInches,
        marks,
        caste,
        appcaste,
        udise,
        schname,
        schooljoin,
        teachingsubtype,
        teachingmedium,
        awardDescription,
        otherAwardReason,
        punishmentDescription,
        otherPunishmentReason,
        trainee,
        assistant,
        graduate,
        taluka_state,
        taluka_code,
        taluka_name,
        acad_university,
        acad_degree,
        acad_specialization,
        acad_city,
        acad_start_date,
        acad_end_date,
        acad_cgpa,
        main_university,
        main_degree,
        main_specialization,
        main_city,
        main_start_date,
        main_end_date,
        main_cgpa,
      } = row;

      if (!acc) {
        acc = {
          pranno,
          empname,
          fname,
          mname,
          dob,
          gender,
          mobile,
          salaryid,
          aadharno,
          panno,
          marital,
          dateofapp,
          address,
          heightFeet,
          heightInches,
          marks,
          caste,
          appcaste,
          udise,
          schname,
          schooljoin,
          teachingsubtype,
          teachingmedium,
          awardDescription,
          otherAwardReason,
          punishmentDescription,
          otherPunishmentReason,
          trainee,
          assistant,
          graduate,
          talukaData: [],
          acadeducations: [],
          maineducations: [],
        };
      }

      if (taluka_state && taluka_code && taluka_name) {
        acc.talukaData.push({
          state: taluka_state,
          code: taluka_code,
          name: taluka_name,
        });
      }

      if (acad_university && acad_degree) {
        acc.acadeducations.push({
          university: acad_university,
          degree: acad_degree,
          specialization: acad_specialization,
          city: acad_city,
          start_date: acad_start_date,
          end_date: acad_end_date,
          cgpa: acad_cgpa,
        });
      }

      if (main_university && main_degree) {
        acc.maineducations.push({
          university: main_university,
          degree: main_degree,
          specialization: main_specialization,
          city: main_city,
          start_date: main_start_date,
          end_date: main_end_date,
          cgpa: main_cgpa,
        });
      }

      return acc;
    }, null);

    res.status(200).send(teacherData);
  } catch (err) {
    console.error("Error fetching teacher data:", err);
    res
      .status(500)
      .send({ error: "Error fetching teacher data", details: err.message });
  }
});

// Add Pages Data (POST)

app.post("/api/signup", (req, res) => {
  const { username, email, mobile, password } = req.body;

  const sql =
    "INSERT INTO user (username, email, mobile, password ) VALUES (?, ?, ?, ?)";
  db.query(sql, [username, email, mobile, password], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: "User Signup successfully" });
  });
});

app.post("/api/school/bulk", upload.single("file"), (req, res) => {
  const fileRows = [];

  // Open uploaded file
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      fileRows.push(row);
    })
    .on("end", () => {
      // Remove file after processing
      fs.unlinkSync(req.file.path);

      const sql =
        "INSERT INTO school (school_name, classes, district, taluka, talukaName, pincode, udise_no, address) VALUES ?";
      const values = fileRows.map((row) => [
        row.school_name,
        row.classes,
        row.district,
        row.taluka,
        row.talukaName,
        row.pincode,
        row.udise_no,
        row.address,
      ]);

      db.query(sql, [values], (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res
          .status(200)
          .send({ message: "Schools added successfully from CSV" });
      });
    });
});

app.post("/api/school", (req, res) => {
  const {
    school_name,
    classes,
    district,
    taluka,
    talukaName,
    pincode,
    udise_no,
    address,
  } = req.body;

  const sql =
    "INSERT INTO school (school_name, classes, district, taluka, talukaName, pincode, udise_no, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      school_name,
      classes,
      district,
      taluka,
      talukaName,
      pincode,
      udise_no,
      address,
    ],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send(err);
      }
      res.status(200).send({ message: "School added successfully" });
    }
  );
});

app.post("/api/teacher", async (req, res) => {
  const {
    pranno,
    empname,
    fname,
    mname,
    dob,
    gender,
    mobile,
    salaryid,
    aadharno,
    panno,
    marital,
    dateofapp,
    address,
    heightFeet,
    heightInches,
    marks,
    caste,
    appcaste,
    udise,
    schname,
    schooljoin,
    teachingsubtype,
    teachingmedium,
    awardDescription,
    otherAwardReason,
    punishmentDescription,
    otherPunishmentReason,
    talukaData,
    acadeducations,
    maineducations,
  } = req.body;

  const conn = db.promise();

  try {
    await conn.beginTransaction();

    const insertEmployeeQuery = `
      INSERT INTO teacher (
        pranno, empname, fname, mname, dob, gender, mobile, salaryid, aadharno, panno,
        marital, dateofapp, address, heightFeet, heightInches, marks, caste, appcaste, udise,
        schname, schooljoin, teachingsubtype, teachingmedium, awardDescription,
        otherAwardReason, punishmentDescription, otherPunishmentReason
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const employeeValues = [
      pranno,
      empname,
      fname,
      mname,
      dob,
      gender,
      mobile,
      salaryid,
      aadharno,
      panno,
      marital,
      dateofapp,
      address,
      heightFeet,
      heightInches,
      marks,
      caste,
      appcaste,
      udise,
      schname,
      schooljoin,
      teachingsubtype,
      teachingmedium,
      awardDescription || null,
      otherAwardReason || null,
      punishmentDescription || null,
      otherPunishmentReason || null,
    ];

    await conn.query(insertEmployeeQuery, employeeValues);

    const insertTalukaDataQuery = `
      INSERT INTO TalukaData (employee_pranno, state, code, name) VALUES (?, ?, ?, ?)
    `;

    for (let taluka of talukaData) {
      await conn.query(insertTalukaDataQuery, [
        pranno,
        taluka.state,
        taluka.code,
        taluka.name,
      ]);
    }

    const insertAcadEducationQuery = `
      INSERT INTO AcadEducations (employee_pranno, university, degree, specialization, city, start_date, end_date, cgpa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (let education of acadeducations) {
      await conn.query(insertAcadEducationQuery, [
        pranno,
        education.university,
        education.degree,
        education.specialization,
        education.city,
        education.start_date,
        education.end_date,
        education.cgpa,
      ]);
    }

    const insertMainEducationQuery = `
      INSERT INTO MainEducations (employee_pranno, university, degree, specialization, city, start_date, end_date, cgpa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (let education of maineducations) {
      await conn.query(insertMainEducationQuery, [
        pranno,
        education.university,
        education.degree,
        education.specialization,
        education.city,
        education.start_date,
        education.end_date,
        education.cgpa,
      ]);
    }

    await conn.commit();
    res.status(201).send({ message: "Teacher data inserted successfully" });
  } catch (error) {
    await conn.rollback();
    console.error("Error inserting teacher data:", error);
    res
      .status(500)
      .send({ error: "Error inserting teacher data", details: error.message });
  }
});

// Update Pages

app.put("/api/award/:pranno", (req, res) => {
  const pranno = req.params.pranno;
  const { awardDescription, otherAwardReason } = req.body;

  const sql = `
      UPDATE teacher
      SET awardDescription = ?, otherAwardReason = ?
      WHERE pranno = ?
  `;
  db.query(sql, [awardDescription, otherAwardReason, pranno], (err, result) => {
    if (err) {
      return res.status(500).send({ error: "Database error", details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Award not found" });
    }
    res.status(200).send({ message: "Award updated successfully" });
  });
});

app.put("/api/punishment/:pranno", (req, res) => {
  const pranno = req.params.pranno;
  const { punishmentDescription, otherPunishmentReason } = req.body;

  const sql = `
      UPDATE teacher
      SET punishmentDescription = ?, otherPunishmentReason = ?
      WHERE pranno = ?
  `;
  db.query(
    sql,
    [punishmentDescription, otherPunishmentReason, pranno],
    (err, result) => {
      if (err) {
        return res.status(500).send({ error: "Database error", details: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Punishment not found" });
      }
      res.status(200).send({ message: "Punishment updated successfully" });
    }
  );
});

app.put("/api/school/:id", (req, res) => {
  const { id } = req.params;
  const {
    school_name,
    classes,
    district,
    taluka,
    talukaName,
    pincode,
    udise_no,
    address,
  } = req.body;

  const sql =
    "UPDATE school SET school_name = ?, classes = ?, district = ?, taluka = ?, talukaName = ?, pincode = ?, udise_no = ?, address = ? WHERE id = ?";
  db.query(
    sql,
    [
      school_name,
      classes,
      district,
      taluka,
      talukaName,
      pincode,
      udise_no,
      address,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res
        .status(200)
        .send({ message: `School with id ${id} updated successfully` });
    }
  );
});

app.put("/api/teacher/promote/:pranno", (req, res) => {
  const { pranno } = req.params;
  const { assistant, graduate } = req.body;

  // Construct the SQL query to update the promotion status
  let updateQuery = "UPDATE teacher SET ";
  if (assistant) {
    updateQuery += "assistant = TRUE ";
  }
  if (graduate) {
    if (assistant) updateQuery += ", ";
    updateQuery += "graduate = TRUE ";
  }
  updateQuery += "WHERE pranno = ?";

  // Execute the query
  db.query(updateQuery, [pranno], (err, result) => {
    if (err) {
      console.error("Error updating promotion status: ", err);
      return res
        .status(500)
        .json({ error: "An error occurred while promoting." });
    }
    res.json({ message: "Promotion status updated successfully." });
  });
});

// Remove Pages Data (DELETE)

app.delete("/api/school/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM school WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res
      .status(200)
      .send({ message: `School with id ${id} deleted successfully` });
  });
});

app.put("/api/teacher/:pranno", async (req, res) => {
  const { pranno } = req.params;
  const {
    empname,
    fname,
    mname,
    dob,
    gender,
    mobile,
    salaryid,
    aadharno,
    panno,
    marital,
    dateofapp,
    address,
    heightFeet,
    heightInches,
    marks,
    caste,
    appcaste,
    udise,
    schname,
    schooljoin,
    teachingsubtype,
    teachingmedium,
    talukaData,
    awardDescription,
    otherAwardReason,
    punishmentDescription,
    otherPunishmentReason,
    acadeducations,
    maineducations,
  } = req.body;

  const conn = db.promise();

  try {
    await conn.beginTransaction();

    const updateEmployeeQuery = `
      UPDATE teacher SET
        empname = ?, fname = ?, mname = ?, dob = ?, gender = ?, mobile = ?, salaryid = ?, aadharno = ?, panno = ?, marital = ?, dateofapp = ?, address = ?, heightFeet = ?, heightInches = ?, marks = ?, caste = ?, appcaste = ?, udise = ?, schname = ?, schooljoin = ?, teachingsubtype = ?, teachingmedium = ?, awardDescription = ?, otherAwardReason = ?, punishmentDescription = ?, otherPunishmentReason = ?
      WHERE pranno = ?
    `;

    const employeeValues = [
      empname,
      fname,
      mname,
      dob,
      gender,
      mobile,
      salaryid,
      aadharno,
      panno,
      marital,
      dateofapp,
      address,
      heightFeet,
      heightInches,
      marks,
      caste,
      appcaste,
      udise,
      schname,
      schooljoin,
      teachingsubtype,
      teachingmedium,
      awardDescription,
      otherAwardReason,
      punishmentDescription,
      otherPunishmentReason,
      pranno,
    ];

    await conn.query(updateEmployeeQuery, employeeValues);

    const deleteTalukaDataQuery = `DELETE FROM TalukaData WHERE employee_pranno = ?`;
    await conn.query(deleteTalukaDataQuery, [pranno]);

    const insertTalukaDataQuery = `
      INSERT INTO TalukaData (employee_pranno, state, code, name) VALUES (?, ?, ?, ?)
    `;

    for (let taluka of talukaData) {
      await conn.query(insertTalukaDataQuery, [
        pranno,
        taluka.state,
        taluka.code,
        taluka.name,
      ]);
    }

    const deleteAcadEducationQuery = `DELETE FROM acadeducations WHERE employee_pranno = ?`;
    await conn.query(deleteAcadEducationQuery, [pranno]);

    const insertAcadEducationQuery = `
      INSERT INTO apm startcadeducations (employee_pranno, university, degree, specialization, city, start_date, end_date, cgpa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (let education of acadeducations) {
      await conn.query(insertAcadEducationQuery, [
        pranno,
        education.university,
        education.degree,
        education.specialization,
        education.city,
        education.start_date,
        education.end_date,
        education.cgpa,
      ]);
    }

    const deleteMainEducationQuery = `DELETE FROM MainEducations WHERE employee_pranno = ?`;
    await conn.query(deleteMainEducationQuery, [pranno]);

    const insertMainEducationQuery = `
      INSERT INTO MainEducations (employee_pranno, university, degree, specialization, city, start_date, end_date, cgpa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (let education of maineducations) {
      await conn.query(insertMainEducationQuery, [
        pranno,
        education.university,
        education.degree,
        education.specialization,
        education.city,
        education.start_date,
        education.end_date,
        education.cgpa,
      ]);
    }

    await conn.commit();
    res.status(200).send({ message: "Teacher data updated successfully" });
  } catch (error) {
    await conn.rollback();
    console.error("Error updating teacher data:", error);
    res
      .status(500)
      .send({ error: "Error updating teacher data", details: error.message });
  }
});

// Port Details

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
