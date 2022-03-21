import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [userName, setUserName] = useState("");
	const [image, setImage] = useState(null);
	const [userList, setUserList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch("/user")
			.then((res) => res.json())
			.then((data) => {
				setUserList(data);
				setIsLoading(false);
			});
	}, []);

	const onSubmit = () => {
		const formData = new FormData();
		formData.append("image", image);
		formData.append("userName", userName);

		fetch("/user", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				setUserList(data);
			});
	};

	if (isLoading) return <h3 className="d-flex justify-content-center align-items-center">Loading ...</h3>;

	return (
		<div className="container">
			<h1 className="text-center my-4">Upload Fullstack</h1>
			<div className="row">
				<form className="col-12 col-md-6 mx-auto" onSubmit={onSubmit}>
					<div className="mb-3">
						<label for="username" className="form-label">
							User Name
						</label>
						<input
							type="text"
							className="form-control"
							id="username"
							name="userName"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label for="image" className="form-label">
							Image
						</label>
						<input
							type="file"
							className="form-control"
							id="image"
							name="image"
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
			<div className="row mt-4">
				<div className="col col-md-6 mx-auto">
					<ul className="list-group">
						{userList &&
							userList.map((user, index) => {
								return (
									<li key={index} className="list-group-item">
										<div className="card mx-auto" style={{ width: "18rem" }}>
											<img
												className="card-img-top"
												src={`uploads/${user.image}`}
												alt={`Image ${user.userName}`}
											/>
											<div className="card-body">
												<h5 className="card-title">{user.userName}</h5>
											</div>
										</div>
									</li>
								);
							})}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default App;
