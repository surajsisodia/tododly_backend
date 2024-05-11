const { dbInstance } = require('../configs/db.js')
const oracledb = require('oracledb');


exports.getTodoList = async (req, res) => {

    const query = `SELECT * FROM tasks`;

    let result = await dbInstance().execute(query, [], {outFormat: oracledb.OUT_FORMAT_OBJECT});

    return res.status(200).json({ message: "Task fetched successfuly", data: result.rows});

}

exports.createTodoList = async (req, res) => {

    console.log("Creating task");

    const user = req.user || 'test_user';

    const task = req.body;
    console.log(req.body);


    const query = `INSERT INTO tasks 
                   (TASK_ID,
                    TITLE,
                    DESCRIPTION,
                    CREATED_AT,
                    CREATED_BY, 
                    LAST_UPDATED_AT, 
                    LAST_UPDATED_BY)
                    
                VALUES(
                    TASK_ID_S.NEXTVAL,
                    :title,
                    :des,
                    SYSDATE,
                    :created_by,
                    SYSDATE,
                    :last_updated_by
                ) RETURNING task_id
                into :task_id`;

    try {
        let result = await dbInstance().execute(query,
            {
                title: task.title,
                des: task.description,
                created_by: user,
                last_updated_by: user,
                task_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
            }
        );

        const task_id = result.outBinds.task_id[0];
        result = await dbInstance().execute('SELECT * FROM tasks WHERE task_id = :1', [task_id], { outFormat: oracledb.OUT_FORMAT_OBJECT })

        console.log(result.rows);
        dbInstance().commit();
        return res.status(201).json({ message: "Task created successfuly", data: result.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "message": "Error Encountered" });
    }
}

exports.updateTask = async (req, res) => {

    const task = req.body;
    console.log(req.body);

    const query = `UPDATE tasks
                        SET title = :1,
                            description = :2,
                            last_updated_by = :3,
                            last_updated_at = SYSDATE
                        WHERE
                            task_id = :4`;

    let result = await dbInstance().execute(query, [task.title, task.description, 'test', task.task_id]);

    result = await dbInstance().execute('SELECT * FROM tasks WHERE task_id = :1', [task.task_id], { outFormat: oracledb.OUT_FORMAT_OBJECT });

    dbInstance().commit();
    return res.status(200).json({ message: "Task updated successfuly", data: result.rows[0]});
}