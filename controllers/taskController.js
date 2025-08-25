import catchAsync from "../utils/catchAsync.js";
import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";

const createTask = catchAsync(async (req, res, next) => {
    const task = new Task({ ...req.body, userId: req.user._id });
    if (!task) return next(new AppError(400, "undefined task"));
    await task.save();
    res.status(200).json({
        status: "success",
        message: "task created successfully",
        task: task,
    });
});

const deleteTask = catchAsync(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new AppError(404, "task not found"));
    if (String(req.user._id) !== String(task.userId)) {
        return next(new AppError(400, "you are not allowed"));
    }
    await task.deleteOne();
    res.status(200).json({
        status: "success",
        message: "task deleted successfully",
    });
});

const updateTask = catchAsync(async (req, res, next) => {
    let task = await Task.findById(req.params.id);
    if (!task) return next(new AppError(404, "task not found"));
    if (String(req.user._id) !== String(task.userId))
        return next(new AppError(400, "you are not allowed"));
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    await task.save();
    res.status(200).json({
        status: "success",
        message: "task updated successfully",
        task: task,
    });
});

const getTasks = catchAsync(async (req, res, next) => {
    const { search, page = 1, limit = 10, ...filters } = req.query;
    const query = { ...filters };
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }
    const tasks = await Task.find({ userId: req.user._id, ...query })
        .skip(req.pagination.skip)
        .limit(req.pagination.limit);
    console.log("tasks fetched");
    if (!tasks || tasks.length === 0)
        return next(new AppError(404, "no tasks exists"));
    const totalCount = await Task.countDocuments({
        userId: req.user._id,
        ...query,
    });
    res.status(200).json({
        status: "success",
        message: "task fetched",
        page,
        limit,
        totalCount,
        tasks,
    });
});

const getTaskById = catchAsync(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new AppError(404, "task not exist"));
    if (String(req.user._id) !== String(task.userId))
        return next(new AppError(400, "you are not allowed"));
    res.status(200).json({
        status: "success",
        message: "task fetched",
        task: task,
    });
});

export { createTask, deleteTask, updateTask, getTaskById, getTasks };
