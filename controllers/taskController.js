import catchAsync from "../utils/catchAsync.js";
import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";
import QueryFeatures from "../utils//QueryFeatures.js";

const createTask = catchAsync(async (req, res, next) => {
    const task = new Task({ ...req.body, userId: req.user._id });
    if (!task) return next(new AppError(400, "undefined task"));
    await task.save();
    res.status(201).json({
        status: "success",
        message: "task created successfully",
        task: task,
    });
});

const deleteTask = catchAsync(async (req, res, next) => {
    const task = await Task.findOne({
        userId: req.user._id,
        _id: req.params.id,
    });
    if (!task) return next(new AppError(404, "task not found"));
    await task.deleteOne();
    res.status(204).json({
        status: "success",
        message: "task deleted successfully",
    });
});

const updateTask = catchAsync(async (req, res, next) => {
    let task = await Task.findOne({
        userId: req.user._id,
        _id: req.params.id,
    });
    if (!task) return next(new AppError(404, "task not found"));
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
    const features = new QueryFeatures(
        Task.find({ userId: req.user._id }),
        req.query
    ).filter();
    const totalCount = await Task.countDocuments(features.query.getFilter());

    const finalFeatures = features.sort().paginate();

    const tasks = await finalFeatures.query;

    res.status(200).json({
        status: "success",
        message: "task fetched",
        page: finalFeatures.page,
        limit: finalFeatures.limit,
        totalCount,
        tasks,
    });
});

const getTaskById = catchAsync(async (req, res, next) => {
    const task = await Task.findOne({
        userId: req.user._id,
        _id: req.params.id,
    });
    if (!task) return next(new AppError(404, "task not exist"));
    res.status(200).json({
        status: "success",
        message: "task fetched",
        task: task,
    });
});

export { createTask, deleteTask, updateTask, getTaskById, getTasks };
