import axios from "axios";
import { useEffect, useState } from "react";
import scss from "./TodoList.module.scss";

const url =
	"https://elchocrud.pro/api/v1/f7bc256e44afd8eaa07978bfd65bbad3/todo";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [isEdit, setIsEdit] = useState(false);
	const [editId, setEditId] = useState("");
	const [editTitle, setEditTitle] = useState("");
	const [editImage, setEditImage] = useState("");
	const [editDescription, setEditDescription] = useState("");

	const handleAdd = async () => {
		const newData = { title: title, image: image, description: description };
		const response = await axios.post(url, newData);
		setTodos(response.data);
		setTitle("");
		setImage("");
		setDescription("");
	};

	const getTodos = async () => {
		const response = await axios.get(url);
		setTodos(response.data);
	};

	const deleteTodo = async (id) => {
		await axios.delete(`${url}/${id}`);
		setTodos(todos.filter((todo) => todo._id !== id));
	};

	const updateTodo = async (id) => {
		const updatedData = {
			title: editTitle,
			image: editImage,
			description: editDescription,
		};
		setEditTitle("");
		setEditImage("");
		setEditDescription("");

		const response = await axios.put(`${url}/${id}`, updatedData);
		setIsEdit(false);
		setTodos(response.data);
	};

	const deleteAll = async () => {
		const response = await axios.delete(url);
		setTodos(response.data);
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<>
			<div>
				<h1 className={scss.todo}>TodoList</h1>
				<div className={scss.container}>
					<div className={scss.inputs_1}>
						<input
							placeholder="title"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<input
							placeholder="image"
							type="text"
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>
						<input
							placeholder="description"
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<div className={scss.buttons_1}>
							<button className={scss.addButton} onClick={handleAdd}>
								Add
							</button>

							<button className={scss.deleteAllButton} onClick={deleteAll}>
								delete all
							</button>
						</div>
					</div>
				</div>

				{/* //! map */}
				<div className={scss.main}>
					{todos.map((item) => (
						<div
							className={scss.content}
							key={`${item._id}-${isEdit}-${editId}`}>
							<div className={scss.cards}>
								{isEdit === item._id ? (
									<>
										<div className={scss.inputs_2}>
											<input
												placeholder="title"
												type="text"
												value={editTitle}
												onChange={(e) => setEditTitle(e.target.value)}
											/>
											<input
												placeholder="image"
												type="text"
												value={editImage}
												onChange={(e) => setEditImage(e.target.value)}
											/>
											<input
												placeholder="description"
												type="text"
												value={editDescription}
												onChange={(e) => setEditDescription(e.target.value)}
											/>

											<div className={scss.cardButtons}>
												<button className={scss.update} onClick={() => updateTodo(item._id)}>
													Update
												</button>
												<button
													onClick={() => {
														setIsEdit(false);
														setTitle(item.title);
														setImage(item.image);
														setDescription(item.description);
													}}>
													Cancel
												</button>
											</div>
										</div>
									</>
								) : (
									<>
										<div className={scss.card}>
											<div className={scss.h1_p}>
												<h1>{item.title}</h1>
												<p>{item.description}</p>
											</div>
											<img
												className={scss.image}
												src={item.image}
												alt={item.title}
											/>
											<div className={scss.cardsButtons}>
												<button
													className={scss.delete}
													onClick={() => deleteTodo(item._id)}>
													Delete
												</button>
												<button
													className={scss.edit_button}
													onClick={() => {
														setIsEdit(item._id);
													}}>
													Edit
												</button>
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
export default TodoList;
