import { useState } from "react";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("passwords do not match");
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);
			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/email-already-in-use":
					alert("Cannot create user, email already taken");
					break;
				case "auth/weak-password":
					alert("Password should be at least 6 characters");
					break;
				default:
					console.log("user creation encounter an error:", error);
					break;
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};
	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					name='displayName'
					type='text'
					value={displayName}
					required
					onChange={handleChange}
				/>
				<FormInput
					label='Email'
					name='email'
					type='email'
					value={email}
					required
					onChange={handleChange}
				/>
				<FormInput
					label='Password'
					name='password'
					type='password'
					value={password}
					required
					onChange={handleChange}
				/>
				<FormInput
					label='Confirm Password'
					name='confirmPassword'
					type='password'
					value={confirmPassword}
					required
					onChange={handleChange}
				/>
				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
