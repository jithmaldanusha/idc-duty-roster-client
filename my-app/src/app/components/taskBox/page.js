import TaskCard from "../taskCard/page";

export default function TaskBox({ taskList = [], onRemove }) { // Set default to empty array
    return (
        <section>
            <div className="container border mt-3 mb-3">
                <div className="row">
                    {Array.isArray(taskList) && taskList.length > 0 ? (
                        taskList.map((task, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <TaskCard task={task} onRemove={() => onRemove(index)} />
                            </div>
                        ))
                    ) : (
                        <p>No tasks added yet.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
