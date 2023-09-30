import { useState, useContext } from "react";
import {
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";
const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;
	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInUserWithEmailAndPassword(email, password);
			resetFormFields();
		} catch (error) {
			if (error.code === "auth/invalid-login-credentials") {
				alert("Please enter valid login credentials!");
			} else {
				console.log("user creation encounter an error:", error);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};
	return (
		<div className='sign-in-container'>
			<h2>Already have an account?</h2>
			<span>Sign In with your email and password</span>
			<form onSubmit={handleSubmit}>
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
				<div className='buttons-container'>
					<Button type='submit'>Sign In </Button>
					<Button
						buttonType={"google"}
						type='button'
						onClick={signInWithGoogle}>
						Signin with Google
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
