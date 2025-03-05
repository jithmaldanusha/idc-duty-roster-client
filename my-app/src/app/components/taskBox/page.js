import TaskCard from "../taskCard/page";

export default function TaskBox({ taskList, onRemove }) {
    return (
        <section>
            <div className="container border mt-3 mb-3">
                <div className="row">
                    {taskList.length > 0 ? (
                        taskList.map((task, index) => (
                            <div key={index} className="col-md-4 mb-3"> 
                                {/* col-md-4 makes it 3 columns per row */}
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
