import SingleTask from "./SingleTask";

const DisplayTasks = ({ tasks = [] }) => (
    tasks.map( (solo) => {
        return <SingleTask task={solo} />
    })
);

export default DisplayTasks;