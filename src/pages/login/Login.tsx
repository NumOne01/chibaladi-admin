import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { login } from 'api/auth';
import { LoginForm } from 'api/auth/models/LoginForm';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { RootState } from 'store';
import { setUser } from 'store/auth';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';

const validationSchema = Yup.object({
	username: Yup.string().required('نام کاربری الزامی است'),
	password: Yup.string().required('رمز عبور الزامی است')
});

interface FormValue {
	username: string;
	password: string;
}

const initialValues: FormValue = {
	username: '',
	password: ''
};

export default function Login() {
	const [formState, setFormState] = useState({ error: '', loading: false });
	const history = useHistory();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(
		(store: RootState) => !!store.auth.data.access_token
	);

	const onSubmit = (values: FormValue) => {
		setFormState({ loading: true, error: '' });
		const loginData: LoginForm = {
			...values,
			grant_type: 'password',
			scope: 'webclient'
		};
		login(loginData)
			.then(data => {
				setFormState({ loading: false, error: '' });
				dispatch(setUser(data));
				history.replace('/');
			})
			.catch(error => {
				setFormState({ loading: false, error: error?.message });
			});
	};

	const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
		useFormik({
			initialValues,
			onSubmit,
			validationSchema
		});

	return isAuthenticated ? (
		<Redirect to="/dashboard" />
	) : (
		<>
			<Helmet>
				<title>ورود</title>
			</Helmet>
			<Grid container alignItems="center" className="h-full">
				<Grid item xs={12} lg={4} md={5} sm={6} className="px-10">
					<form onSubmit={handleSubmit}>
						<h2 className="text-lg  mb-1">خوش آمدید</h2>
						<p className="text-gray-500 text-sm mb-8">وارد اکانتت شو</p>
						<TextField
							variant="outlined"
							color="primary"
							placeholder="نام کاربری"
							label="نام کاربری"
							className="mb-4"
							fullWidth
							name="username"
							value={values.username}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.username && !!errors.username}
							helperText={touched.username ? errors.username : ''}
						/>
						<TextField
							variant="outlined"
							color="primary"
							placeholder="رمز عبور"
							label="رمز عبور"
							fullWidth
							className="mb-4"
							type="password"
							name="password"
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.password && !!errors.password}
							helperText={touched.password ? errors.password : ''}
						/>
						{<div className="text-red-500 text-sm">{formState.error}</div>}
						<div className="mt-5">
							<Button
								color="primary"
								variant="contained"
								className="ml-4"
								type="submit"
								fullWidth
								disabled={formState.loading}
								endIcon={
									formState.loading && <CircularProgress size={16} />
								}
							>
								ورود
							</Button>
						</div>
					</form>
				</Grid>
				<Grid
					item
					xs={12}
					md={7}
					lg={8}
					sm={6}
					className="bg-blue-400 h-full items-center justify-center hidden sm:flex"
				>
					<img src="/admin/images/login.svg" alt="" className="w-10/12" />
				</Grid>
			</Grid>
		</>
	);
}
