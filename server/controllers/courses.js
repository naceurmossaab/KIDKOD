const mongoose = require("mongoose");
const Courses = require("../models/courses");

module.exports = {
	add_course: async (req, res) => {
		try {
			let course = req.body;
			const savedCourse = await Courses.create(course);
			res.send(savedCourse);
		} catch (error) {
			res.send(error);
		}
	},
	add_many_courses: async (req, res) => {
		try {
			let courses = req.body.courses;
			const savedCourses = await Courses.insertMany(courses);
			res.send(savedCourses);
		} catch (error) {
			res.send(error);
		}
	},
	find_all_courses: async (req, res) => {
		try {
			const courses = await Courses.find();
			res.send(courses);
		} catch (error) {
			res.send(error);
		}
	},
	find_one_course: async (req, res) => {
		try {
			let id = req.params._id;
			const course = await Courses.findById(id);
			res.send(course);
		} catch (error) {
			res.send(error);
		}
	},
	delete_one_course: async (req, res) => {
		try {
			let id = req.params._id;
			const course = await Courses.findByIdAndRemove(id);
			res.send(course);
		} catch (error) {
			res.send(error);
		}
	},
	update_one_course: async (req, res) => {
		try {
			let id = req.params._id;
			let update = req.body;
			const course = await Courses.findByIdAndUpdate(id, update);
			res.send(course);
		} catch (error) {
			res.send(error);
		}
	},
};
